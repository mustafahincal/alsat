import { createContext, useContext, useEffect, useState } from "react";

const NaviContext = createContext();

export const NaviProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
  }, []);

  const values = {
    visible,
    setVisible,
  };

  return <NaviContext.Provider value={values}>{children}</NaviContext.Provider>;
};

export const useNaviContext = () => useContext(NaviContext);
