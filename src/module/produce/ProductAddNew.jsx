import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Field from "../../components/field/Field";
import ImageUpload from "../../components/image/ImageUpload";
import Label from "../../components/label/Label";
import DashboardHeading from "../dashboard/DashBoardHeading";
import useFirebaseMultiImage from "../../hook/useFirebaseMultiImage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import slugify from "slugify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Input from "../../components/input/Input";
import Radio from "../../components/checkbox/Radio";
import { categoryStatus } from "../../utils/constants";
import Textarea from "../../components/textarea/Textarea";
import Toggle from "../../components/toggle/Toggle";
import { Dropdown } from "../../components/dropdown";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
const ProductAddNew = () => {
  const { handleSubmit, control, watch, setValue, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      images: "",
      slug: "",
      content: "",
      price: 0,
      pricesale: 0,
      status: 1,
      quality: 1,
      desc: "",
      categories: {},
      hot: false,
    },
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const handleCreateProduct = (values) => {};
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [selectCategory, setSelectCategory] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getCategoriesData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getCategoriesData();
  }, []);
  useEffect(() => {
    const colRef = collection(db, "products");
  });
  let newImage = [];
  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

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
      .then(() => alert("All images uploaded"))
      .catch((err) => console.log(err));
  };

  console.log("images: ", images);
  console.log("urls", urls);

  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleCreateProduct)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <div className="flex">
              <div className="">
                <progress value={progress} max="100" />
                <br />
                <br />
                <input type="file" multiple onChange={handleChange} />
                <button onClick={handleUpload}>Upload</button>
                <br />
              </div>
              <div className="flex gap-x-2">
                {urls.map((url, i) => (
                  <img
                    className="border border-gray-200"
                    key={i}
                    style={{ width: "200px" }}
                    src={url || "http://via.placeholder.com/300"}
                    alt="firebase-image"
                  />
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
            <div className="w-full">
              <ReactQuill
                // modules={modules}
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
                      onClick={() => handleClickOption(item)}
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
          <Field>
            <Label>Feature Post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
        </div>
      </form>
    </div>
  );
};

export default ProductAddNew;
