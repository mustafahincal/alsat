import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useCreditCardContext } from "../../context/CreditCardContext";
import {
  deleteCreditCard,
  getCreditCardDetails,
  getCreditCardDetailsByUserId,
} from "../../services/creditCardService";
import { AiFillDelete } from "react-icons/ai";
import { getFromLocalStorage } from "../../services/localStorageService";
import { useSubmitContext } from "../../context/SubmitContext";

function CreditCard() {
  const { creditCards, setCreditCards } = useCreditCardContext();
  const { isSubmitting, setIsSubmitting } = useSubmitContext();
  useEffect(() => {
    setIsSubmitting(false);
    getCreditCardDetailsByUserId(getFromLocalStorage("userId")).then((result) =>
      setCreditCards(result.data)
    );
  }, []);

  const handleDeleteCreditCard = (creditCardId) => {
    setIsSubmitting(true);
    deleteCreditCard(creditCardId).then((result) => {
      toast.success("Kredi Kartı Kaldırıldı");
      setIsSubmitting(false);
      getCreditCardDetailsByUserId(getFromLocalStorage("userId")).then(
        (result) => setCreditCards(result.data)
      );
    });
  };

  return (
    <div>
      {creditCards.length !== 0 ? (
        <div>
          {creditCards.map((creditCard, index) => (
            <div
              className="py-4 px-3 sm:px-10 rounded w-full mb-3 flex justify-between  transition-all duration-75  bg-white hover:border-gray-800 border-2 border-gray-100 dark:border-gray-700  dark:bg-gray-800 dark:hover:border-gray-100"
              key={index}
            >
              <div className="flex flex-col xl:flex-row xl:justify-between w-full sm:pr-10">
                <div className="flex flex-row justify-between xl:flex-col items-center">
                  <div>Kullanıcı Ad</div>
                  <div>{creditCard.firstName + " " + creditCard.lastName}</div>
                </div>
                <div className="flex flex-row justify-between xl:flex-col items-center">
                  <div>Kart Üzerindeki Ad</div>
                  <div>{creditCard.cardHolder}</div>
                </div>
                <div className="flex flex-row justify-between xl:flex-col items-center">
                  <div>Email</div>
                  <div>{creditCard.email}</div>
                </div>
                <div className="flex flex-row justify-between xl:flex-col items-center">
                  <div>Kart Numara</div>
                  <div> {creditCard.cardNumber}</div>
                </div>
                <div className="flex flex-row justify-between xl:flex-col items-center">
                  <div>Son Kullanım Tarihi</div>
                  <div>{creditCard.expirationDate}</div>
                </div>
                <div className="flex flex-row justify-between xl:flex-col items-center">
                  <div>CVV</div>
                  <div>{creditCard.cvvCode}</div>
                </div>
              </div>
              <div
                className={`cursor-pointer btn border-2 box-border bg-white border-red-600 transition-all text-red-500 hover:bg-red-500 hover:text-white ml-3 flex justify-center items-center ${
                  isSubmitting ? "submitting" : ""
                }`}
                onClick={() => handleDeleteCreditCard(creditCard.creditCardId)}
                disabled={isSubmitting}
              >
                <AiFillDelete className="text-2xl" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-5 py-5 bg-indigo-200 rounded-lg text-2xl text-black  text-center">
          Kayıtlı kartınız yoktur
        </div>
      )}
    </div>
  );
}

export default CreditCard;
