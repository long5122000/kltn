import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";
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
import { useNavigate, useSearchParams } from "react-router-dom";

const BannerUpdate = () => {
  const [params] = useSearchParams();
  const bannerId = params.get("id");

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
  });
  const imageUrl = getValues("image");
  const imageName = getValues("image_name");
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName);

  const navigate = useNavigate();
  // async function deletePostImage() {
  //   const colRef = doc(db, "banner", bannerId);
  //   await updateDoc(colRef, {
  //     avatar: "",
  //   });
  // }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchData() {
      if (!bannerId) return;
      const colRef = doc(db, "banner", bannerId);
      const singleDoc = await getDoc(colRef);
      if (singleDoc.data()) {
        reset(singleDoc.data());
      }
    }
    fetchData();
  }, [bannerId, reset]);

  const watchStatus = watch("status");
  const watchType = watch("type");
  const handleUpdateBanner = async (values) => {
    console.log(values);
    const colRef = doc(db, "banner", bannerId);
    if (!isValid) return;
    await updateDoc(colRef, {
      ...values,
      image,
    });
    toast.success("Update Banner Successfully");
    navigate("/manage/banners");
  };
  if (!bannerId) return null;

  return (
    <div>
      <DashboardHeading
        title="Update Banner"
        desc="Update  Banner"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateBanner)}>
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
              <Radio
                name="type"
                control={control}
                checked={Number(watchType) === bannerType.BOTTOMBANNER}
                value={bannerType.BOTTOMBANNER}
              >
                Bottom Banner
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
          Update Banner
        </Button>
      </form>
    </div>
  );
};

export default BannerUpdate;
