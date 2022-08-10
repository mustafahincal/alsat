import Yup from "./validation";

export const UpdateUserSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().required().email(),
});
