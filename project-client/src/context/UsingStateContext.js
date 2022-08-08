import { createContext, useContext, useState } from "react";

const UsingStateContext = createContext();

export const UsingStateProvider = ({ children }) => {
  const [usingStates, setUsingStates] = useState([]);
  //   const [selectedBrand, setSelectedBrand] = useState(0);
  //   const [updateBrandStatus, setUpdateBrandStatus] = useState(false);

  const values = {
    usingStates,
    setUsingStates,
  };

  return (
    <UsingStateContext.Provider value={values}>
      {children}
    </UsingStateContext.Provider>
  );
};

export const UseUsingStateContext = () => useContext(UsingStateContext);
