import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import { AuthProvider } from "./contexts/auth-context";
import { GalleryProvider } from "./contexts/gallery-context";
import { ProductProvider } from "./contexts/product-context";
import BannerAddNew from "./module/banner/BannerAddNew";
import BannerManage from "./module/banner/BannerManage";
import BannerUpdate from "./module/banner/BannerUpdate";
import BillManage from "./module/bill/BillManage";
import BillUpdate from "./module/bill/BillUpdate";
import BrandAddnew from "./module/brand/BrandAddnew";
import BrandManage from "./module/brand/BrandManage";
import BrandUpdate from "./module/brand/BrandUpdate";
import CategoryAddNew from "./module/category/CategoryAddNew";
import CategoryManage from "./module/category/CategoryManage";
import CategoryUpdate from "./module/category/CategoryUpdate";
import DashboardLayout from "./module/dashboard/DashBoardLayout";
import ProductAddNew from "./module/produce/ProductAddNew";
import ProductManage from "./module/produce/ProductManage";
import ProductUpdate from "./module/produce/ProductUpdate";
import ShopCategory from "./module/shop/ShopCategory";
import ShopLayout from "./module/shop/ShopLayout";
import ShopPriceLarge from "./module/shop/ShopPriceLarge";
import ShopPriceLow from "./module/shop/ShopPriceLow";
import ShopPriceMedium from "./module/shop/ShopPriceMedium";
import UserAddNew from "./module/user/UserAddNew";
import UserManage from "./module/user/UserManage";
import UserUpdate from "./module/user/UserUpdate";
import About from "./pages/About";
import BillDetailPage from "./pages/BillDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Contact from "./pages/Contact";
import DashboardPage from "./pages/DashboardPage";
import InformationPage from "./pages/InformationPage";
import MyBill from "./pages/MyBill";
import NotFoundPage from "./pages/NotFoundPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SearchPage from "./pages/SearchPage";
import SignInPage1 from "./pages/SignInPage1";
import SignUpPage from "./pages/SignUpPage";
import store from "./redux/configureStore";

function App() {
  return (
    <div>
      <Provider store={store}>
        <AuthProvider>
          <ProductProvider>
            <Routes>
              <Route element={<Header></Header>}>
                <Route path="/" element={<Main></Main>}></Route>
                <Route path="/shop" element={<ShopLayout></ShopLayout>}></Route>
                <Route
                  path="/product/:id"
                  element={<ProductDetailPage></ProductDetailPage>}
                ></Route>
                <Route
                  path="/my-Bill/:id"
                  element={<BillDetailPage></BillDetailPage>}
                ></Route>
                <Route
                  path="/shop/:name"
                  element={<ShopCategory></ShopCategory>}
                ></Route>
                <Route
                  path="/shop/price100000"
                  element={<ShopPriceLow></ShopPriceLow>}
                ></Route>
                <Route
                  path="/shop/100000price500000"
                  element={<ShopPriceMedium></ShopPriceMedium>}
                ></Route>
                <Route
                  path="/shop/price500000"
                  element={<ShopPriceLarge></ShopPriceLarge>}
                ></Route>
                <Route
                  path="/search"
                  element={<SearchPage></SearchPage>}
                ></Route>
                <Route path="/my-cart" element={<CartPage></CartPage>}></Route>
                <Route path="/my-bill" element={<MyBill></MyBill>}></Route>
                <Route
                  path="/sign-in"
                  element={<SignInPage1></SignInPage1>}
                ></Route>
                <Route
                  path="/sign-up"
                  element={<SignUpPage></SignUpPage>}
                ></Route>
                <Route path="/contact" element={<Contact></Contact>}></Route>
                <Route path="/about" element={<About></About>}></Route>
                <Route
                  path="/info"
                  element={<InformationPage></InformationPage>}
                ></Route>
                <Route
                  path="/checkout"
                  element={<CheckoutPage></CheckoutPage>}
                ></Route>

                <Route
                  path="/404-page"
                  element={<NotFoundPage></NotFoundPage>}
                ></Route>
              </Route>
              <Route element={<DashboardLayout> </DashboardLayout>}>
                <Route
                  path="/dashboard"
                  element={<DashboardPage></DashboardPage>}
                ></Route>
                <Route
                  path="/manage/add-banner"
                  element={<BannerAddNew></BannerAddNew>}
                ></Route>
                <Route
                  path="/manage/update-banner"
                  element={<BannerUpdate></BannerUpdate>}
                ></Route>
                <Route
                  path="/manage/banners"
                  element={<BannerManage></BannerManage>}
                ></Route>
                <Route
                  path="/manage/add-category"
                  element={<CategoryAddNew></CategoryAddNew>}
                ></Route>
                <Route
                  path="/manage/category"
                  element={<CategoryManage></CategoryManage>}
                ></Route>
                <Route
                  path="/manage/update-category"
                  element={<CategoryUpdate></CategoryUpdate>}
                ></Route>
                <Route
                  path="/manage/add-user"
                  element={<UserAddNew></UserAddNew>}
                ></Route>
                <Route
                  path="/manage/user"
                  element={<UserManage></UserManage>}
                ></Route>
                <Route
                  path="/manage/update-user"
                  element={<UserUpdate></UserUpdate>}
                ></Route>
                <Route
                  path="/manage/bills"
                  element={<BillManage></BillManage>}
                ></Route>
                <Route
                  path="/manage/update-bill"
                  element={<BillUpdate></BillUpdate>}
                ></Route>
                <Route
                  path="/manage/add-product"
                  element={<ProductAddNew></ProductAddNew>}
                ></Route>
                <Route
                  path="/manage/products"
                  element={<ProductManage></ProductManage>}
                ></Route>
                <Route
                  path="/manage/add-brand"
                  element={<BrandAddnew></BrandAddnew>}
                ></Route>
                <Route
                  path="/manage/brands"
                  element={<BrandManage></BrandManage>}
                ></Route>
                <Route
                  path="/manage/update-brand"
                  element={<BrandUpdate></BrandUpdate>}
                ></Route>
                <Route
                  path="/manage/update-product"
                  element={<ProductUpdate></ProductUpdate>}
                ></Route>
                {/* <Route
              path="/manage/posts"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
            <Route
              path="/manage/update-post"
              element={<PostUpdate></PostUpdate>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/manage/update-category"
              element={<CategoryUpdate></CategoryUpdate>}
            ></Route>
            <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
            <Route
              path="/manage/add-user"
              element={<UserAddNew></UserAddNew>}
            ></Route>
            <Route
              path="/manage/update-user"
              element={<UserUpdate></UserUpdate>}
            ></Route>
            <Route
              path="/profile"
              element={<UserProfile></UserProfile>}
            ></Route> */}
              </Route>
            </Routes>
          </ProductProvider>
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
