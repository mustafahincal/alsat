import { createContext, useContext, useState } from "react";

const OfferContext = createContext();

export const OfferProvider = ({ children }) => {
  const [takenOffers, setTakenOffers] = useState([]);
  const [givenOffers, setGivenOffers] = useState([]);

  const values = { givenOffers, setGivenOffers, takenOffers, setTakenOffers };

  return (
    <OfferContext.Provider value={values}>{children}</OfferContext.Provider>
  );
};

export const useOfferContext = () => useContext(OfferContext);
