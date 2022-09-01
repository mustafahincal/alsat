import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import {
  deleteCreditCard,
  getCreditCardDetails,
} from "../../../services/creditCardService";
import { useCreditCardContext } from "../../../context/CreditCardContext";
import { useSubmitContext } from "../../../context/SubmitContext";

function ControlCreditCards() {
  const { creditCards, setCreditCards } = useCreditCardContext();
  const { isSubmitting, setIsSubmitting } = useSubmitContext();
  useEffect(() => {
    setIsSubmitting(false);
    getCreditCardDetails().then((result) => setCreditCards(result.data));
  }, []);

  const handleDeleteCreditCard = (creditCardId) => {
    setIsSubmitting(true);
    deleteCreditCard(creditCardId).then((result) => {
      toast.success("Kredi Kartı Kaldırıldı");
      setIsSubmitting(false);
      getCreditCardDetails().then((result) => setCreditCards(result.data));
    });
  };

  return (
    <div>
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
    </div>
  );
}

export default ControlCreditCards;
