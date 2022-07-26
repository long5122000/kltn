import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ActionEdit from "../components/action/ActionEdit";
import ActionView from "../components/action/ActionView";
import Button from "../components/button/Button";
import LabelStatus from "../components/label/LabelStatus";
import Footer from "../components/layout/Footer";
import Table from "../components/table/Table";
import { useAuth } from "../contexts/auth-context";
import { db } from "../firebase-app/firebase-config";
import { billStatus } from "../utils/constants";

const MyBill = () => {
  const {
    control,

    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [billId, setBillId] = useState("");
  const [bills, setBills] = useState([]);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "AuthCheckOut");
      const q = query(colRef, where("auth", "==", userInfo.uid));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setBills(result);
    }
    getData();
  }, [billId]);
  console.log(bills);
  const data = bills.map((item) => {
    return item.cart;
  });
  console.log(data);
  const renderBillStatus = (status) => {
    switch (status) {
      case billStatus.APPROVED:
        return <LabelStatus type="success">Đơn hàng thành công</LabelStatus>;
      case billStatus.PENDING:
        return <LabelStatus type="warning">Đơn hàng đang xử lý</LabelStatus>;
      case billStatus.REJECTED:
        return (
          <LabelStatus type="danger">Đơn hàng không thành công</LabelStatus>
        );

      default:
        break;
    }
  };

  const handleUpdateBill = async () => {
    const colRef = doc(db, "AuthCheckOut", billId);
    await updateDoc(colRef, {
      status: 3,
    });
    toast.success("Update Bill Successfully");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleUpdateBill)}>
        <div className="container mb-5">
          <h2 className="font-medium text-center text-4xl my-5">Đơn hàng</h2>

          <div className="">
            <Table
              className={
                "border-collapse border border-slate-500 overflow-hidden"
              }
            >
              <thead>
                <tr>
                  <th className="border border-[#dee2e6]">Stt</th>
                  <th className="border border-[#dee2e6]">Ngày mua</th>
                  <th className="border border-[#dee2e6]">Tổng tiền</th>
                  <th className="border border-[#dee2e6]">Trạng thái</th>
                  <th className="border border-[#dee2e6]">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {bills.length > 0 &&
                  bills.map((item, i) => (
                    <tr>
                      <td className="border border-[#dee2e6]">
                        <div className="flex items-center gap-x-3">
                          <p>{i + 1}</p>
                        </div>{" "}
                      </td>

                      <td className="border border-[#dee2e6]">
                        {" "}
                        {new Date(
                          item?.createdAt?.seconds * 1000
                        ).toLocaleDateString("vi-VI")}
                      </td>
                      <td className="border border-[#dee2e6]">
                        {" "}
                        {item?.total}$
                      </td>

                      <td className="border border-[#dee2e6]">
                        {renderBillStatus(item?.status)}
                      </td>
                      <td className="border border-[#dee2e6]">
                        <div className="flex justify-between">
                          <div className="font-bold flex text-center gap-x-5 items-center ">
                            <ActionView
                              onClick={() => navigate(`/my-bill/${item?.id}`)}
                            ></ActionView>
                            {item?.status === 2 ? (
                              <Button
                                type="submit"
                                onClick={() => setBillId(item.id)}
                                size="small"
                                height="45px"
                                kind="favourite"
                              >
                                {" "}
                                Hủy đơn hàng
                              </Button>
                            ) : (
                              ""
                            )}
                          </div>
                          {/* <div className="font-bold flex text-center items-center ">
                          {item?.cart[0].title}
                        </div>
                        <div className="font-bold flex text-center items-center ">
                          <img
                            src={item?.cart[0].images}
                            alt=""
                            className="w-[50px] h-[50px]"
                          />
                        </div> */}
                          <div className=" flex flex-col gap-y-2">
                            {/* <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </span>
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            </span> */}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </form>

      <Footer></Footer>
    </div>
  );
};

export default MyBill;
