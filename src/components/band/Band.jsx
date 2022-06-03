import React from "react";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css/navigation";
const Band = () => {
  return (
    <div className="container  mt-10 mb-10">
      <div className="bg-white flex rounded-3xl py-3 overflow-hidden">
        <Swiper
          grabCursor="true"
          loop={true}
          spaceBetween={20}
          slidesPerView={5}
        >
          <SwiperSlide>
            <img
              src="../images/xbrand_01.png.pagespeed.ic.AgwTYDEUKl.webp"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="../images/xbrand_02.png.pagespeed.ic.deIxBeJXp3.webp"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="../images/xbrand_02.png.pagespeed.ic.deIxBeJXp3.webp"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="../images/xbrand_02.png.pagespeed.ic.deIxBeJXp3.webp"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="../images/xbrand_02.png.pagespeed.ic.deIxBeJXp3.webp"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Band;
