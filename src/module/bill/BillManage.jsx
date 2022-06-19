import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-app/firebase-config";
import { debounce } from "lodash";
import Table from "../../components/table/Table";
import ActionView from "../../components/action/ActionView";
import ActionEdit from "../../components/action/ActionEdit";
import DashboardHeading from "../dashboard/DashBoardHeading";
import Button from "../../components/button/Button";
const BillManage = () => {
  const [billList, setBillList] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState(undefined);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const handleLoadMoreBill = async () => {
    const nextRef = query(
      collection(db, "AuthCheckOut"),
      startAfter(lastDoc || 0),
      limit(2)
    );

    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setBillList([...billList, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "AuthCheckOut");
      const newRef = filter
        ? query(
            colRef,
            where("phone", ">=", filter),
            where("phone", "<=", filter + "utf8")
          )
        : query(colRef, limit(1));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
        console.log(snapshot.size);
      });

      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setBillList(results);
      });

      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);

  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
  return (
    <div>
      <DashboardHeading title="Banners" desc="Manage your Banner">
        {/* <Button kind="ghost" height="60px" to="/manage/add-banner">
          Create banner
        </Button> */}
      </DashboardHeading>
      <div className="flex justify-end mb-10">
        <input
          type="text"
          placeholder="Search Bill..."
          className="px-5 py-4 border border-gray-300 rounded-lg outline-none"
          onChange={handleInputFilter}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Address</th>
            <th>AuthId</th>
            <th>Phone</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {billList.length > 0 &&
            billList.map((bill) => (
              <tr key={bill.id}>
                <td title={bill.id}>{bill.id.slice(0, 5) + "..."}</td>
                <td title={bill.address}>{bill.address}</td>

                <td title={bill.desc}>{bill.auth.slice(0, 30) + "..."}</td>
                <td>{bill?.phone}</td>
                <td>{bill.total}</td>
                <td>
                  <div className="flex items-center gap-x-3 text-gray-500">
                    <ActionView
                      onClick={() => navigate(`/bill/${bill.slug}`)}
                    ></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-bill?id=${bill.id}`)
                      }
                    ></ActionEdit>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > billList.length && (
        <div className="mt-10">
          <Button onClick={handleLoadMoreBill} className="mx-auto">
            Load more
          </Button>
          {total}
        </div>
      )}
    </div>
  );
};

export default BillManage;
