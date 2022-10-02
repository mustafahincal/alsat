import Yup from "./validation";

export const OfferSchema = Yup.object().shape({
  offeredPercent: Yup.string().required(),
});
