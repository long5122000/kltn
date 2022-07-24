import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
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
  billStatus,
  categoryStatus,
  userRole,
} from "../../utils/constants";
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
  const [bill, setBill] = useState([]);
  const [product, setProduct] = useState([]);
  const [check, setCheck] = useState([]);
  const [status, setStatus] = useState([]);
  const [params] = useSearchParams();
  const billId = params.get("id");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "AuthCheckOut", billId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
      setBill(singleDoc.data());
    }
    fetchData();
  }, [billId, reset]);
  console.log("bill", bill);
  const watchStatus = watch("status");

  const handleUpdateCategory = async (values) => {
    // if (userInfo?.role !== userRole.ADMIN) {
    //   Swal.fire("Failed", "You have no right to do this action", "warning");
    //   return;
    // }

    const colRef = doc(db, "AuthCheckOut", billId);
    await updateDoc(colRef, {
      ...values,
      status: Number(values.status),
    });
    toast.success("Update Bill Successfully");
    async function fetchData() {
      const colRef = doc(db, "AuthCheckOut", billId);
      const singleDoc = await getDoc(colRef);
      setProduct(singleDoc.data());
    }
    fetchData();
  };

  if (product.status === 1) {
    product.cart.map(async (item) => {
      const docRef = doc(db, "products", item.id);
      await updateDoc(docRef, {
        quality: Number(item.quality - item.totalquantyti),
      });
    });
  }

  if (!billId) return null;

  return (
    <div>
      <DashboardHeading
        title="Update Bill"
        desc={`Update your Bill id ${billId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Address</Label>
            <Input
              control={control}
              name="address"
              placeholder="Enter your category name"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Phone</Label>
            <Input
              control={control}
              name="phone"
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
                checked={Number(watchStatus) === billStatus.APPROVED}
                value={billStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === billStatus.PENDING}
                value={billStatus.PENDING}
              >
                PENDING
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === billStatus.REJECTED}
                value={billStatus.REJECTED}
              >
                REJECTED
              </Radio>
            </div>
          </Field>
          <Field>
            <h3 className="text-center text-[#222] text-2xl mb-5 font-bold">
              Date:
              {new Date(bill?.createdAt?.seconds * 1000).toLocaleDateString(
                "vi-VI"
              )}
            </h3>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <table class="table-auto mx-auto border-separate border-spacing-2 border border-slate-500 py-5">
              <tbody>
                {bill.cart &&
                  bill.cart.length > 0 &&
                  bill.cart.map((item) => (
                    <tr>
                      <td className="w-[100px]">
                        {" "}
                        <img
                          src={item.images}
                          alt=""
                          className="w-[50px] h-[50px] "
                        />
                      </td>
                      <td className="w-[100px]">
                        {" "}
                        <span className="flex items-center">{item.title} </span>
                      </td>
                      <td className="w-[100px] text-center">
                        {" "}
                        <span className="flex items-center text-center font-bold justify-center">
                          {" "}
                          x {item.totalquantyti}{" "}
                        </span>
                      </td>
                      <td className="w-[100px] text-center">
                        <span className="flex items-center text-center font-bold justify-center">
                          {item.pricesale * item.totalquantyti}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Field>
          <Field>
            <h3 className="text-center text-[#222] text-2xl py-5 font-bold">
              Total: {bill.total}$
            </h3>
          </Field>
        </div>
        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[250px]"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update bill
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
