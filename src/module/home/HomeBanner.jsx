import React, { useEffect, useState } from "react";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
const HomeBanner = () => {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "banner");
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
      setBanners(result);
    }
    getData();
  }, []);
  return (
    <div className=" container mt-5 grid grid-rows-4 grid-cols-5 gap-4">
      <div className="h-[420px] banner col-span-3 row-span-4 rounded-[28px] overflow-hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          grabCursor={true}
          slidesPerView={"auto"}
        >
          {banners.length > 0 &&
            banners.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="h-full rounded-lg w-full relative transition-all">
                  <div className="absolute inset-0 rounded-lg overlay bg-gradient-to-t from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.1)]"></div>

                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover "
                  />
                  <div className="absolute w-full text-white top-1/2 -translate-y-1/2 left-5">
                    <h3 className="mb-5 text-[40px] font-light w-[406px]">
                      {item.title.slice(0, 35) + "..."}
                    </h3>
                    <p className="text-[18px] mb-8">
                      {item.desc.slice(0, 35) + "..."}
                    </p>
                    <div className="flex items-center mb-8 gap-x-3">
                      <span className="px-4 py-2 border-2 border-white rounded-3xl uppercase">
                        Discover now
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          {/* <SwiperSlide>
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
          </SwiperSlide> */}
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
