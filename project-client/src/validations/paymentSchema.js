import Yup from "./validation";

export const PaymentSchema = Yup.object().shape({
  cardHolder: Yup.string().required(),
  cardNumber: Yup.string().required().max(16).min(16),
  expirationDate: Yup.string().required(),
  cvvCode: Yup.string().required().max(3).min(3),
});
