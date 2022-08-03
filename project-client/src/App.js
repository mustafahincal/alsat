import Navi from "./components/navi/Navi";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Main from "./components/main/Main";
import ProductDetails from "./components/product/ProductDetails";
import OfferForProduct from "./components/product/OfferForProduct";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import AddProduct from "./components/dashboard/add/AddProduct";
import UpdateProduct from "./components/dashboard/update/UpdateProduct";
import { ToastContainer } from "react-toastify";
import UpdateUser from "./components/dashboard/update/UpdateUser";
import Profile from "./components/profile/Profile";
import Page404 from "./components/page404/Page404";

export default function App() {
  return (
    <>
      <div className="font-poppins bg-gray-100 min-h-screen">
        <Navi />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main/*" element={<Main />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/offerForProduct/:id" element={<OfferForProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />
          <Route path="/updateUser/:id" element={<UpdateUser />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
