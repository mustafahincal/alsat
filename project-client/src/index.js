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
import { CategoryProvider } from "./context/CategoryContext";
import { UsingStateProvider } from "./context/UsingStateContext";
import { NaviProvider } from "./context/NaviContext";
import { PaymentProvider } from "./context/PaymentContext";
import { CreditCardProvider } from "./context/CreditCardContext";
import { ThemeProvider } from "./context/ThemeContext";
import { SubmitProvider } from "./context/SubmitContext";

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
                  <CategoryProvider>
                    <UsingStateProvider>
                      <NaviProvider>
                        <PaymentProvider>
                          <CreditCardProvider>
                            <ThemeProvider>
                              <SubmitProvider>
                                <App />
                              </SubmitProvider>
                            </ThemeProvider>
                          </CreditCardProvider>
                        </PaymentProvider>
                      </NaviProvider>
                    </UsingStateProvider>
                  </CategoryProvider>
                </FileProvider>
              </AuthProvider>
            </UserProvider>
          </OfferProvider>
        </BrandProvider>
      </ColorProvider>
    </ProductProvider>
  </BrowserRouter>
);
