import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Footer from "../components/layout/Footer";
import ProductList from "../components/product/ProductList";
import Heading from "../components/layout/Heading";
const ProductDetailPage = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <>
      <div className="container mb-5">
        <div className="  grid grid-cols-2 gap-x-3  bg-white p-10 ">
          <div className="col-span-1 px-5">
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
              </SwiperSlide>
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="col-span-1   rounded-lg w-full ">
            <h2 className="text-2xl text-[#0068c9] font-bold">
              Tai nghe chup tai
            </h2>
            <div className="flex items-baseline mt-3 mb-4 space-x-2 ">
              <p className="text-2xl text-[#cc1414] font-semibold">$45.00</p>
              <p className="text-base text-gray-400 line-through">$55.00</p>
            </div>
            <hr />
            <div className="mt-5 mb-3">
              <p className="mb-1 text-sm font-bold text-[#222]">
                Availability: <span className="text-primary">Instock </span>
              </p>
              <p className="mb-1 text-sm font-bold text-[#222]">
                SKU: <span className="text-[#666]">Digital015 </span>
              </p>
            </div>
            <p className="text-sm text-[#666] mb-6 font-medium">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
              cumque, quibusdam quisquam commodi dolore provident aliquam
              similique id ipsum laborum aperiam tempora rem quis quidem
              eligendi, ducimus porro natus. Dolor.
            </p>
            <div className="flex gap-x-4 mb-3">
              <div className="flex">
                <div className="border border-gray-300">
                  <input
                    type="text"
                    value={1}
                    className="bg-white w-[100px]  rounded-md py-2 pl-9 pr-3 h-full sm:text-sm"
                  />
                </div>
                <div className="">
                  <div className="border border-gray-300 text-[#666]">
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
                  <div className="border border-gray-300 text-[#666]">
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
              <button className="py-2 px-20  text-white bg-[#16bcdc]">
                Add to cart
              </button>
            </div>
            <div className="flex mb-5">
              <div className="text-sm text-[#666] items-center flex ml-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3 "
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
                Add To Wish List
              </div>
            </div>
            <hr />
            <div className="mt-4">
              <p className="mb-1 text-sm font-bold">
                Category:{" "}
                <span className="text-[#666] ">Phone, table, pc </span>
              </p>
              <p className="mb-1 text-sm font-bold">
                Brand name: <span className="text-[#666]">Apple, Samsung </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container  ">
        <div className="  bg-white pb-5">
          <div className="mx-auto  flex justify-center">
            <div
              className={
                toggleState === 1
                  ? " relative  px-6 py-5 cursor-pointer after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px] text-[#16bcdc] after:bg-[#16bcdc]  after:z-10"
                  : "px-6 py-5 cursor-pointer"
              }
              onClick={() => toggleTab(1)}
            >
              <a className="text-black  text-2xl font-medium">Details</a>
            </div>
            <div
              className={
                toggleState === 2
                  ? " relative  px-6 py-5 cursor-pointer after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px] text-[#16bcdc] after:bg-[#16bcdc]  after:z-10"
                  : "px-6 py-5 cursor-pointer"
              }
              onClick={() => toggleTab(2)}
            >
              <a className="text-black text-2xl font-medium">
                More Information
              </a>
            </div>
            <div
              className={
                toggleState === 3
                  ? " relative  px-6 py-5 cursor-pointer after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px] text-[#16bcdc] after:bg-[#16bcdc]  after:z-10"
                  : "px-6 py-5 cursor-pointer"
              }
              onClick={() => toggleTab(3)}
            >
              <a className="text-black  text-2xl font-medium">Reviews</a>
            </div>
          </div>
          <div className=" px-5 border-t-[1px] border-[#ebebeb]">
            {toggleState === 1 && (
              <div className="block">
                <h3>Tab1</h3> Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Adipisci cumque nemo quibusdam delectus libero reiciendis
                porro accusamus quisquam suscipit provident, nisi dolor aut
                minima iusto. Dolor deleniti expedita praesentium porro!
              </div>
            )}
            {toggleState === 2 && (
              <div className="block">
                <h3>Tab2</h3> Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Adipisci cumque nemo quibusdam delectus libero reiciendis
                porro accusamus quisquam suscipit provident, nisi dolor aut
                minima iusto. Dolor deleniti expedita praesentium porro!
                <h3>Tab2</h3> Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Adipisci cumque nemo quibusdam delectus libero reiciendis
                porro accusamus quisquam suscipit provident, nisi dolor aut
                minima iusto. Dolor deleniti expedita praesentium porro!
              </div>
            )}
            {toggleState === 3 && (
              <div className="block">
                <h3>Tab3</h3> Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Adipisci
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mb-10">
        <div className="flex  justify-between container mt-10">
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
      </div>
      <Footer></Footer>
    </>
  );
};

export default ProductDetailPage;