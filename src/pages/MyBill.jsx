import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Table from "../components/table/Table";
import { useAuth } from "../contexts/auth-context";
import { db } from "../firebase-app/firebase-config";

const MyBill = () => {
  const { userInfo } = useAuth();
  console.log(userInfo.uid);
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
  }, []);
  const data = bills.map((item) => {
    return item.cart[0].quality;
  });
  console.log(data);

  return (
    <div>
      <div className="container mb-5">
        <h2 className="font-medium text-center text-4xl my-5">My Bill</h2>

        <div className="">
          <Table
            className={
              "border-collapse border border-slate-500 overflow-hidden"
            }
          >
            <thead>
              <tr>
                <th className="border border-[#dee2e6]">Stt</th>
                <th className="border border-[#dee2e6]">Price</th>
                <th className="border border-[#dee2e6]">Date</th>
                <th className="border border-[#dee2e6]">Subtotal</th>
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
                    <td className="border border-[#dee2e6]"> {item?.total}$</td>
                    <td className="border border-[#dee2e6]">
                      {" "}
                      {new Date(
                        item?.createdAt?.seconds * 1000
                      ).toLocaleDateString("vi-VI")}
                    </td>
                    <td className="border border-[#dee2e6]">
                      <div className="flex justify-between">
                        <div className="font-bold flex text-center items-center ">
                          {item?.cart[0].quality} x
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

      <Footer></Footer>
    </div>
  );
};

export default MyBill;
