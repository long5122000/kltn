import React from "react";
import PopularCategory from "../../module/category/PopularCategory";
import HomeBanner from "../../module/home/HomeBanner";
import HomeHotTrend from "../../module/home/HomeHotTrend";
import Band from "../band/Band";
import ProductFeatured from "../product/ProductFeatured";
import ProductList from "../product/ProductList";
import Footer from "./Footer";
import Header from "./Header";
import Heading from "./Heading";
const Main = () => {
  return (
    <>
      {/* <Header></Header> */}
      <HomeBanner></HomeBanner>
      <div className="flex justify-between container mt-10">
        <Heading></Heading>

        <a
          href="#"
          className="text-md text-[#434242] mt-1 flex hover:text-[#16bcdc]"
        >
          See All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mt-1 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
      <HomeHotTrend></HomeHotTrend>

      <div className="flex justify-between container mt-10">
        <Heading></Heading>

        <a
          href="#"
          className="text-md text-[#434242] mt-1 flex hover:text-[#16bcdc]"
        >
          See All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mt-1 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
      <PopularCategory></PopularCategory>
      <div className="flex justify-between container mt-10">
        <Heading></Heading>

        <a
          href="#"
          className="text-md text-[#434242] mt-1 flex hover:text-[#16bcdc]"
        >
          See All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mt-1 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
      <ProductFeatured></ProductFeatured>
      <div className="container flex justify-between gap-5">
        <div className="w-[376px] h-[190px]  rounded-3xl overflow-hidden relative">
          <div className="absolute -translate-y-1/2 left-5 top-1/2 text-white">
            <h3 className="text-2xl font-semibold mb-3">
              Microsoft suface 14'
            </h3>
            <p className="text-lg">Up to -30%</p>
          </div>
          <img src="../images/banner-5.png" alt="" className="w-full h-full" />
        </div>
        <div className="w-[376px] h-[190px]  rounded-3xl overflow-hidden relative">
          <div className="absolute -translate-y-1/2 left-5 top-1/2  text-white">
            <h3 className="text-2xl font-semibold mb-3">
              Microsoft suface 14'
            </h3>
            <p className="text-lg">Up to -30%</p>
          </div>
          <img
            src="../images/banner-6.png"
            alt=""
            className="w-full h-full object-fill  "
          />
        </div>
        <div className="w-[376px] h-[190px]  rounded-3xl overflow-hidden relative">
          <div className="absolute -translate-y-1/2 left-5 top-1/2  text-white">
            <h3 className="text-2xl font-semibold mb-3">
              Microsoft suface 14'
            </h3>
            <p className="text-lg">Up to -30%</p>
          </div>
          <img src="../images/banner-7.png" alt="" className="w-full h-full" />
        </div>
      </div>
      <div className="flex justify-between container mt-10">
        <Heading></Heading>

        <a
          href="#"
          className="text-md text-[#434242] mt-1 flex hover:text-[#16bcdc]"
        >
          See All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mt-1 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
      <ProductList></ProductList>
      <div className="container"></div>
      <Band></Band>
      <Footer></Footer>
    </>
  );
};

export default Main;
