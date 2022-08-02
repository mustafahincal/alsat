import { createContext, useContext, useState } from "react";

const OfferContext = createContext();

export const OfferProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);

  const values = { offers, setOffers };

  return (
    <OfferContext.Provider value={values}>{children}</OfferContext.Provider>
  );
};

export const useOfferContext = () => useContext(OfferContext);
