import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    required: "Zorunlu alan",
  },
  string: {
    min: "Bu alan en az ${min} karakter olmalıdır",
    max: "Bu alan en fazla ${max} karakter olmalıdır",
    email: "Geçerli bir email adresi giriniz",
  },
});

export default Yup;
