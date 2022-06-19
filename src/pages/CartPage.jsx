import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Table from "../components/table/Table";
import { useAuth } from "../contexts/auth-context";
import { useGallery } from "../contexts/gallery-context";
import { db } from "../firebase-app/firebase-config";

const CartPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [cartList, setCartList] = useState([]);
  const [count, setCount] = useState(0);
  console.log(userInfo.uid);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "AuthCart");
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
      console.log(result);
      setCartList(result);
    }
    getData();
  }, []);

  const data = cartList.map((item) => {
    return item.prodcut.pricesale * item.prodcut.quality;
  });
  console.log(data);

  let sum = 0;
  data.map((item) => {
    sum += item;
  });
  console.log(sum);
  return (
    <div>
      <div className="container mb-5">
        <h2 className="font-medium text-center text-4xl my-5">Shopping Cart</h2>
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-3 ">
            <Table
              className={
                "border-collapse border border-slate-500 overflow-hidden"
              }
            >
              <thead>
                <tr>
                  <th className="border border-[#dee2e6]">Item</th>
                  <th className="border border-[#dee2e6]">Price</th>
                  <th className="border border-[#dee2e6]">Qty</th>
                  <th className="border border-[#dee2e6]">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartList.length > 0 &&
                  cartList.map((item) => (
                    <tr>
                      <td className="border border-[#dee2e6]">
                        <div className="flex items-center gap-x-3">
                          <img
                            src={item?.prodcut?.images[0]}
                            alt=""
                            className="object-cover w-10 h-10 rounded-md flex-shrink-0"
                          />
                          <div className="">
                            <h3>{item?.prodcut?.title}</h3>
                          </div>
                        </div>{" "}
                      </td>
                      <td className="border border-[#dee2e6]">
                        {" "}
                        {item?.prodcut?.pricesale}$
                      </td>
                      <td className="border border-[#dee2e6]">
                        {" "}
                        <div className="flex">
                          <div className="border border-gray-300">
                            <div className="bg-white w-[70px]  rounded-md py-2 pl-9 pr-3 h-full sm:text-sm">
                              {item?.prodcut?.quality}
                            </div>
                          </div>
                          <div className="">
                            <div
                              className="border border-gray-300 text-[#666]"
                              onClick={() => setCount(count + 1)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M5 15l7-7 7 7"
                                />
                              </svg>
                            </div>
                            <div
                              className="border border-gray-300 text-[#666]"
                              onClick={() => item?.prodcut?.quality + 1}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="border border-[#dee2e6]">
                        <div className="flex justify-between">
                          <div className="font-bold flex text-center items-center ">
                            {item?.prodcut?.pricesale * item?.prodcut?.quality}
                          </div>
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
          <div className="col-span-1 bg-white">
            <div className="border-b-[1px] border-[#dee2e6]">
              <h3 className="text-center py-4 font-medium text-xl">Summary</h3>
            </div>
            <div className="border-b-[1px] border-[#dee2e6]">
              <div className="flex justify-between px-5 pt-3 ">
                <span className="font-bold ">Subtotal</span>
                <span>{sum}$</span>
              </div>
              <div className="flex justify-between px-5 pt-3">
                <span className="font-bold ">Shipping</span>
                <span>2$</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="font-bold ">Order Total</span>
                <span>{sum + 2}$</span>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={() => navigate(`/checkout`)}
                className="w-full py-4  text-white bg-[#16bcdc]"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CartPage;
