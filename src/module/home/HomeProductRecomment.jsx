import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase-app/firebase-config";
import { useGallery } from "../../contexts/gallery-context";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth-context";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import { addToCart, resetCount } from "../../redux/addMultiCartSlice";

const HomeProductRecomment = () => {
  // const { products, cartItems, addToCart } = useGallery();

  const { userInfo } = useAuth();
  const [productList, setProductList] = useState({});

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "products");
      const q = query(colRef, where("hot", "==", false));
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
  // console.log("cr", cartItems);
  // console.log("pr", productList);

  // useEffect(() => {
  //   async function fetchData() {
  //     const docRef = doc(db, "products", cartItems);
  //     const docSnapshot = await getDoc(docRef);
  //     if (docSnapshot.data()) {
  //       setProduct(docSnapshot.data());
  //     }
  //   }
  //   fetchData();
  // }, [cartItems]);

  // const handleAddDoc = async () => {
  //   const docRef = await addDoc(collection(db, "AuthCart"), {
  //     auth: userInfo.uid,
  //     prodcut: product,
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  // };

  return (
    <div className="container">
      <div className="product-list">
        <Swiper
          slidesPerView={5}
          spaceBetween={23}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiperProduct"
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
  infor: { id, title, pricesale, price, images, quality, totalquantyti = 0 },
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const item = { id, title, pricesale, price, images, quality, totalquantyti };
  return (
    <div className="p-5  product-item overflow-hidden  hover:opacity-90 bg-white text-white rounded-lg flex flex-col h-full relative ">
      {pricesale == 0 ? (
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
export default HomeProductRecomment;
