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
import {
  bannerStatus,
  brandStatus,
  categoryStatus,
} from "../../utils/constants";
import DashboardHeading from "../dashboard/DashBoardHeading";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { stringify } from "@firebase/util";
import slugify from "slugify";

const BrandUpdate = () => {
  const {
    control,
    reset,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const [params] = useSearchParams();
  const brandId = params.get("id");
  const navigate = useNavigate();
  const imageUrl = getValues("image");
  const imageName = getValues("image_name");
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName);
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "brands", brandId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [brandId, reset]);
  const watchStatus = watch("status");
  const handleUpdateBrand = async (values) => {
    const colRef = doc(db, "brands", brandId);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true }),
      status: Number(values.status),
    });
    toast.success("Update Brand Successfully");
    navigate("/manage/brands");
  };
  if (!brandId) return null;

  return (
    <div>
      <DashboardHeading
        title="Update Brand"
        desc={`Update your brand id ${brandId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateBrand)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your brand name"
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
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update brand
        </Button>
      </form>
    </div>
  );
};

export default BrandUpdate;
