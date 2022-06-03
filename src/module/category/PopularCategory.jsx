import React from "react";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css/navigation";
const popularList = [
  {
    url: "../images/x3.jpg.pagespeed.ic.IgoO7aN2uM.webp",
    title: "Top Featured Product",
    total: 8,
  },
  {
    url: "../images/x2.jpg.pagespeed.ic.gtJu9IuyVc.webp",
    title: "Top Selling Products",
    total: 8,
  },
  {
    url: "../images/x4.jpg.pagespeed.ic.t-JXaN9upw.webp",
    title: "Computer & Desktop",
    total: 8,
  },
  {
    url: "../images/x6.jpg.pagespeed.ic.3IvT-QdGAF.jpeg",
    title: "Home & Accessories",
    total: 8,
  },
];
const PopularCategory = ({ url, title, total }) => {
  return (
    <div className="container flex gap-5">
      <Swiper grabCursor="true" slidesPerView={4} spaceBetween={10} loop={true}>
        {popularList.map((item) => (
          <SwiperSlide>
            <div className="relative popular-item  w-[280px] h-auto rounded-xl overflow-hidden">
              <img
                src={item.url}
                alt=""
                className="w-full h-full popular-image transition"
              />
              <div className="absolute text-white top-1/2 left-5 -translate-y-1/2">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <span className="text-sm text-center text-[#f0f0f0]">
                  {" "}
                  ({item.total} Items)
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularCategory;
