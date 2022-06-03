import React from "react";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css/pagination";
const HomeBanner = () => {
  return (
    <div className=" container mt-5 grid grid-rows-4 grid-cols-5 gap-4">
      <div className="h-[420px] banner col-span-3 row-span-4 rounded-[28px] overflow-hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          grabCursor={true}
          slidesPerView={"auto"}
        >
          <SwiperSlide>
            <div className="h-full rounded-lg w-full relative transition-all">
              <div className="absolute inset-0 rounded-lg overlay bg-gradient-to-t from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.1)]"></div>

              <img
                src="https://mageblueskytech.com/dukamarket/media/revslider/slide-home2.png"
                alt=""
                className="w-full h-full object-cover "
              />
              <div className="absolute w-full text-white top-1/2 -translate-y-1/2 left-5">
                <h3 className="mb-5 text-[40px] font-light w-[406px]">
                  Gaming Headset Brilliant Lighting Effect
                </h3>
                <p className="text-[18px] mb-8">
                  Wireless Connection With TV, Computer, Laptop
                </p>
                <div className="flex items-center mb-8 gap-x-3">
                  <span className="px-4 py-2 border-2 border-white rounded-3xl uppercase">
                    Discover now
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full rounded-lg w-full relative transition-all">
              <div className="absolute inset-0 rounded-lg overlay bg-gradient-to-t from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.1)]"></div>

              <img
                src="https://mageblueskytech.com/dukamarket/media/revslider/slide-home3.png"
                alt=""
                className="w-full h-full object-cover "
              />
              <div className="absolute w-full text-white top-1/2 -translate-y-1/2 left-5">
                <h3 className="mb-5 text-[40px] font-light w-[406px]">
                  Gaming Headset Brilliant Lighting Effect
                </h3>
                <p className="text-[18px] mb-8">
                  Wireless Connection With TV, Computer, Laptop
                </p>
                <div className="flex items-center mb-8 gap-x-3">
                  <span className="px-4 py-2 border-2 border-white rounded-3xl uppercase">
                    Discover now
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full rounded-lg w-full relative transition-all">
              <div className="absolute inset-0 rounded-lg overlay bg-gradient-to-t from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.1)]"></div>

              <img
                src="https://mageblueskytech.com/dukamarket/media/revslider/02-slide-1.jpg"
                alt=""
                className="w-full h-full object-cover "
              />
              <div className="absolute w-full text-white top-1/2 -translate-y-1/2 left-5">
                <h3 className="mb-5 text-[40px] font-light w-[406px]">
                  Gaming Headset Brilliant Lighting Effect
                </h3>
                <p className="text-[18px] mb-8">
                  Wireless Connection With TV, Computer, Laptop
                </p>
                <div className="flex items-center mb-8 gap-x-3">
                  <span className="px-4 py-2 border-2 border-white rounded-3xl uppercase">
                    Discover now
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="transition opacity-90 hover:opacity-100 cursor-pointer col-span-1 row-span-2 rounded-[28px] overflow-hidden relative">
        <img
          src="../public/images/banner1.png"
          alt=""
          className="w-full h-full object-cover "
        />
        <div className="absolute w-full text-white top-1/2 -translate-y-1/2 left-5">
          <h3 className="text-2xl mb-4">
            <span>Canyon</span>
            <br />
            <span>Star rider</span>
          </h3>
          <p className="text-base ">Headphone & Audio</p>
        </div>
      </div>
      <div className="transition opacity-90 hover:opacity-100 cursor-pointer col-span-1 row-span-2 rounded-[28px] overflow-hidden relative">
        <img
          src="../public/images/banner2.png"
          alt=""
          className="w-full h-full object-cover "
        />
        <div className="absolute w-full text-white top-1/2 -translate-y-1/2 left-5">
          <h3 className="text-2xl mb-4">
            <span>Canyon</span>
            <br />
            <span>Star rider</span>
          </h3>
          <p className="text-base ">Headphone & Audio</p>
        </div>
      </div>
      <div className="transition opacity-90 hover:opacity-100 cursor-pointer col-span-1 row-span-2 rounded-[28px] overflow-hidden relative">
        <img
          src="../public/images/banner3.png"
          alt=""
          className="w-full h-full object-cover "
        />
        <div className="absolute w-full text-white top-1/2 -translate-y-1/2 left-5">
          <h3 className="text-2xl mb-4">
            <span>Canyon</span>
            <br />
            <span>Star rider</span>
          </h3>
          <p className="text-base ">Headphone & Audio</p>
        </div>
      </div>
      <div className="transition opacity-90 hover:opacity-100 cursor-pointer col-span-1 row-span-2 rounded-[28px] overflow-hidden  relative">
        <img
          src="../public/images/banner4.png"
          alt=""
          className="w-full h-full object-cover "
        />
        <div className="absolute w-full text-white top-1/2 -translate-y-1/2 left-5">
          <h3 className="text-2xl mb-4">
            <span>Canyon</span>
            <br />
            <span>Star rider</span>
          </h3>
          <p className="text-base ">Headphone & Audio</p>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
