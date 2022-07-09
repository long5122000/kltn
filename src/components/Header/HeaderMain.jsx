import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";

import Button from "../button/Button";
import { debounce } from "lodash";
import { filterSearch } from "../../redux/globalSlice";
import { userRole } from "../../utils/constants";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-app/firebase-config";
const HeaderMain = () => {
  const { userInfo } = useAuth();
  console.log(userInfo);
  const filter = useSelector((state) => state.global.search);

  const cart = useSelector((state) => state.count.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sum = cart.map((item) => {
    return item.totalquantyti;
  });
  let total = 0;

  sum.map((item) => {
    total += item;
  });
  const handleSearch = debounce((e) => {
    dispatch(filterSearch(e.target.value));
  }, 500);
  const handleClick = (e) => {
    navigate("/search");
  };
  return (
    <div className="container py-4 flex justify-between items-center border-b-[1px] border-rgba-border">
      <Link to="/">
        <img src="../logo.webp" alt="" className="w-44 h-6" />
      </Link>

      <div className="w-full max-w-sm relative flex">
        <input
          type="text "
          className="w-full border  border-r-0 pl-6 py-3 pr-14 rounded-sm focus:outline-none"
          placeholder="Search entire store here..."
          onChange={handleSearch}
        />
        <button
          onClick={handleClick}
          className="absolute right-2 top-1/2 bg-[#16bcdc] -translate-y-1/2 py-2 px-2 rounded-sm  text-lg text-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center space-x-8">
        {/* <a
          href="#"
          className="text-center flex text-white hover:text-[#16bcdc] transition relative"
        >
          <div className="text-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mx-auto"
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
          </div>
          <div className="text-sm items-center flex ml-3">Wish List</div>
          <span className="absolute left-0 translate-x-full -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
            8
          </span>
        </a> */}
        {userInfo ? (
          <Link
            to="/my-cart"
            className="text-center flex text-white hover:text-[#16bcdc] transition relative"
          >
            <div className="text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div className="text-sm items-center flex ml-3">Cart</div>
            <span className="absolute left-0 translate-x-full -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs border border-black">
              {total}
            </span>
          </Link>
        ) : (
          <Link
            to="/sign-in"
            className="text-center flex text-white hover:text-[#16bcdc] transition relative"
          >
            <div className="text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div className="text-sm items-center flex ml-3">Cart</div>
            <span className="absolute left-0 translate-x-full -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs border border-black">
              {total}
            </span>
          </Link>
        )}

        <div className="flex text-white  transition ">
          <div className="text-2xl relative group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <div className="absolute w-[150px] left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed rounded-xl z-10 transitioz-10 invisible group-hover:visible">
              {userInfo?.role === userRole.ADMIN ||
              userInfo?.role === userRole.MOD ? (
                <Link
                  to={`/dashboard`}
                  className="flex items-center px-1 py-3 hover:bg-gray-100 transition"
                >
                  <p className="ml-3 text-gray-600 text-sm font-medium">
                    Admin Dashboard
                  </p>
                </Link>
              ) : (
                ""
              )}
              <Link
                to={`/info`}
                className="flex items-center px-1 py-3 hover:bg-gray-100 transition"
              >
                <p className="ml-3 text-gray-600 text-sm font-medium">
                  My Info
                </p>
              </Link>
              {!userInfo ? (
                <Link
                  to={`/sign-in`}
                  className="flex items-center px-1 py-3 hover:bg-gray-100 transition"
                >
                  <p className="ml-3 text-gray-600 text-sm font-medium">
                    Login
                  </p>
                </Link>
              ) : (
                <div className="header-auth">
                  <p
                    className="flex items-center px-1 py-3 hover:bg-gray-100 transition"
                    onClick={() => signOut(auth)}
                  >
                    <p className="ml-3 text-gray-600 text-sm font-medium cursor-pointer">
                      Logout
                    </p>
                  </p>
                </div>
              )}{" "}
            </div>
          </div>
          <div className="text-sm items-center flex ml-3 ">
            {userInfo?.displayName}
          </div>

          {/* {!userInfo ? (
            <Button
              type="button"
              height="36px"
              className="bg-[#16bcdc]"
              to="/sign-in"
            >
              Login
            </Button>
          ) : (
            <div className="header-auth">
              <Button
                type="button"
                height="36px"
                className="bg-[#16bcdc]"
                to="/dashboard"
              >
                Dashboard
              </Button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
