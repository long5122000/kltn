import React, { useState } from "react";

const categories = [
  {
    url: "../icons/smartphone-svgrepo-com.svg",
    title: "Phone",
  },
  {
    url: "../icons/tablet-svgrepo-com.svg",
    title: "Table",
  },
  {
    url: "../icons/laptop-svgrepo-com.svg",
    title: "Latop",
  },
  {
    url: "../icons/earphones-svgrepo-com.svg",
    title: "Earphone",
  },
  {
    url: "../icons/apple-watch-svgrepo-com.svg",
    title: "Watch",
  },
];

const menuList = [
  {
    url: "#",
    title: "Home",
  },
  {
    url: "#",
    title: "Shop",
  },
  {
    url: "#",
    title: "About Us",
  },
  {
    url: "#",
    title: "Contact Us",
  },
];

const HeaderBottom = () => {
  return (
    <div className="container flex">
      <div className="px-12 py-4 hover:bg-[#16bcdc] transition flex items-center cursor-pointer relative group">
        <span className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </span>
        <span className="capitalize ml-2 text-white">All categories</span>
        <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible z-10">
          {categories.length > 0 &&
            categories.map((item) => (
              <a
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img src={item.url} alt="" className="w-5 h-5 object-contain" />
                <span className="ml-6 text-gray-600 text-sm">{item.title}</span>
              </a>
            ))}
        </div>
      </div>
      <div className="flex items-center justify-between flex-grow pl-12">
        <div className="flex items-center space-x-6 capitalize">
          {menuList.length > 0 &&
            menuList.map((item) => (
              <a
                href={item.url}
                className=" first:text-[#16bcdc] text-white uppercase font-normal transition"
              >
                {item.title}
              </a>
            ))}
        </div>
        <a href="#" className="text-gray-200 hover:text-white transition">
          Spend $120 more and get free shipping!
        </a>
      </div>
    </div>
  );
};

export default HeaderBottom;
