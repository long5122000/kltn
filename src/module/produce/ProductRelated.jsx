import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css/navigation";
import { db } from "../../firebase-app/firebase-config";
import ProductItem from "../../components/product/ProductItem";
const ProductRelated = ({ categoryId = "" }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "products");
      const q = query(colRef, where("categoryId", "==", categoryId));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setProducts(result);
    }
    getData();
  }, [categoryId]);
  if (products.length < 1) return null;
  return (
    <>
      <div className="mb-10">
        <div className="flex  justify-between container mt-10">
          <Heading></Heading>

          <a
            href="#"
            className="text-md text-[#434242] mt-1 flex hover:text-[#16bcdc]"
          >
            Xem tiếp
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mt-1 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
        <ProductRelated categoryId={product?.categoryId}></ProductRelated>
      </div>
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
            {products.length > 0 &&
              products.map((item) => (
                <SwiperSlide>
                  <ProductItem id={item.id} infor={item}></ProductItem>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductRelated;
