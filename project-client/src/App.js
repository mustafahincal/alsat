import Navi from "./components/navi/Navi";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Main from "./components/main/Main";
import ProductDetails from "./components/product/ProductDetails";
import OfferForProduct from "./components/product/OfferForProduct";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import AddProduct from "./components/product/AddProduct";
import UpdateProduct from "./components/product/UpdateProduct";
import { ToastContainer } from "react-toastify";
import UpdateUser from "./components/profile/UpdateUser";
import Profile from "./components/profile/Profile";
import Page404 from "./components/page404/Page404";
import Payment from "./components/product/Payment";
import Footer from "./components/footer/Footer";
import { useNaviContext } from "./context/NaviContext";

export default function App() {
  const { visible, setVisible } = useNaviContext();

  const handleVisible = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="font-poppins bg-gray-100 min-h-screen flex flex-col justify-between">
        <div>
          <Navi />
          <div
            className="py-4 dark:bg-gray-700 dark:text-white"
            onClick={handleVisible}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/main/*" element={<Main />} />
              <Route path="/productDetails/:id" element={<ProductDetails />} />
              <Route
                path="/offerForProduct/:id"
                element={<OfferForProduct />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/payment/product/:productId" element={<Payment />} />
              <Route path="/payment/offer/:offerId" element={<Payment />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/updateProduct/:id" element={<UpdateProduct />} />
              <Route path="/updateUser/:id" element={<UpdateUser />} />
              <Route path="/profile/*" element={<Profile />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </div>
        </div>
        <div>
          <Footer />
        </div>
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
