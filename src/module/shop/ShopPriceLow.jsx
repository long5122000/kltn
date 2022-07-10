import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/layout/Footer";
import { db } from "../../firebase-app/firebase-config";
import { addToCart } from "../../redux/addMultiCartSlice";
import Sidebar from "./Sidebar";

const ShopPriceLow = () => {
  const [product, setProductList] = useState([]);
  useEffect(() => {
    async function getData() {
      const docRef = query(
        collection(db, "products"),
        where("pricesale", ">=", 0),
        where("pricesale", "<=", 100000)
      );
      onSnapshot(docRef, (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setProductList(result);
      });
    }
    getData();
  }, []);
  console.log(product);
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
            {product.length > 0 &&
              product.map((item) => (
                <ProductItem id={item.id} infor={item}></ProductItem>
              ))}
            {/* 
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
            </Modal> */}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
const ProductItem = ({
  infor: { id, title, pricesale, price, images, quality },
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const item = { id, title, pricesale, price, images, quality };
  return (
    <div className="p-5  product-item overflow-hidden  hover:opacity-90 bg-white text-white rounded-lg flex flex-col h-full relative ">
      {quality <= 0 ? (
        <span className="absolute px-2 py-1 rounded-sm bg-[#753b3f] text-xs">
          sold out
        </span>
      ) : pricesale == 0 ? (
        <span className="absolute px-2 rounded-sm bg-[#950f1a] text-xs">
          hot
        </span>
      ) : (
        <span className="absolute px-2 rounded-sm bg-[#5aab19] text-xs">
          {Math.floor(100 - (pricesale / price) * 100)}%
        </span>
      )}
      {/* <div className="absolute -right-full top-5 item-option transition-all flex gap-2 flex-col">
                    <a className="text-[#434242] bg-slate-200 rounded-full p-2 hover:bg-[#16bcdc] hover:text-white">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokelinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </span>
                    </a>
                    <a className="text-[#434242] bg-slate-200 rounded-full p-2 hover:bg-[#16bcdc] hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 "
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
                    </a>
                  </div> */}
      /*{" "}
      <img
        src={images}
        alt=""
        className="h-[163px] w-[163px] object-cover mb-5 rounded-lg"
        onClick={() => navigate(`/product/${id}`)}
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-2 text-[#0068c9] text-base font-bold title-line">
          {title.length > 20 ? title.slice(0, 15) + "..." : title}
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
          {pricesale > 0 ? (
            <>
              <p className="text-xl text-[#cc1414] font-semibold">
                ${pricesale}
              </p>
              <p className="text-sm text-gray-400 line-through">${price}</p>
            </>
          ) : (
            <p className="text-xl text-gray-400 font-semibold">${pricesale}</p>
          )}
        </div>
        {quality > 0 ? (
          <button
            className="px-2 py-2 bg-[#16bcdc] rounded-lg text-center"
            onClick={() => {
              dispatch(addToCart(item)),
                toast.success("Add to cart successfully");
            }}
          >
            Add to cart
          </button>
        ) : (
          <button
            disabled
            className="px-2 py-2 bg-[#c2ecf5] rounded-lg text-center"
            onClick={() => {
              dispatch(addToCart(item)),
                toast.success("Add to cart successfully");
            }}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};
export default ShopPriceLow;
