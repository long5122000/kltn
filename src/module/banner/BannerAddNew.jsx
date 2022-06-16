import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Field from "../../components/field/Field";
import ImageUpload from "../../components/image/ImageUpload";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import { db } from "../../firebase-app/firebase-config";
import useFirebaseImage from "../../hook/useFirebaseImage";
import { bannerStatus, bannerType } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashBoardHeading";
import { toast } from "react-toastify";
const BannerAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      desc: "",
      type: 1,
      status: 1,
      createdAt: new Date(),
      image: "",
    },
  });
  const {
    handleSelectImage,
    handleResetUpload,
    handleDeleteImage,
    image,
    progress,
  } = useFirebaseImage(setValue, getValues);
  const handleAddNewBanner = async (values) => {
    if (!isValid) return;
    const newValues = { ...values };
    console.log(newValues);
    newValues.status = Number(newValues.status);
    newValues.type = Number(newValues.type);
    const colRef = collection(db, "banner");
    try {
      await addDoc(colRef, {
        ...newValues,
        image,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new banner successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        title: "",
        desc: "",
        status: 1,
        type: 1,
        image: "",
        createdAt: new Date(),
      });
      handleResetUpload();
    }
  };
  const watchStatus = watch("status");
  const watchType = watch("type");
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewBanner)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              progress={progress}
              image={image}
              handleDeleteImage={handleDeleteImage}
              className="h-[300px]"
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === bannerStatus.APPROVED}
                value={bannerStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === bannerStatus.UNAPPROVED}
                value={bannerStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Type</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="type"
                control={control}
                checked={Number(watchType) === bannerType.MAINBANNER}
                value={bannerType.MAINBANNER}
              >
                Main Banner
              </Radio>
              <Radio
                name="type"
                control={control}
                checked={Number(watchType) === bannerType.SUBBANNER}
                value={bannerType.SUBBANNER}
              >
                Sub Banner
              </Radio>
            </div>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              name="title"
              placeholder="Enter your title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Desc</Label>
            <Input
              control={control}
              name="desc"
              placeholder="Enter your Description"
            ></Input>
          </Field>
        </div>

        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[250px]"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default BannerAddNew;
