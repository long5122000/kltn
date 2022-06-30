import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase-app/firebase-config";

// const categories = [
//   {
//     url: "../icons/smartphone-svgrepo-com.svg",
//     title: "Phone",
//   },
//   {
//     url: "../icons/tablet-svgrepo-com.svg",
//     title: "Table",
//   },
//   {
//     url: "../icons/laptop-svgrepo-com.svg",
//     title: "Latop",
//   },
//   {
//     url: "../icons/earphones-svgrepo-com.svg",
//     title: "Earphone",
//   },
//   {
//     url: "../icons/apple-watch-svgrepo-com.svg",
//     title: "Watch",
//   },
// ];

const menuList = [
  {
    url: "#",
    title: "Home",
  },
  {
    url: "/shop",
    title: "Shop",
  },
  {
    url: "/about",
    title: "About Us",
  },
  {
    url: "contact",
    title: "Contact Us",
  },
];

const HeaderBottom = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const querySnapshot = await getDocs(colRef);
      let result = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
  }, []);
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
              <Link
                to={`/shop/${item.slug}`}
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <span className="ml-6 text-gray-600 text-sm">{item.name}</span>
              </Link>
            ))}
        </div>
      </div>
      <div className="flex items-center justify-between flex-grow pl-12">
        <div className="flex items-center space-x-6 capitalize">
          {menuList.length > 0 &&
            menuList.map((item) => (
              <Link
                to={item.url}
                className=" first:text-[#16bcdc] text-white uppercase font-normal transition"
              >
                {item.title}
              </Link>
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
