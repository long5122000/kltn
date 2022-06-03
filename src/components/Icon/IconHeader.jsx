import React from "react";

const IconHeader = ({ title, number }) => {
  return (
    <>
      <a
        href="#"
        className="text-center flex text-white hover:text-[#16bcdc] transition relative"
      >
        <div className="text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <div className="text-sm items-center flex ml-3">{title}</div>
        <span className="absolute left-0 translate-x-full -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
          {number}
        </span>
      </a>
    </>
  );
};

export default IconHeader;
