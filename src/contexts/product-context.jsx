import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase-app/firebase-config";

const ProductContext = createContext();

function ProductProvider(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "products");

      const querySnapshot = await getDocs(colRef);
      let result = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setProducts(result);
    }
    getData();
  }, []);
  const productPrice = products.map((item) => {
    return { quanlity: item.quality, id: item.id };
  });
  console.log(productPrice);
  const value = { products, productPrice };

  return (
    <ProductContext.Provider value={value} {...props}></ProductContext.Provider>
  );
}
function useProduct() {
  const context = useContext(ProductContext);
  if (typeof context === "undefined")
    throw new Error("useProduct must be used within ProductProvider");
  return context;
}
export { ProductProvider, useProduct };
