import Yup from "./validation";

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required().max(100),
  categoryId: Yup.string()
    .required()
    .notOneOf(["0", 0], "Kategori Alanı Zorunludur"),
  brandId: Yup.string(),
  colorId: Yup.string(),
  price: Yup.number().required().min(0),
  description: Yup.string().required().max(500),
  usingStateId: Yup.string()
    .required()
    .notOneOf(["0", 0], "Kullanım Durumu Alanı Zorunludur"),
  isOfferable: Yup.string()
    .required()
    .notOneOf(["Teklif Durumu", 0, "0"], "Teklif Durumu Alanı Zorunludur"),
});
