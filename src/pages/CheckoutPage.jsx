import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import Label from "../components/label/Label";
import Footer from "../components/layout/Footer";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-app/firebase-config";
import slugify from "slugify";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useAuth } from "../contexts/auth-context";
import { useGallery } from "../contexts/gallery-context";

import { userRole, userStatus } from "../utils/constants";
import Table from "../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../redux/addMultiCartSlice";

const CheckoutPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const cart = useSelector((state) => state.count.cart);
  const dispatch = useDispatch();
  // const [cartList, setCartList] = useState([]);
  // const [count, setCount] = useState(0);
  // console.log(userInfo.uid);
  // useEffect(() => {
  //   async function getData() {
  //     const colRef = collection(db, "AuthCart");
  //     const q = query(colRef, where("auth", "==", userInfo.uid));
  //     const querySnapshot = await getDocs(q);
  //     let result = [];
  //     querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       result.push({
  //         id: doc.id,
  //         ...doc.data(),
  //       });
  //     });
  //     console.log(result);
  //     setCartList(result);
  //   }
  //   getData();
  // }, []);

  // console.log(cartList);
  const data = cart.map((item) => {
    return item.pricesale * item.quality;
  });
  console.log(data);

  let sum = 0;
  data.map((item) => {
    sum += item;
  });
  console.log(sum);
  const handleCheckout = async (values) => {
    const newValues = { ...values };
    const colRef = collection(db, "AuthCheckOut");
    try {
      await addDoc(colRef, {
        ...newValues,
        cart,
        total: sum,
        createdAt: serverTimestamp(),
        auth: userInfo.uid,
      });
      toast.success("Checkout successfully!");
      navigate("/");
      dispatch(resetCart());
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="container ">
        <h2 className="font-medium text-center text-4xl my-5">Checkout</h2>
        <div className="grid grid-cols-2 p-10 gap-10">
          <div className="col-span-1 bg-white ">
            <div className="p-14 border borer-grayse">
              <h3 className="font-bold mb-5 text-xl">Information</h3>

              <form
                className="form"
                autoComplete="off"
                onSubmit={handleSubmit(handleCheckout)}
              >
                <Field>
                  <Label htmlFor="text">Address</Label>
                  <Input
                    type="text"
                    name="address"
                    placeholder="Enter your  address"
                    control={control}
                  ></Input>
                </Field>
                <Field>
                  <Label htmlFor="text">Phone</Label>
                  <Input
                    type="number"
                    name="phone"
                    placeholder="Enter your  Phone"
                    control={control}
                  ></Input>
                </Field>

                <Button
                  // onClick={() => {
                  //   dispatch(resetCart());
                  // }}
                  kind="favourite"
                  type="submit"
                  style={{
                    width: "100%",
                    maxWidth: 300,
                    margin: "0 auto",
                  }}
                  // isLoading={isSubmitting}
                  // disabled={isSubmitting}
                >
                  Check out
                </Button>
              </form>
            </div>
          </div>
          <div className="col-span-1 ">
            <div className="">
              <div className="p-14 border borer-grayse bg-white">
                <h3 className="font-bold mb-5 text-xl">Cart</h3>
                <Table
                  className={
                    "border-collapse border border-slate-500 overflow-hidden"
                  }
                >
                  <thead>
                    <tr>
                      <th className="border border-[#dee2e6] ">Item</th>
                      <th className="border border-[#dee2e6]">Price</th>
                      <th className="border border-[#dee2e6]">Qty</th>
                      <th className="border border-[#dee2e6]">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length > 0 &&
                      cart.map((item) => (
                        <tr>
                          <td className="border border-[#dee2e6]">
                            <div className="flex items-center flex-col w-[110px] gap-x-3">
                              <img
                                src={item.images[0]}
                                alt=""
                                className="object-cover w-10 h-10 rounded-md flex-shrink-0"
                              />
                              <div className="">
                                <h3 className="text-center">{item.title} </h3>
                              </div>
                            </div>{" "}
                          </td>
                          <td className="border border-[#dee2e6]">
                            {" "}
                            {item.pricesale}$
                          </td>
                          <td className="border border-[#dee2e6]">
                            {" "}
                            <div className="flex">
                              <div className="border border-gray-300">
                                <div className="bg-white w-[70px]  rounded-md py-2 pl-9 pr-3 h-full sm:text-sm">
                                  {item.quality}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="border border-[#dee2e6]">
                            <div className="flex justify-between">
                              <div className="font-bold flex text-center items-center ">
                                {item.pricesale * item.quality}
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
                <div>
                  <div className="border-b-[1px] border-[#dee2e6]">
                    <h3 className="text-center py-4 font-medium text-xl">
                      Summary
                    </h3>
                  </div>
                  <div className="border-b-[1px] border-[#dee2e6]">
                    <div className="flex justify-between px-5 pt-3 ">
                      <span className="font-bold ">Subtotal</span>
                      <span>{sum}$</span>
                    </div>
                    <div className="flex justify-between px-5 pt-3">
                      <span className="font-bold ">Shipping</span>
                      <span>{15}$</span>
                    </div>
                    <div className="flex justify-between px-5 py-3">
                      <span className="font-bold ">Order Total</span>
                      <span>{sum + 15}$</span>
                    </div>
                  </div>
                </div>
                {/* <Button type="button" kind="favourite">
                  Create an account
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default CheckoutPage;
