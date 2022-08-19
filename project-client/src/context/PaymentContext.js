import { createContext, useContext, useState } from "react";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [saveCardModalActive, setSaveCardModalActive] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const values = {
    saveCardModalActive,
    setSaveCardModalActive,
    isSaved,
    setIsSaved,
  };

  return (
    <PaymentContext.Provider value={values}>{children}</PaymentContext.Provider>
  );
};

export const usePaymentContext = () => useContext(PaymentContext);
