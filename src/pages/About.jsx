import React from "react";
import Footer from "../components/layout/Footer";

const About = () => {
  return (
    <>
      <div className="container pt-10 ">
        <h4 className="text-sm text-center text-[#16dcec] font-medium">
          Hi, friends!
        </h4>
        <h1 className="text-center   text-3xl font-bold py-6">About Us</h1>
      </div>
      <div className="grid grid-cols-2 pt-4 pb-5 gap-x-5 container">
        <div className="col-span-1">
          <img src="../img1_950X.webp" alt="" className="" />
        </div>
        <div className="col-span-1">
          <h2 className="text-4xl  font-semibold pt-5 py-6">
            Muhil Expectation
          </h2>
          <p>
            Our mission is to make each and every one of our clients to look and
            feel fabulous. Fashion wig styles, medical wig for hair loss, we
            provide the top brands in the most trendy and stylish looks. Our
            team really does put an enormous amount of effort into serving your
            needs. Highest quality beauty and hair products in the industry,
            while ensuring professional and informed expert assistance for a
            pampering online shopping experience.
          </p>
        </div>
      </div>
      <div className="container pt-10 ">
        <h4 className="text-sm text-center text-[#16dcec] font-medium">
          THE TEAM
        </h4>
        <h1 className="text-center text-3xl font-bold  py-6">Meet our team</h1>
        <p className="text-center pb-10 text-sm font-semibold text-[#666]">
          The perfect way to enjoy brewing tea on low hanging fruit to identify.
          Duis autem vel eum iriure dolor in hendrerit <br />
          in vulputate velit esse molestie consequat, vel illum dolore eu
          feugiat nulla facilisis.
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
              Sed ut perspiciatis unde omnis iste natus error sitaccusantium
              doloremque laudan totam rem aperiam.
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
              Sed ut perspiciatis unde omnis iste natus error sitaccusantium
              doloremque laudan totam rem aperiam.
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
              Sed ut perspiciatis unde omnis iste natus error sitaccusantium
              doloremque laudan totam rem aperiam.
            </p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default About;
