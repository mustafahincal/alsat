import Yup from "./validation";

export const ChangePasswordSchema = Yup.object().shape({
  oldPass: Yup.string().required(),
  newPass: Yup.string().required().min(5),
  newPassConfirm: Yup.string()
    .oneOf([Yup.ref("newPass")], "Parolalar uyuşmuyor")
    .required(),
});
