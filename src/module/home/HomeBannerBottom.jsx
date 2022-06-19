import React, { useEffect, useState } from "react";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
const HomeBannerBottom = () => {
  const [bannerBottom, setBannerBottom] = useState([]);

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "banner");
      const q = query(colRef, where("status", "==", 1), where("type", "==", 3));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setBannerBottom(result);
    }
    getData();
  }, []);
  return (
    <div className="container flex justify-between gap-5">
      {bannerBottom.length > 0 &&
        bannerBottom.map((item) => (
          <div className="w-[376px] h-[190px]  rounded-3xl overflow-hidden relative">
            <div className="absolute -translate-y-1/2 left-5 top-1/2 text-white">
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-lg">{item.desc}</p>
            </div>
            <img src={item.image} alt="" className="w-full h-full" />
          </div>
        ))}
    </div>
  );
};

export default HomeBannerBottom;
