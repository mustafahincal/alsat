import Yup from "./validation";

export const ControlSchema = Yup.object().shape({
  name: Yup.string().required(),
});
