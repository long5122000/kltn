import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Field from "../../components/field/Field";
import ImageUpload from "../../components/image/ImageUpload";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import { db } from "../../firebase-app/firebase-config";
import useFirebaseImage from "../../hook/useFirebaseImage";
import { brandStatus, productStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashBoardHeading";

const BrandAddnew = () => {
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    getValues,
    formState: { isValid },
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
  const watchStatus = watch("status");
  const handleAddNewBrand = async (values) => {
    if (!isValid) return;
    const newValues = { ...values };
    newValues.slug = slugify(newValues.name || newValues.slug, {
      lower: true,
    });
    newValues.status = Number(newValues.status);
    const colRef = collection(db, "brands");
    try {
      await addDoc(colRef, {
        ...newValues,
        image,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new category successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        name: "",
        slug: "",
        image: "",
        status: 1,
        createdAt: new Date(),
      });
    }
  };

  return (
    <div>
      <DashboardHeading
        title="New brand"
        desc="Add new brand"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewBrand)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === brandStatus.APPROVED}
                value={brandStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === brandStatus.UNAPPROVED}
                value={brandStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
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
        </div>

        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[250px]"
          // disabled={isSubmitting}
          // isLoading={isSubmitting}
        >
          Add new brand
        </Button>
      </form>
    </div>
  );
};

export default BrandAddnew;
