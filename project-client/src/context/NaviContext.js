import { createContext, useContext, useEffect, useState } from "react";

const NaviContext = createContext();

export const NaviProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [bar, setBar] = useState(false);
  const [sidebarStatus, setSidebarStatus] = useState(false);

  useEffect(() => {
    setVisible(false);
    setSidebarStatus(false);
  }, []);

  const values = {
    visible,
    setVisible,
    bar,
    setBar,
    sidebarStatus,
    setSidebarStatus,
  };

  return <NaviContext.Provider value={values}>{children}</NaviContext.Provider>;
};

export const useNaviContext = () => useContext(NaviContext);
