import React, { useEffect, useState } from "react";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css/navigation";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
const HomePopularCategory = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [ctProduct, setCtProduct] = useState([]);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
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
      setCategoryList(result);
    }
    getData();
  }, []);

  useEffect(() => {
    let result = [];
    categoryList.map(async (item) => {
      const colRef = collection(db, "products");
      const q = query(colRef, where("category.id", "==", item.id));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCtProduct(result);
    });
  }, [categoryList]);
  console.log("ct", ctProduct);
  const cc = ctProduct.map((item) => {
    return item.category.id;
  });
  console.log("cc", cc);

  const statistics = {};

  cc.forEach((word) => {
    if (statistics[word]) {
      statistics[word] += 1;
    } else {
      statistics[word] = 1;
    }
  });

  console.log("st", statistics);

  return (
    <div className="container flex gap-5">
      <Swiper grabCursor="true" slidesPerView={4} spaceBetween={10} loop={true}>
        {categoryList.map((item) => (
          <SwiperSlide>
            <div className="relative popular-item  w-[280px] h-auto rounded-xl overflow-hidden">
              <img
                src={item.image}
                alt=""
                className="w-full h-[198px] popular-image transition"
              />
              <div className="absolute text-white top-1/2 left-5 -translate-y-1/2">
                <h3 className="text-base font-semibold">{item?.name}</h3>
                <span className="text-sm text-center text-[#f0f0f0]"> </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomePopularCategory;
