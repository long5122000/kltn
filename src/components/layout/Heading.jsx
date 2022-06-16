import React, { Children } from "react";

const Heading = ({ children }) => {
  return (
    <div className=" mb-5">
      <h3
        before=" "
        className=" relative w-auto inline-block text-2xl before:w-full before:h-[4px] before:top-full  before:absolute before:bg-[#16bcdc] before:translate-x-0 before:translate-y-[150%]"
      >
        {children}
      </h3>
    </div>
  );
};

export default Heading;
