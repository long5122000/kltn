import { collection, getDocs, query, where } from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { db } from "../../firebase-app/firebase-config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/addMultiCartSlice";
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
                <ProductItemLarge id={item.id} infor={item}></ProductItemLarge>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="col-span-7 row-span-4 flex  h-[400px] gap-4">
        <Swiper
          grabCursor="true"
          spaceBetween={16}
          loop={true}
          slidesPerView={3}
        >
          {productList.length > 0 &&
            productList.map((item) => (
              <SwiperSlide>
                <ProductItem id={item.id} infor={item}></ProductItem>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
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
          {title.length > 20 ? title.slice(0, 20) + "..." : title}
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
            <p className="text-xl text-gray-400 font-semibold">${price}</p>
          )}
        </div>
        <a
          className="px-2 py-2 bg-[#16bcdc] rounded-lg text-center"
          onClick={() => {
            dispatch(addToCart(item)),
              toast.success("Add to cart successfully");
          }}
        >
          Add to cart
        </a>
      </div>
    </div>
  );
};
const ProductItemLarge = ({
  infor: { id, title, pricesale, price, images, quality, desc },
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const item = { id, title, pricesale, price, images, quality, desc };
  return (
    <div className="flex bg-white p-5 gap-1 h-full rounded-3xl relative">
      {quality <= 0 ? (
        <span className="absolute px-2 py-1 rounded-sm bg-[#753b3f] text-xs">
          sold out
        </span>
      ) : pricesale == 0 ? (
        <span className="absolute px-2 rounded-sm bg-[#950f1a] text-xs">
          hot
        </span>
      ) : (
        <span className="absolute px-2 text-white rounded-sm bg-[#5aab19] text-xs">
          {Math.floor(100 - (pricesale / price) * 100)}%
        </span>
      )}
      <div className="flex items-center">
        <img src={item.images[0]} alt="" className="h-[180px] w-[180px] " />
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
            <p className="text-xl text-gray-400 font-semibold">${item.price}</p>
          )}
        </div>
        <p className="mb-5 text-base  ">
          {item?.desc && item?.desc.slice(0, 200) + "..."}
        </p>
        {quality > 0 ? (
          <button
            className="w-full py-3 text-white bg-[#16bcdc] block rounded-lg text-center"
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
            className="w-full py-3 text-white bg-[#16bcdc] block rounded-lg text-center"
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
export default HomeProductFeature;
