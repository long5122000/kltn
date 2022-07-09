import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import HeaderBottom from "../Header/HeaderBottom";
import HeaderMain from "../Header/HeaderMain";
import HeaderTop from "../Header/HeaderTop";

const Header = () => {
  return (
    <>
      <div className="bg-[#263c97] shadow-sm">
        <HeaderTop contact="+ 0983283143"></HeaderTop>
        <HeaderMain></HeaderMain>
        <HeaderBottom></HeaderBottom>
      </div>
      <Outlet></Outlet>
    </>
  );
};

export default Header;
