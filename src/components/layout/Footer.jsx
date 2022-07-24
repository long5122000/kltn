import React from "react";
const Footer = () => {
  return (
    <div className="bg-[#1f2024] h-auto">
      <div className="container border-b-[1px] border-[#28282d]">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex gap-4 py-10">
            <img
              src="../images/money-svgrepo-com.svg"
              alt=""
              className="h-14 w-14 "
            />
            <div className="">
              <h4 className="text-sm text-white font-bold">Hoàn tiền</h4>
              <p className="text-[#9999]">Nếu hàng hóa có vấn đề</p>
            </div>
          </div>
          <div className="flex gap-4 py-10">
            <img
              src="../images/id-card-svgrepo-com.svg"
              alt=""
              className="h-14 w-14 "
            />
            <div className="">
              <h4 className="text-sm text-white font-bold">
                Thanh toán an toàn
              </h4>
              <p className="text-[#9999]">Hoàn tiền nếu có vấn đề</p>
            </div>
          </div>
          <div className="flex gap-4 py-10">
            <img
              src="../images/chat-svgrepo-com.svg"
              alt=""
              className="h-14 w-14 "
            />
            <div className="">
              <h4 className="text-sm text-white font-bold">Tư vấn 24/7</h4>
              <p className="text-[#9999]">Hỗ trợ khách hàng 24/7</p>
            </div>
          </div>
          <div className="flex gap-4 py-10">
            <img
              src="../images/van-svgrepo-com.svg"
              alt=""
              className="h-14 w-14 "
            />
            <div className="">
              <h4 className="text-sm text-white font-bold">
                Miễn phí vận chuyển
              </h4>
              <p className="text-[#9999]">Cho tất cả hóa đơn 2000$</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-10 flex gap-4">
        <div className="flex-3">
          <h3 className="font-medium capitalize text-lg mt-[18px] mb-[20px] text-white">
            Tải ứng dụng
          </h3>
          <p className="text-sm text-[#999] mb-5">
            Ứng dụng Dukamarket hiện có sẵn trên App Store & Google Play.
            <br />
            Tải ngay
          </p>
          <div className="flex gap-1">
            <img src="../images/app-store.webp" alt="" className="w-[170px]" />
            <img
              src="../images/google-play.webp"
              alt=""
              className="w-[170px]"
            />
          </div>
          <div className="flex mt-5 gap-2">
            <a
              href="#"
              className="w-[45px] h-[45px] rounded-md relative bg-[#3c5b9b]"
            >
              <img
                src="../images/facebook-svgrepo-com.svg"
                alt=""
                className="absolute h-4 w-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </a>
            <a
              href="#"
              className="w-[45px] h-[45px] rounded-md relative bg-[#ed3c32]"
            >
              <img
                src="../images/google-svgrepo-com.svg"
                alt=""
                className="absolute h-4 w-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </a>
            <a
              href="#"
              className="w-[45px] h-[45px] rounded-md relative bg-[#40c1df]"
            >
              <img
                src="../images/twitter-svgrepo-com.svg"
                alt=""
                className="absolute h-4 w-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </a>
            <a
              href="#"
              className="w-[45px] h-[45px] rounded-md relative bg-[#c619b8]"
            >
              <img
                src="../images/instagram-svgrepo-com.svg"
                alt=""
                className="absolute h-4 w-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </a>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-medium capitalize text-lg mt-[18px] mb-[20px] text-white">
            Chăm sóc khách hàng
          </h3>
          <ul className="list-none text-sm">
            <li className="no-underline mb-5">
              <a className="text-[#999]">Khách hàng mới</a>
            </li>
            <li className="no-underline mb-5">
              <a className="text-[#999]">Tạo tài khoản</a>
            </li>
            <li className="no-underline mb-5">
              <a className="text-[#999]">Đặt hàng</a>
            </li>
            <li className="no-underline mb-5">
              <a className="text-[#999]">Thanh toán</a>
            </li>
            <li className="no-underline mb-5">
              <a className="text-[#999]">Vấn đề khác</a>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="font-medium capitalize text-lg mt-[18px] mb-[20px] text-white">
            Dịch vụ khách hàng
          </h3>
          <ul className="list-none text-sm">
            <li className="no-underline mb-5">
              <a className="text-[#999]">Trung tâm hỗ trợ</a>
            </li>
            <li className="no-underline mb-5">
              <a className="text-[#999]">Liên hệ</a>
            </li>
            <li className="no-underline mb-5">
              <a className="text-[#999]">Chính sách</a>
            </li>
            <li className="no-underline mb-5">
              <a className="text-[#999]">Điều khoản</a>
            </li>
            <li className="no-underline mb-5">
              <a className="text-[#999]">Hoàn tiền trực tuyến</a>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="font-medium capitalize text-lg mt-[18px] mb-[20px] text-white">
            Tài khoản người dùng
          </h3>
          <ul className="list-none text-sm">
            <li className="no-underline mb-5">
              <a className="text-[#999]">Hỗ trợ thanh toán</a>
            </li>
            <li className="no-underline mb-5">
              <a className="text-[#999]">Hỗ trợ sản phẩm</a>
            </li>
            <li className="no-underline mb-5">
              <a className="text-[#999]">Mã giảm giá</a>
            </li>
            <li className="no-underline mb-5">
              <a className="text-[#999]">Giỏ hàng</a>
            </li>
            <li className="no-underline mb-5">
              <a className="text-[#999]">Danh sách yêu thích</a>
            </li>
          </ul>
        </div>

        <div className="flex-3">
          <h3 className="font-medium capitalize text-lg mt-[18px] mb-[20px] text-white">
            Tải ứng dụng
          </h3>
          <p className="text-sm text-[#999] mb-5">
            Ứng dụng Dukamarket hiện có sẵn trên App Store & Google Play.
          </p>
          <div className="flex mb-[29px]">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter Your Email"
                className="w-full p-4 bg-slate-800 text-white outline-none"
              />
            </div>
            <button className="p-4 bg-primary text-white">Subscribe</button>
          </div>
          <span className="text-[#666] ">
            Bằng cách cung cấp địa chỉ email của bạn, bạn đồng ý
            <a href="#" className="italic text-sm underline underline-offset-1">
              {" "}
              chính sách
            </a>{" "}
            và
            <a href="#" className="italic text-sm underline">
              {" "}
              bảo mật
            </a>
          </span>
        </div>
      </div>
      <div className="border-t-[1px] mt-10 border-rgba-border">
        <img
          src="../images/bank-method.webp"
          alt=""
          className="mx-auto mt-10"
        />
        <p className="text-center text-[#666] mt-5 pb-6 ">
          Copyright © MageBlueskyTech. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
