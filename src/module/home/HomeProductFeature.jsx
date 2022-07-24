import { collection, getDocs, query, where } from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { db } from "../../firebase-app/firebase-config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/addMultiCartSlice";
import ProductItem from "../../components/product/ProductItem";
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
            Thêm vào giỏ
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
            Thêm vào giỏ
          </button>
        )}
      </div>
    </div>
  );
};
export default HomeProductFeature;
