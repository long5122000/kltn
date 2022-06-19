import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import ActionView from "../../components/action/ActionView";
import Button from "../../components/button/Button";
import LabelStatus from "../../components/label/LabelStatus";
import Table from "../../components/table/Table";
import { db } from "../../firebase-app/firebase-config";
import { productStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashBoardHeading";
const PRODUCT_PER_PAGE = 100;
const ProductManage = () => {
  const [productList, setProductList] = useState([]);
  const [filter, setFilter] = useState(undefined);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "products");
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : query(colRef, limit(PRODUCT_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
        console.log(snapshot.size);
      });

      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setProductList(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);
  const renderProductStatus = (status) => {
    switch (status) {
      case productStatus.APPROVED:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case productStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case productStatus.REJECTED:
        return <LabelStatus type="danger">Rejected</LabelStatus>;

      default:
        break;
    }
  };
  function handleDeleteProduct(productId) {
    const colRef = doc(db, "products", productId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
  return (
    <div>
      <DashboardHeading
        title="Products"
        desc="Manage your product"
      ></DashboardHeading>
      <div className="flex justify-end mb-10 ">
        <Button kind="ghost" to="/manage/add-product">
          Add new product
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th className="!py-[20px] !px-[110px] ">Id</th>
            <th className="!py-[20px] !px-[110px] ">Info</th>
            <th className="!py-[20px] !px-[110px] ">price</th>
            <th className="!py-[20px] !px-[110px] ">price sale</th>
            <th className="!py-[20px] !px-[110px] ">Status</th>
            <th className="!py-[20px] !px-[110px] ">desc</th>
            <th className="!py-[20px] !px-[110px] ">desc short</th>
            <th className="!py-[20px] !px-[110px] ">Brand</th>
            <th className="!py-[20px] !px-[110px] ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList.length > 0 &&
            productList.map((product) => (
              <tr>
                <td title={product.id} className="text-center">
                  {product.id.slice(0, 5) + "..."}
                </td>
                <td className="text-center">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={product?.images[0]}
                      alt=""
                      className="w-[66px] h-[55px] rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{product?.title}</h3>
                      <time className="text-sm text-gray-500">
                        Qty: {product?.quality}
                      </time>
                    </div>
                  </div>
                </td>
                <td className="text-center"> {product?.price}</td>
                <td className="text-center">{product?.pricesale}</td>
                <td className="text-center">
                  {renderProductStatus(product?.status)}
                </td>
                <td className="text-center" title={product?.content}>
                  {product?.content.slice(0, 10) + "..."}
                </td>
                <td className="text-center" title={product?.desc}>
                  {product?.desc.slice(0, 10) + "..."}
                </td>
                <td className="text-center">{product?.brand?.name}</td>
                <td className="text-center">
                  {" "}
                  <div className="flex justify-center items-center gap-x-3 text-gray-500">
                    <ActionView
                      onClick={() => navigate(`/product/${product.slug}`)}
                    ></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-product?id=${product.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteProduct(product.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductManage;
