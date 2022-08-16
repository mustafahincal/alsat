import { createContext, useContext, useEffect, useState } from "react";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [file, setFile] = useState(false);
  const values = {
    file,
    setFile,
  };

  useEffect(() => {
    setFile(false);
  }, []);

  return <FileContext.Provider value={values}>{children}</FileContext.Provider>;
};

export const useFileContext = () => useContext(FileContext);
