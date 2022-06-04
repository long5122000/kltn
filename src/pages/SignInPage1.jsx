import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import Label from "../components/label/Label";
import Footer from "../components/layout/Footer";

const SignInPage1 = () => {
  const { control } = useForm({
    mode: "onChange",
  });
  return (
    <>
      <div className="container ">
        <h2 className="font-medium text-center text-4xl my-5">
          Customer Login
        </h2>
        <div className="grid grid-cols-2 p-10 gap-10">
          <div className="col-span-1 bg-white ">
            <div className="p-14 border borer-grayse">
              <h3 className="font-bold mb-5 text-xl">Register Customer</h3>
              <p className="mb-3 text-[#666]">
                If you have an account, sign in with your email address.
              </p>
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
                    control={control}
                  ></Input>
                </Field>
                <Field>
                  <Label htmlFor="password">Password</Label>
                  <InputPasswordToggle control={control}></InputPasswordToggle>
                </Field>

                <Button
                  kind="favourite"
                  type="submit"
                  style={{
                    width: "100%",
                    maxWidth: 300,
                    margin: "0 auto",
                  }}
                  // isLoading={isSubmitting}
                  // disabled={isSubmitting}
                >
                  Sign Up
                </Button>
              </form>
            </div>
          </div>
          <div className="col-span-1 ">
            <div className="">
              <div className="p-14 border borer-grayse bg-white">
                <h3 className="font-bold mb-5 text-xl">New Customers</h3>
                <p className="mb-3 text-[#666]">
                  Creating an account has many benefits: check out faster, keep
                  more than one address, track orders and more.
                </p>
                <Button type="button" kind="favourite">
                  Create an account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default SignInPage1;
