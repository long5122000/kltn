import React from "react";
import Footer from "../components/layout/Footer";

const About = () => {
  return (
    <>
      <div className="container pt-10 ">
        <h4 className="text-sm text-center text-[#666] font-medium">
          Xin chào, những người bạn !
        </h4>
        <h1 className="text-center   text-3xl font-bold py-6">Về chúng tôi</h1>
      </div>
      <div className="grid grid-cols-2 pt-4 pb-5 gap-x-5 container">
        <div className="col-span-1">
          <img src="../banner-about-us-2.jpeg" alt="" className="" />
        </div>
        <div className="col-span-1">
          <h2 className="text-4xl  font-semibold pt-5 py-6">
            Với hơn 25 năm kinh nghiệm
          </h2>
          <p>
            Công ty cổ phần Phát triển Công nghệ Dukamarket là một công ty trẻ
            đã và đang tiếp tục khai thác những tiềm năng của công nghệ
            Internet, tri thức và nội lực sáng tạo để tạo nên những sản phẩm và
            dịch vụ phần mềm chất lượng cao phục vụ cho nền kinh tế quốc dân.
            Với đội ngũ nhân viên trẻ trung, năng động, chuyên nghiệp và sáng
            tạo, chúng tôi đã tạo ra sản phẩm mới, giá trị mới trong lĩnh vực
            công nghệ thông tin. Với phương châm “Luôn là đối tác tin cậy của
            Khách hàng” Kim Giang không ngừng hoàn thiện và đổi mới để tạo ra
            những sản phẩm dịch vụ ngày càng một tốt hơn. Kim Giang đang không
            ngừng cải tiến, sáng tạo, tìm ra giải pháp công nghệ ưu việt đáp ứng
            những yêu cầu bài toán khó, tạo ra giá trị mới trong một lĩnh vực
            đầy nhân văn cho xã hội.
          </p>
        </div>
      </div>
      <div className="container pt-10 ">
        <h4 className="text-sm text-center text-[#666] font-medium">Đội ngũ</h4>
        <h1 className="text-center text-3xl font-bold  py-6">
          Đội ngũ của chúng tôi
        </h1>
        <p className="text-center pb-10 text-sm font-semibold text-[#666]">
          Đội ngũ của chúng tôi với những nhân viên trẻ và năng động sẽ mang đến
          cho các bạn những sản phẩm tốt nhất <br />
          Với kinh nghiệm của bản thân cũng như công ty chắc chắn sẽ làm bạn hài
          lòng
          <br />
        </p>
      </div>
      <div className="container grid gap-x-5 grid-cols-3 pb-10">
        <div className="col-span-1">
          <div className="rounded-full overflow-hidden">
            <img
              src="../xteam1.png.pagespeed.ic.15XmXWkbaa.png"
              alt=""
              className="mx-auto"
            />
          </div>
          <div className=" py-5  border-b-[1px] border-l-gray-300">
            <div className="">
              <p className="text-sm text-center text-[#999] font-medium leading-none">
                John Doe
              </p>
              <h3 className="font-bold text-center text-sm">CEO & Pounder</h3>
            </div>
          </div>
          <div className="py-3 ">
            <p className="text-center">
              5 năm kinh nghiệm trong lĩnh vực phát triển phần mềm
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="rounded-full overflow-hidden">
            <img
              src="../xteam2.png.pagespeed.ic.vC_yiEujy3.png"
              alt=""
              className="mx-auto"
            />
          </div>
          <div className=" py-5  border-b-[1px] border-l-gray-300">
            <div className="">
              <p className="text-sm text-center text-[#999] font-medium leading-none">
                John Doe
              </p>
              <h3 className="font-bold text-center text-sm">CEO & Pounder</h3>
            </div>
          </div>
          <div className="py-3 ">
            <p className="text-center">
              5 năm kinh nghiệm trong lĩnh vực phát triển phần mềm
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="rounded-full overflow-hidden">
            <img
              src="../xteam3.png.pagespeed.ic.4djDdoAdq3.png"
              alt=""
              className="mx-auto"
            />
          </div>
          <div className=" py-5  border-b-[1px] border-l-gray-300">
            <div className="">
              <p className="text-sm text-center text-[#999] font-medium leading-none">
                John Doe
              </p>
              <h3 className="font-bold text-center text-sm">CEO & Pounder</h3>
            </div>
          </div>
          <div className="py-3 ">
            <p className="text-center">
              7 năm kinh nghiệm trong lĩnh vực phát triển phần mềm
            </p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default About;
