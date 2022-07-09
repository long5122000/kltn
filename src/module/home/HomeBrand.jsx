import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { db } from "../../firebase-app/firebase-config";
const HomeBrand = () => {
  const [brandList, setBrandList] = useState([]);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "brands");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setBrandList(result);
    }
    getData();
  }, []);
  console.log(brandList);
  return (
    <div className="container  mt-10 mb-10">
      <div className="bg-white flex rounded-3xl py-3 overflow-hidden">
        <Swiper
          grabCursor="true"
          loop={true}
          spaceBetween={20}
          slidesPerView={5}
        >
          {brandList.length > 0 &&
            brandList.map((item) => (
              <SwiperSlide>
                <img src={item.image} alt="" />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeBrand;
