import { createContext, useContext, useState } from "react";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [saveCardModalActive, setSaveCardModalActive] = useState(false);
  const [selectedCreditCard, setSelectedCreditCard] = useState({});

  const values = {
    saveCardModalActive,
    setSaveCardModalActive,
    selectedCreditCard,
    setSelectedCreditCard,
  };

  return (
    <PaymentContext.Provider value={values}>{children}</PaymentContext.Provider>
  );
};

export const usePaymentContext = () => useContext(PaymentContext);
