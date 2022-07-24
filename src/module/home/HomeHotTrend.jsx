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
import ProductItem from "../../components/product/ProductItem";

const HomeHotTrend = () => {
  const { userInfo } = useAuth();
  const [productList, setProductList] = useState({});

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "products");
      const q = query(colRef, where("hot", "==", true));
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

export default HomeHotTrend;
