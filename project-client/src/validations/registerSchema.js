import Yup from "./validation";

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required(),
  surname: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8).max(20),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Parolalar uyuşmuyor")
    .required(),
});
