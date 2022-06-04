import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import ProductItem from "../../components/product/ProductItem";
import Sidebar from "./Sidebar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import Footer from "../../components/layout/Footer";

const ShopLayout = (props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <div className="container grid grid-cols-4 gap-6 pt-4 pb-16 items-start">
        <Sidebar></Sidebar>
        <div className="col-span-3">
          {/* <div className="flex items-center mb-4">
          <select className="w-44 text-sm text-gray-600 px-4 py-3 border border-gray-400 shadow-sm rounded focus:ring-primary focus:border-primary">
            <option value="">Default sorting</option>
            <option value="">Price low-hight</option>
            <option value="">Price hight-low</option>
            <option value="">Latest product</option>
          </select>
          <div className="flex gap-2 ml-auto">
            <div className="border border-primary w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </div>
            <div className="border border-gray-300 w-10 h-9 flex items-center justify-center text-gray-600  rounded cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
            </div>
          </div>
        </div> */}
          <div className="grid grid-cols-4 gap-6">
            <ProductItem></ProductItem>
            <ProductItem></ProductItem>
            <ProductItem></ProductItem>
            <ProductItem></ProductItem>
            <ProductItem></ProductItem>
            <ProductItem></ProductItem>
            <ProductItem></ProductItem>
            <ProductItem></ProductItem>
            <button
              className="p-5 text-center text-white bg-blue-400 rounded-lg"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Open modal base
            </button>
            <Modal
              visible={openModal}
              onClose={() => {
                setOpenModal(false);
              }}
            >
              <div className=" relative grid grid-cols-2 gap-x-5 max-w-[910px] bg-white p-10 ">
                <span
                  className="absolute top-0 right-0 flex items-center justify-center w-10 h-10 p-1 bg-white rounded-full cursor-pointer -translate-y-2/4 translate-x-2/4"
                  onClick={handleClose}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.225 7L13.7375 1.4875C14.0875 1.1375 14.0875 0.6125 13.7375 0.2625C13.3875 -0.0875 12.8625 -0.0875 12.5125 0.2625L7 5.775L1.4875 0.2625C1.1375 -0.0875 0.6125 -0.0875 0.2625 0.2625C-0.0874998 0.6125 -0.0874998 1.1375 0.2625 1.4875L5.775 7L0.2625 12.5125C0.0875002 12.6875 0 12.8625 0 13.125C0 13.65 0.35 14 0.875 14C1.1375 14 1.3125 13.9125 1.4875 13.7375L7 8.225L12.5125 13.7375C12.6875 13.9125 12.8625 14 13.125 14C13.3875 14 13.5625 13.9125 13.7375 13.7375C14.0875 13.3875 14.0875 12.8625 13.7375 12.5125L8.225 7Z"
                      fill="#84878B"
                    />
                  </svg>
                </span>
                <div className="col-span-1">
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
                        thumbsSwiper && !thumbsSwiper.destroyed
                          ? thumbsSwiper
                          : null,
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

                <div className="col-span-1   rounded-lg w-full max-w-[320px]">
                  <h2 className="text-2xl text-[#0068c9] font-bold">
                    Tai nghe chup tai
                  </h2>
                  <div className="flex items-baseline mt-3 mb-2 space-x-2 ">
                    <p className="text-2xl text-[#cc1414] font-semibold">
                      $45.00
                    </p>
                    <p className="text-base text-gray-400 line-through">
                      $55.00
                    </p>
                  </div>
                  <hr />
                  <div>
                    <p className="mb-1 text-sm">
                      Availability:{" "}
                      <span className="text-primary">Instock </span>
                    </p>
                    <p className="mb-1 text-sm">
                      SKU: <span>Digital015 </span>
                    </p>
                  </div>
                  <p className="text-sm text-[#666] mb-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Veniam cumque, quibusdam quisquam commodi dolore provident
                    aliquam similique id ipsum laborum aperiam tempora rem quis
                    quidem eligendi, ducimus porro natus. Dolor.
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
                    <button className="py-2 px-10  text-white bg-[#16bcdc]">
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
                    <p className="mb-1 text-sm">
                      Category:{" "}
                      <span className="text-gray">Phone, table, pc </span>
                    </p>
                    <p className="mb-1 text-sm">
                      Brand name: <span>Apple, Samsung </span>
                    </p>
                  </div>
                </div>
              </div>
            </Modal>
            <p>Hello</p>
            <p>Hello</p>
            <h3>duma</h3>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default ShopLayout;
