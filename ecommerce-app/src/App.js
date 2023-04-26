import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import About from "./pages/about";
import Contact from "./pages/contact";
import PrivacyPolicy from "./pages/privacyPolicy";
import PageNotFound from "./pages/pageNotFound";
import SignUp from "./pages/Auth/signUp";
import SignIn from "./pages/Auth/signIn";
import Dashboard from "./pages/user/dashboard";
import PrivateRoute from "./components/routes/private";
import ForgotPassword from "./pages/Auth/forgotPassword";
import AdminRoute from "./components/routes/adminRoute";
import AdminDashboard from "./pages/Admin/adminDashboard";
import CreateCategory from "./pages/Admin/createCategory";
import CreateProduct from "./pages/Admin/createProduct";
import Users from "./pages/Admin/users";
import Orders from "./pages/user/orders";
import Profile from "./pages/user/profile";
import Products from "./pages/Admin/products";
import UpdateProduct from "./pages/Admin/updateProduct";
import SearchPage from "./pages/searchPage";
import ProductDetail from "./pages/productDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/product" element={<Products />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="forgot-password" element={<ForgotPassword />}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
