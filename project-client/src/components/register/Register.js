import React from "react";
import { useFormik } from "formik";
import { RegisterSchema } from "../../validations/registerSchema";
import { register } from "../../services/authService";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { setToLocalStorage } from "../../services/localStorageService";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import jwtDecode from "jwt-decode";
import { getUserById } from "../../services/userService";

function Register() {
  let registerDto = {};
  const { setSelectedUser } = useUserContext();
  const { setIsLogged } = useAuthContext();
  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        surname: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },
      onSubmit: (values) => {
        register(setRegisterDto())
          .then(async (response) => {
            if (response.success) {
              setToLocalStorage("token", response.data.token);
              toast.success("Kayıt başarılı");

              let decode = await jwtDecode(response.data.token);

              let responseUser = await getUserById(
                decode[
                  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                ]
              );
              setSelectedUser(responseUser.data);
              setIsLogged(true);
              navigate("/");
            }
          })
          .catch((err) => toast.error(err.message));
      },
      validationSchema: RegisterSchema,
    });

  const setRegisterDto = () => {
    registerDto = {
      firstName: values.name,
      lastName: values.surname,
      email: values.email,
      password: values.password,
    };
    return registerDto;
  };

  return (
    <div className="w-2/6 m-auto py-10 shadow-item mt-20 bg-white">
      <div className="w-3/4 m-auto">
        <h1 className="font-extrabold text-3xl text-black mb-5 text-center">
          Kayıt Ol
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex  flex-col bg-darkBlue text-gray-100  px-14 py-14 text-lg">
            <input
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
              type="text"
              className="text-darkBlue py-2 px-4 w-full"
              placeholder="Ad"
            />
            {errors.name && touched.name && (
              <div className="text-red-400 my-2 text-sm">{errors.name}</div>
            )}
            <input
              value={values.surname}
              onChange={handleChange}
              onBlur={handleBlur}
              name="surname"
              type="text"
              className="text-darkBlue py-2 px-4 w-full mt-5"
              placeholder="Soyad"
            />
            {errors.surname && touched.surname && (
              <div className="text-red-400 my-2 text-sm">{errors.surname}</div>
            )}
            <div className="mt-5">
              <input
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                type="text"
                className="text-darkBlue py-2 px-4 w-full"
                placeholder="Email"
              />
              {errors.email && touched.email && (
                <div className="text-red-400 my-2 text-sm">{errors.email}</div>
              )}
            </div>
            <div className="mt-5">
              <input
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                type="password"
                className="text-darkBlue py-2 px-4 w-full"
                placeholder="Parola"
              />
              {errors.password && touched.password && (
                <div className="text-red-400 my-2 text-sm">
                  {errors.password}
                </div>
              )}
            </div>
            <div className="mt-5">
              <input
                value={values.passwordConfirm}
                onChange={handleChange}
                onBlur={handleBlur}
                name="passwordConfirm"
                type="password"
                className="text-darkBlue py-2 px-4 w-full"
                placeholder="Parolayı tekrar giriniz"
              />
              {errors.passwordConfirm && touched.passwordConfirm && (
                <div className="text-red-400 my-2 text-sm">
                  {errors.passwordConfirm}
                </div>
              )}
            </div>
          </div>

          <div className="text-right mt-5">
            <button type="submit" className="btn text-lg">
              Kayıt Ol
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
