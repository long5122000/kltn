import { collection, getDocs, query, where } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase-app/firebase-config";
import useLocalStorage from "./useLocalStorage";
const GalleryContext = createContext();

function GalleryProvider(props) {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

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
  console.log(products);
  // function toggleFavorite(photoId) {
  //   const updatedArray = photos.map((photo) => {
  //     if (photo.id === photoId) {
  //       return { ...photo, isFavorite: !photo.isFavorite };
  //     }
  //     return photo;
  //   });
  //   setPhotos(updatedArray);
  //   setValue(updatedArray);
  // }
  // 1. Viết function addToCart

  function addToCart(newItem) {
    // 3. Cập nhật lại state giỏ hàng (cartItems)
    setCartItems(newItem);
    setValues((prevItems) => [...prevItems, newItem]);
  }

  const [values, setValues] = useLocalStorage("cartItems", []);
  // function removeFromCart(photoId) {
  //   setCartItems((prevItems) => {
  //     const result = prevItems.filter((item) => item.id !== photoId);
  //     setStoredCart(result);
  //     return result;
  //   });
  // }

  const value = {
    addToCart,
    products,
    cartItems,
    favoriteList,
  };
  return (
    <GalleryContext.Provider value={value} {...props}></GalleryContext.Provider>
  );
}

function useGallery() {
  const context = useContext(GalleryContext);
  if (typeof context === "undefined")
    throw new Error("useGallery must be used within a GalleryProvider");
  return context;
}
export { useGallery, GalleryProvider };
