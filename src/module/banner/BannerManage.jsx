import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../../components/button/Button";
import LabelStatus from "../../components/label/LabelStatus";
import ActionView from "../../components/action/ActionView";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import Table from "../../components/table/Table";
import DashboardHeading from "../dashboard/DashBoardHeading";
import { db } from "../../firebase-app/firebase-config";
import { bannerStatus, bannerType } from "../../utils/constants";

const BANNER_PER_PAGE = 100;

const BannerManage = () => {
  const [bannerList, setBannerList] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState(undefined);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const handleLoadMoreBanner = async () => {
    const nextRef = query(
      collection(db, "banner"),
      startAfter(lastDoc || 0),
      limit(BANNER_PER_PAGE)
    );

    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setBannerList([...bannerList, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "banner");
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : query(colRef, limit(BANNER_PER_PAGE));
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
        setBannerList(results);
      });

      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);
  const handleDeleteBanner = async (docId) => {
    const colRef = doc(db, "banner", docId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
  return (
    <div>
      <DashboardHeading title="Banners" desc="Manage your Banner">
        <Button kind="ghost" height="60px" to="/manage/add-banner">
          Create banner
        </Button>
      </DashboardHeading>
      <div className="flex justify-end mb-10">
        <input
          type="text"
          placeholder="Search category..."
          className="px-5 py-4 border border-gray-300 rounded-lg outline-none"
          onChange={handleInputFilter}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Image</th>
            <th>Desc</th>
            <th>Status</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bannerList.length > 0 &&
            bannerList.map((banner) => (
              <tr key={banner.id}>
                <td title={banner.id}>{banner.id.slice(0, 5) + "..."}</td>
                <td title={banner.title}>
                  {banner.title.slice(0, 30) + "..."}
                </td>
                <td>
                  <div className="w-[66px]">
                    <img
                      src={banner.image}
                      alt=""
                      className="w-[66px] h-[55px] rounded object-cover"
                    />
                  </div>
                </td>
                <td title={banner.desc}>{banner.desc.slice(0, 30) + "..."}</td>
                <td>
                  {Number(banner.status) === bannerStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {Number(banner.status) === bannerStatus.UNAPPROVED && (
                    <LabelStatus type="warning">Unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  {Number(banner.type) === bannerType.MAINBANNER && (
                    <LabelStatus type="success">Main Banner</LabelStatus>
                  )}
                  {Number(banner.type) === bannerType.SUBBANNER && (
                    <LabelStatus type="warning">Sub Banner</LabelStatus>
                  )}
                  {Number(banner.type) === bannerType.BOTTOMBANNER && (
                    <LabelStatus type="danger">Bottom Banner</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-x-3 text-gray-500">
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-banner?id=${banner.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteBanner(banner.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > bannerList.length && (
        <div className="mt-10">
          <Button onClick={handleLoadMoreBanner} className="mx-auto">
            Load more
          </Button>
          {total}
        </div>
      )}
    </div>
  );
};

export default BannerManage;
