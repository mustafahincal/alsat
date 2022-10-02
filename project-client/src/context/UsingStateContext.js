import { createContext, useContext, useState } from "react";

const UsingStateContext = createContext();

export const UsingStateProvider = ({ children }) => {
  const [usingStates, setUsingStates] = useState([]);
  const [selectedUsingState, setSelectedUsingState] = useState(0);
  const [updateUsingStateStatus, setUpdateUsingStateStatus] = useState(false);

  const values = {
    usingStates,
    setUsingStates,
    selectedUsingState,
    setSelectedUsingState,
    updateUsingStateStatus,
    setUpdateUsingStateStatus,
  };

  return (
    <UsingStateContext.Provider value={values}>
      {children}
    </UsingStateContext.Provider>
  );
};

export const UseUsingStateContext = () => useContext(UsingStateContext);
