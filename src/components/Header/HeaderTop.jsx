import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";

const menuLinks = [
  {
    name: "About Us",
    url: "/about",
  },
  {
    name: "Contact Us",
    url: "/contact",
  },
];
console.log(menuLinks);
const HeaderTop = ({ contact }) => {
  const { userInfo } = useAuth();
  console.log(userInfo);
  return (
    <div className="  border-b-[1px] border-rgba-border ">
      <div className="container flex justify-between py-2 items-center">
        <div className="text-white text-sm">
          Need Helps: <span>{contact}</span>
        </div>

        <ul className="flex  space-x-4 list-none">
          {userInfo ? (
            <li className=" border-r-[1px] inline-flex border-rgba-border last:border-none">
              <Link
                to={"/my-bill"}
                className="px-3 mr-4  text-white  inline-flex leading-none text-sm hover:text-[#16bcdc] "
              >
                MyBill
              </Link>
            </li>
          ) : (
            <li className=" border-r-[1px] inline-flex border-rgba-border last:border-none">
              <Link
                to={"/sign-in"}
                className="px-3 mr-4  text-white  inline-flex leading-none text-sm hover:text-[#16bcdc] "
              >
                MyBill
              </Link>
            </li>
          )}

          {menuLinks.length > 0 &&
            menuLinks.map((item) => (
              <li className=" border-r-[1px] inline-flex border-rgba-border last:border-none">
                <Link
                  to={item.url}
                  className="px-3 mr-4  text-white  inline-flex leading-none text-sm hover:text-[#16bcdc] "
                >
                  {item.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderTop;
