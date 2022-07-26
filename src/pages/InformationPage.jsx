import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import Button from "../components/button/Button";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import Field from "../components/field/Field";
import FieldCheckboxes from "../components/field/FieldCheckboxes";
import Radio from "../components/checkbox/Radio";
import { userRole, userStatus } from "../utils/constants";
import ImageUpload from "../components/image/ImageUpload";
import useFirebaseImage from "../hook/useFirebaseMultiImage";
import { useAuth } from "../contexts/auth-context";
import { db } from "../firebase-app/firebase-config";
import { toast } from "react-toastify";
const InformationPage = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const { userInfo } = useAuth();
  const userId = userInfo.uid;

  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  const handleUpdateUser = async (values) => {
    if (!isValid) return;
    try {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        ...values,
        phone: values.phone,
        address: values.address,
        avatar: image,
      });
      toast.success("Update user information successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Update user failed!");
    }
  };
  async function deleteAvatar() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchData() {
      if (!userId) return;
      const colRef = doc(db, "users", userId);
      const docData = await getDoc(colRef);
      reset(docData && docData.data());
    }
    fetchData();
  }, [userId, reset]);

  return (
    <div className="bg-white">
      <div className="container pt-10">
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
            <ImageUpload
              className="!rounded-full h-full"
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              progress={progress}
              image={image}
            ></ImageUpload>
          </div>
          <div className="form-layout">
            <Field>
              <Label>Họ tên </Label>
              <Input
                name="fullname"
                placeholder="Enter your fullname"
                control={control}
              ></Input>
            </Field>
            <Field>
              <Label>Tên tài khoản</Label>
              <Input
                type="text"
                name="username"
                placeholder="Enter your username"
                control={control}
              ></Input>
            </Field>
          </div>
          <div className="form-layout">
            <Field>
              <Label>Email</Label>
              <Input
                name="email"
                placeholder="Enter your email"
                control={control}
                type="email"
              ></Input>
            </Field>
            <Field>
              <Label>Mật khẩu</Label>
              <Input
                name="password"
                placeholder="Enter your password"
                control={control}
                type="password"
              ></Input>
            </Field>
          </div>
          <div className="form-layout">
            <Field>
              <Label>Số điện thoại</Label>
              <Input
                type="tel"
                name="phone"
                pattern="[0-9]*"
                placeholder="Enter your phone"
                control={control}
              ></Input>
            </Field>
            <Field>
              <Label>Địa chỉ</Label>
              <Input
                name="address"
                placeholder="Enter your address"
                control={control}
              ></Input>
            </Field>
          </div>
          {/* <div className="form-layout">
          <Field>
            <Label>Description</Label>
            <Textarea name="description" control={control}></Textarea>
          </Field>
        </div> */}
          <Button
            kind="primary"
            type="submit"
            className="mx-auto w-[200px]"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InformationPage;
