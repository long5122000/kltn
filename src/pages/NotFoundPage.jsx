import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/layout/Footer";
const NotFoundPageStyle = styled.div`
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .heading {
    font-weight: bold;
    font-size: 60px;
    margin-bottom: 20px;
  }
  .back {
    display: inline-block;
    padding: 15px 30px;
    color: white;
    background-color: ${(props) => props.theme.primary};
    border-radius: 8px;
    font-weight: 500;
  }
`;
const NotFoundPage = () => {
  return (
    <>
      <NotFoundPageStyle>
        <h1 className="heading">Opps! Page not Found</h1>
        <NavLink to="/" className={"back"}>
          Back to home
        </NavLink>
      </NotFoundPageStyle>
      <Footer></Footer>
    </>
  );
};

export default NotFoundPage;
