import React from "react";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import Label from "../components/label/Label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
const SignInPage = () => {
  // const schema = yup.object({
  //   email: yup.string().email().required("Please enter valid email address"),
  //   password: yup
  //     .string()
  //     .min(8, "Your password must be least 8 characters or greater ")
  //     .required("Please enter your password"),
  // });
  // const {
  //   handleSubmit,
  //   control,
  //   formState: { isSubmitting, errors, isValid },
  // } = useForm({
  //   mode: "onChange",
  //   resolver: yupResolver(schema),
  // });
  // const navigate = useNavigate();
  return (
    <div className="container">
      <h2 className="font-medium text-center text-4xl my-5"> Login</h2>
      <div className="grid grid-cols-2 ">
        <div className="col-span-1 ">
          <div className="p-10">
            <h3 className="font-bold">Register Customer</h3>
            <p>If you have an account, sign in with your email address.</p>
            <form
              className="form"
              autoComplete="off"
              // onSubmit={handleSubmit(handleSignIn)}
            >
              <Field>
                <Label htmlFor="email">Email address</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  // control={control}
                ></Input>
              </Field>
              <Field>
                <Label htmlFor="password">Password</Label>
                {/* <InputPasswordToggle control={control}></InputPasswordToggle> */}
              </Field>
              <div className="have-account">
                You have not had an account ?{" "}
                <NavLink to="/sign-up">Register</NavLink>
              </div>
              <Button
                type="submit"
                style={{ width: "100%", maxWidth: 300, margin: "0 auto" }}
                // isLoading={isSubmitting}
                // disabled={isSubmitting}
              >
                Sign Up
              </Button>
            </form>
          </div>
        </div>
        <div className="col-span-1">
          <div className="p-10">
            <h3 className="font-bold">New Customers</h3>
            <h2>ditme</h2>
            <h2>ditme</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
