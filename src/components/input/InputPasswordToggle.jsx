import React, { Fragment, useState } from "react";
import IconEyeClose from "../Icon/IconEyeClose";
import IconEyeOpen from "../Icon/IconEyeOpen";
import Input from "./Input";

const InputPasswordToggle = ({ control, name = "" }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;
  return (
    <Fragment>
      <Input
        name={name}
        type={togglePassword ? "text" : "password"}
        placeholder="Enter your password"
        control={control}
      >
        {!togglePassword ? (
          <IconEyeClose onClick={() => setTogglePassword(true)}></IconEyeClose>
        ) : (
          <IconEyeOpen onClick={() => setTogglePassword(false)}></IconEyeOpen>
        )}
      </Input>
    </Fragment>
  );
};

export default InputPasswordToggle;
