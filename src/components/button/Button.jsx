import React, { Children } from "react";
import styled, { css } from "styled-components";
import PropTypes, { string } from "prop-types";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../loading/LoadingSpinner";

const ButtonStyles = styled.button`
  cursor: pointer;

  ${(props) =>
    props.size === "small" &&
    css`
      padding: 0 15px;
    `};
  ${(props) =>
    props.size === "normal" &&
    css`
      padding: 0 25px;
    `};
  line-height: 1;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;

  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: white;
    `};
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: white;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `};
  ${(props) =>
    props.kind === "ghost" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: rgba(29, 192, 113, 0.1);
    `};
  ${(props) =>
    props.kind === "favourite" &&
    css`
      color: white;
      background-color: ${(props) => props.theme.primary};
    `};
  height: ${(props) => props.height || "66px"};
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
/**
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 */
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  kind = "primary",
  size = "normal",
  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to != "" && typeof to === "string") {
    return (
      <NavLink to={to} style={{ display: "inline-block" }}>
        <ButtonStyles kind={kind} type={type} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles
      kind={kind}
      size={size}
      type={type}
      onClick={onClick}
      {...props}
    >
      {child}
    </ButtonStyles>
  );
};
Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  kind: PropTypes.oneOf(["primary", "secondary", "ghost", "favourite"]),
};

export default Button;
