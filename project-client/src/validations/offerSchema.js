import Yup from "./validation";

export const OfferSchema = Yup.object().shape({
  offeredPrice: Yup.string().required(),
});
