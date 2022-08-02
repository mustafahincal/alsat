import React from "react";
import ReactDOM from "react-dom/client";
import "./tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { ColorProvider } from "./context/ColorContext";
import { BrandProvider } from "./context/BrandContext";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import { FileProvider } from "./context/FileContext";
import { OfferProvider } from "./context/OfferContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ProductProvider>
      <ColorProvider>
        <BrandProvider>
          <OfferProvider>
            <UserProvider>
              <AuthProvider>
                <FileProvider>
                  <App />
                </FileProvider>
              </AuthProvider>
            </UserProvider>
          </OfferProvider>
        </BrandProvider>
      </ColorProvider>
    </ProductProvider>
  </BrowserRouter>
);
