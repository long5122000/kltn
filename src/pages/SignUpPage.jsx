import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import Label from "../components/label/Label";
import Footer from "../components/layout/Footer";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-app/firebase-config";
import slugify from "slugify";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { userRole, userStatus } from "../utils/constants";

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup.string().email().required("Please enter valid email address"),
  password: yup
    .string()
    .min(8, "Your password must be least 8 characters or greater ")
    .required("Please enter your password"),
  confirmPwd: yup
    .string()
    .required("Password is mendatory")
    .oneOf([yup.ref("password")], "Passwords does not match"),
});
const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (values) => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      avatar:
        "https://images.unsplash.com/photo-1619476402491-9dee65ce061c?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: serverTimestamp(),
    });
    toast.success("Register successfully");
  };
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  return (
    <>
      <div className="container ">
        <h2 className="font-medium text-center text-4xl my-5">
          Create New Customer Account
        </h2>
        <div className="flex  p-10 gap-10">
          <div className="bg-white mx-auto min-w-[500px]">
            <div className="p-14 border borer-grayse ">
              <form
                className="form"
                autoComplete="off"
                onSubmit={handleSubmit(handleSignUp)}
              >
                <Field>
                  <Label htmlFor="fullname" className="label">
                    Fullname
                  </Label>
                  <Input
                    name="fullname"
                    type="text"
                    placeholder="Enter your fullname"
                    control={control}
                  ></Input>
                </Field>
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
                  <InputPasswordToggle
                    name="password"
                    control={control}
                  ></InputPasswordToggle>
                </Field>
                <Field>
                  <Label htmlFor="confirmPwd">Comfirm Password</Label>
                  <InputPasswordToggle
                    name="confirmPwd"
                    control={control}
                  ></InputPasswordToggle>
                </Field>
                <div className="mb-5">
                  You alreally have an account ?{" "}
                  <NavLink className="text-[#16bcdc]" to="/sign-in">
                    Login
                  </NavLink>
                </div>
                <Button
                  kind="favourite"
                  type="submit"
                  style={{
                    width: "100%",
                    maxWidth: 300,
                    margin: "0 auto",
                  }}
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Create an account
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default SignUpPage;
