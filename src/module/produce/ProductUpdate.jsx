import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import { Dropdown } from "../../components/dropdown";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Textarea from "../../components/textarea/Textarea";
import Toggle from "../../components/toggle/Toggle";
import { db } from "../../firebase-app/firebase-config";
import { categoryStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashBoardHeading";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
const ProductUpdate = () => {
  const [params] = useSearchParams();
  const productId = params.get("id");
  const [content, setContent] = useState("");
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onchange",
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectBrands, setSelectBrands] = useState("");
  const [brands, setBrands] = useState("");
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  // const imageUrl = getValues("image");
  // const imageName = getValues("image_name");
  // const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
  //   useFirebaseImage(setValue, getValues, imageName, deletePostImage);
  // async function deletePostImage() {
  //   const colRef = doc(db, "posts", postId);
  //   await updateDoc(colRef, {
  //     avatar: "",
  //   });
  // }
  // useEffect(() => {
  //   setImage(imageUrl);
  // }, [imageUrl, setImage]);
  const watchStatus = watch("status");
  const watchFeature = watch("feature");
  const watchCategory = watch("category");
  const watchHot = watch("hot");
  const updateProductHandle = async (values) => {
    const docRef = doc(db, "products", productId);
    if (!isValid) return;
    await updateDoc(docRef, {
      ...values,
      content,
    });
    toast.success("update successfully");
  };
  useEffect(() => {
    async function fetchData() {
      if (!productId) return;
      const docRef = doc(db, "products", productId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.data()) {
        reset(docSnapshot.data());
        setSelectCategory(docSnapshot.data()?.category || "");
        setSelectBrands(docSnapshot.data()?.brands?.name || "");
        setContent(docSnapshot.data()?.content || "");
        setUrls(docSnapshot.data()?.images || "");
      }
      console.log(docSnapshot.data());
    }
    fetchData();
  }, [productId, reset]);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
  }, []);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "brands");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setBrands(result);
    }
    getData();
  }, []);
  const handleClickOptionCategory = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  };
  const handleClickOptionBrand = async (item) => {
    const colRef = doc(db, "brands", item.id);
    const docData = await getDoc(colRef);
    setValue("brands", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectBrands(item);
  };
  async function deleteProductImage() {
    const colRef = doc(db, "products", productId);
    await updateDoc(colRef, {
      images: "",
    });
    setUrls("");
  }
  let newImage = [];
  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };
  console.log(images);
  const handleUpload = () => {
    const promises = [];
    const storage = getStorage();
    images.map((image) => {
      const storageRef = ref(storage, "images/" + image.name);
      const uploadTask = uploadBytesResumable(storageRef, image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setUrls((prevState) => [...prevState, downloadURL]);
          });
        }
      );
    });

    Promise.all(promises)
      .then(() => console.log("All images uploaded"))
      .catch((err) => console.log(err));
  };
  setValue("images", urls);
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        // imgbbAPI
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: "https://api.imgbb.com/1/upload?key=b6bfd1e94785407c48504978a7ef5c3a",
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  const handleDeleteImage = () => {};
  if (!productId) return null;
  return (
    <div>
      <DashboardHeading
        title="Update Product"
        desc={`Update your product id ${productId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(updateProductHandle)}>
        <div className=" mb-10">
          <Field>
            <Label>Image</Label>
            <div className="flex gap-x-5">
              <div className="">
                <progress value={progress} max="100" />
                <br />
                <br />
                <input type="file" multiple onChange={handleChange} />

                <button onClick={handleUpload}>Upload</button>
                <br />
              </div>
              <div className="flex gap-x-2 flex-1">
                {urls &&
                  urls.map((item, i) => (
                    <Fragment key={i}>
                      <label
                        className={`cursor-pointer flex items-center justify-center border border-dashed w-full min-h-[200px] rounded-lg  relative overflow-hidden group`}
                      >
                        <img
                          src={item}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                        <button
                          type="button"
                          className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer absolute z-10 text-red-500 opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible"
                          onClick={deleteProductImage}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </label>
                    </Fragment>
                  ))}
              </div>
            </div>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid mb-10">
          <Field>
            <Label>Content</Label>
            <div className="w-full entry-content">
              <ReactQuill
                modules={modules}
                theme="snow"
                value={content}
                onChange={setContent}
              />
            </div>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Price</Label>
            <Input
              control={control}
              placeholder="Enter your price"
              name="price"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Price Sale</Label>
            <Input
              control={control}
              placeholder="Enter your price salde"
              name="pricesale"
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
            <Label>Quality</Label>
            <Input
              control={control}
              placeholder="Enter your quality"
              name="quality"
              required
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Desc</Label>
            <Textarea
              control={control}
              placeholder="Enter your desc"
              name="desc"
              required
            ></Textarea>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOptionCategory(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                {selectCategory?.name}
              </span>
            )}
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Brands</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the brand"></Dropdown.Select>
              <Dropdown.List>
                {brands.length > 0 &&
                  brands.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOptionBrand(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectBrands?.name && (
              <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                {selectBrands?.name}
              </span>
            )}
          </Field>
          <Field>
            <Label>Hot </Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          <Field>
            <Label>Feature Product</Label>
            <Toggle
              on={watchFeature === true}
              onClick={() => setValue("feature", !watchFeature)}
            ></Toggle>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[250px]"
          // isLoading={loading}
          // disabled={loading}
        >
          Update post
        </Button>
      </form>
    </div>
  );
};

export default ProductUpdate;
