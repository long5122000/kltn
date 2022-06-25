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

  // function addToCart(newItem) {
  //   // 3. Cập nhật lại state giỏ hàng (cartItems)

  //   setCartItems((prevItems) => [...prevItems, newItem]);
  // }
  function addToCart(newItem) {
    // 3. Cập nhật lại state giỏ hàng (cartItems)
    setCartItems((prevItems) => {
      // 4. Kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
      const isExisted = prevItems.some((item) => item.id === newItem.id);
      console.log("setCartItems ~ isExisted", isExisted);
      // 5. Nếu tồn tại thì trả về danh sách trước đó
      if (isExisted) {
        // setStoredCart([...prevItems]);
        prevItems.map((item) => {
          if (item.id === newItem.id) item.quality += 1;
        });
        return [...prevItems];
      }
      // 6. Chưa tồn tại thì thêm vào giỏ hàng
      setCartItems([...prevItems, newItem]);
      return [...prevItems, newItem];
    });
  }
  function Decrement(productId) {
    return (item.quality += 1);
  }
  // const [values, setValues] = useLocalStorage("cartItems", []);
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
