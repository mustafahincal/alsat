import { createContext, useContext, useEffect, useState } from "react";

const OfferContext = createContext();

export const OfferProvider = ({ children }) => {
  const [takenOffers, setTakenOffers] = useState([]);
  const [givenOffers, setGivenOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState({});
  const [offers, setOffers] = useState([]);

  const values = {
    givenOffers,
    setGivenOffers,
    takenOffers,
    setTakenOffers,
    selectedOffer,
    setSelectedOffer,
    offers,
    setOffers,
  };

  return (
    <OfferContext.Provider value={values}>{children}</OfferContext.Provider>
  );
};

export const useOfferContext = () => useContext(OfferContext);
