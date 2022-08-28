import { createContext, useContext, useEffect, useState } from "react";

const SubmitContext = createContext();

export const SubmitProvider = ({ children }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const values = {
    isSubmitting,
    setIsSubmitting,
  };

  return (
    <SubmitContext.Provider value={values}>{children}</SubmitContext.Provider>
  );
};

export const useSubmitContext = () => useContext(SubmitContext);
