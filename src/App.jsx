import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import ShopLayout from "./module/shop/ShopLayout";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SignInPage from "./pages/SigninPage";
import SignInPage1 from "./pages/SignInPage1";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Header></Header>}>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/shop" element={<ShopLayout></ShopLayout>}></Route>
          <Route
            path="/product/:id"
            element={<ProductDetailPage></ProductDetailPage>}
          ></Route>
          <Route path="/my-cart" element={<CartPage></CartPage>}></Route>
          <Route path="/sign-in" element={<SignInPage1></SignInPage1>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
