import React from "react";
import { Link, NavLink } from "react-router-dom";

const menuLinks = [
  {
    name: "My Account",
    url: "/",
  },
  {
    name: "About Us",
    url: "/",
  },
  {
    name: "Contact Us",
    url: "/",
  },
  {
    name: "FAQs",
    url: "/",
  },
];
console.log(menuLinks);
const HeaderTop = ({ contact }) => {
  return (
    <div className="  border-b-[1px] border-rgba-border ">
      <div className="container flex justify-between py-2 items-center">
        <div className="text-white text-sm">
          Need Helps: <span>{contact}</span>
        </div>

        <ul className="flex  space-x-4 list-none">
          {menuLinks.length > 0 &&
            menuLinks.map((item) => (
              <li className=" border-r-[1px] inline-flex border-rgba-border last:border-none">
                <a
                  to={item.url}
                  className="px-3 mr-4  text-white  inline-flex leading-none text-sm hover:text-[#16bcdc] "
                >
                  {item.name}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderTop;
