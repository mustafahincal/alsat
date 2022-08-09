import Yup from "./validation";

export const PaymentSchema = Yup.object().shape({
  name: Yup.string().required(),
  surname: Yup.string().required(),
  cardNumber: Yup.string().required().max(16),
  expirationDate: Yup.string().required(),
  cvvCode: Yup.string().required().max(3),
});
