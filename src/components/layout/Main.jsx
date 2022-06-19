import React from "react";
import PopularCategory from "../../module/category/PopularCategory";
import HomeBanner from "../../module/home/HomeBanner";
import HomeBannerBottom from "../../module/home/HomeBannerBottom";
import HomeHotTrend from "../../module/home/HomeHotTrend";
import HomePopularCategory from "../../module/home/HomePopularCategory";
import HomeProductFeature from "../../module/home/HomeProductFeature";
import HomeProductRecomment from "../../module/home/HomeProductRecomment";
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
        <Heading>Hot Trending Products</Heading>

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
        <Heading>Popular Categories</Heading>

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
      <HomePopularCategory></HomePopularCategory>
      <div className="flex justify-between container mt-10">
        <Heading>Top Featured Products</Heading>

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
      <HomeProductFeature></HomeProductFeature>
      <HomeBannerBottom></HomeBannerBottom>
      <div className="flex justify-between container mt-10">
        <Heading>Recommended For You</Heading>

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
      <HomeProductRecomment></HomeProductRecomment>
      <div className="container"></div>
      <Band></Band>
      <Footer></Footer>
    </>
  );
};

export default Main;
