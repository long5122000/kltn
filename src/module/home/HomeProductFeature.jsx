import { collection, getDocs, query, where } from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

// import required modules
import { Grid, Pagination } from "swiper";

import { db } from "../../firebase-app/firebase-config";
const HomeProductFeature = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "products");
      const q = query(colRef, where("feature", "==", true));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setProductList(result);
    }
    getData();
  }, []);
  return (
    <div className="container grid grid-rows-4 grid-cols-12 gap-4 h-[400px] mb-20">
      <div className="col-span-5 row-span-4 flex  overflow-hidden">
        <Swiper
          grabCursor="true"
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
        >
          {productList.length > 0 &&
            productList.map((item) => (
              <SwiperSlide>
                <div className="flex bg-white p-5 gap-1 h-full rounded-3xl relative">
                  {item.pricesale == 0 ? (
                    <span className="absolute px-2 text-white rounded-sm bg-[#950f1a] text-xs">
                      hot
                    </span>
                  ) : (
                    <span className="absolute px-3 py-1 top-10 text-white rounded-sm bg-[#5aab19] text-xs">
                      {Math.floor(100 - (item.pricesale / item.price) * 100)}%
                    </span>
                  )}
                  <div className="flex items-center">
                    <img
                      src={item.images[0]}
                      alt=""
                      className="h-[180px] w-[180px] "
                    />
                  </div>
                  <div className="flex-1 flex-col items-center">
                    <h3 className="text-lg font-bold mb-2 text-[#0068c9] mt-3">
                      {item.title}
                    </h3>
                    <div className="flex  text-xs text-yellow-400 mb-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                    </div>
                    <div className="flex items-baseline mb-2 space-x-2 ">
                      {item.pricesale > 0 ? (
                        <>
                          <p className="text-xl text-[#cc1414] font-semibold">
                            ${item?.pricesale}
                          </p>
                          <p className="text-sm text-gray-400 line-through">
                            ${item?.price}
                          </p>
                        </>
                      ) : (
                        <p className="text-xl text-gray-400 font-semibold">
                          ${item.pricesale}
                        </p>
                      )}
                    </div>
                    <p className="mb-5 text-base  ">
                      {item.desc.slice(0, 200) + "..."}
                    </p>
                    <a
                      href="#"
                      className=" w-full py-3 text-white bg-[#16bcdc] block rounded-lg text-center"
                    >
                      Buy now
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="col-span-7 row-span-4 flex  h-[400px] gap-4">
        <Swiper
          grabCursor="true"
          spaceBetween={16}
          loop={true}
          slidesPerView={2}
        >
          <SwiperSlide>
            <div className="flex flex-col gap-4">
              {productList.length > 0 &&
                productList.map((item) => (
                  <div className="p-5  product-item overflow-hidden  hover:opacity-90 bg-white text-white rounded-3xl flex  h-[192px] relative ">
                    {item.pricesale == 0 ? (
                      <span className="absolute px-2 rounded-sm bg-[#950f1a] text-xs">
                        hot
                      </span>
                    ) : (
                      <span className="absolute px-2 rounded-sm bg-[#5aab19] text-xs">
                        {Math.floor(100 - (item.pricesale / item.price) * 100)}%
                      </span>
                    )}

                    <img
                      src={item.images[0]}
                      alt=""
                      className="h-[163px] w-[163px] object-cover rounded-lg"
                    />
                    <div className="flex flex-col ">
                      <h3 className="mb-2 text-[#0068c9] text-base font-bold title-line">
                        {item.title}
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="flex  text-xs text-yellow-400">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </span>
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </span>
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </span>
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </span>
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 ml-2">(150)</div>
                      </div>
                      <div className="flex items-baseline mb-2 space-x-2 ">
                        {item.pricesale > 0 ? (
                          <>
                            <p className="text-xl text-[#cc1414] font-semibold">
                              ${item?.pricesale}
                            </p>
                            <p className="text-sm text-gray-400 line-through">
                              ${item?.price}
                            </p>
                          </>
                        ) : (
                          <p className="text-xl text-gray-400 font-semibold">
                            ${item.pricesale}
                          </p>
                        )}
                      </div>
                      {/* <a
                        href="#"
                        className="px-2 py-2 bg-[#16bcdc] rounded-lg text-center"
                      >
                        Buy now
                      </a> */}
                    </div>
                  </div>
                ))}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeProductFeature;
