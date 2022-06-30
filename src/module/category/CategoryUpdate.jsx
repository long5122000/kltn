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
import { bannerStatus, categoryStatus, userRole } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashBoardHeading";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { stringify } from "@firebase/util";
import slugify from "slugify";

const CategoryUpdate = () => {
  const {
    control,
    reset,
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const imageUrl = getValues("image");
  const imageName = getValues("image_name");
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName);
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [categoryId, reset]);
  const watchStatus = watch("status");
  const handleUpdateCategory = async (values) => {
    // if (userInfo?.role !== userRole.ADMIN) {
    //   Swal.fire("Failed", "You have no right to do this action", "warning");
    //   return;
    // }
    const colRef = doc(db, "categories", categoryId);
    await updateDoc(colRef, {
      name: values.name,
      image,
      slug: slugify(values.slug || values.name, { lower: true }),
      status: Number(values.status),
    });
    toast.success("Update Category Successfully");
    navigate("/manage/category");
  };
  if (!categoryId) return null;

  return (
    <div>
      <DashboardHeading
        title="Update Category"
        desc={`Update your category id ${categoryId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
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
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
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
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
