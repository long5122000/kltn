import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/layout/Footer";
import { db } from "../firebase-app/firebase-config";

const BillDetailPage = () => {
  const billId = useParams().id;
  console.log(billId);
  const [bill, setBill] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "AuthCheckOut", billId);

      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.data()) {
        setBill(docSnapshot.data());
      }
    }
    fetchData();
  }, []);
  console.log("bill", bill);
  return (
    <div className="bg-white">
      <div className="container min-h-[500px]">
        <h1 className="text-center text-[#222] text-4xl py-5">
          Detail Bills: {billId}
        </h1>
        <h3 className="text-center text-[#222] text-2xl">
          Address: {bill.address}
        </h3>
        <h3 className="text-center text-[#222] text-2xl py-3">
          Phone: {bill.phone}
        </h3>
        <h3 className="text-center text-[#222] text-2xl mb-5">
          Date:
          {new Date(bill?.createdAt?.seconds * 1000).toLocaleDateString(
            "vi-VI"
          )}
        </h3>

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
                      x {item.quality}{" "}
                    </span>
                  </td>
                  <td className="w-[100px] text-center">
                    <span className="flex items-center text-center font-bold justify-center">
                      {item.pricesale * item.quality}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <h3 className="text-center text-[#222] text-2xl py-5 font-bold">
          Total: {bill.total}$
        </h3>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default BillDetailPage;
