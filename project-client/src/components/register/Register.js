import React, { useEffect } from "react";
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
import { useSubmitContext } from "../../context/SubmitContext";

function Register() {
  let registerDto = {};
  const { setSelectedUser } = useUserContext();
  const { setIsLogged } = useAuthContext();
  const navigate = useNavigate();
  const { isSubmitting, setIsSubmitting } = useSubmitContext();

  useEffect(() => {
    setIsSubmitting(false);
  }, []);

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
        setIsSubmitting(true);
        register(setRegisterDto())
          .then(async (response) => {
            if (response.success) {
              setToLocalStorage("token", response.data.token);
              setToLocalStorage("isLogged", true);
              toast.success("Kayıt başarılı");

              let decode = await jwtDecode(response.data.token);

              let responseUser = await getUserById(
                decode[
                  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                ]
              );
              setSelectedUser(responseUser.data[0]);
              setToLocalStorage("userId", responseUser.data[0].userId);
              setIsLogged(true);
              setIsSubmitting(false);
              navigate("/");
            }
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            setIsSubmitting(false);
          });
      },
      validationSchema: RegisterSchema,
    });

  const setRegisterDto = () => {
    registerDto = {
      firstName: capitalize(values.name),
      lastName: capitalize(values.surname),
      email: values.email,
      password: values.password,
    };
    return registerDto;
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="px-6 sm:px-0">
      <div className="w-full sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-1/3 m-auto py-10 shadow-item mt-20  bg-white dark:bg-gray-800 dark:text-white">
        <div className="w-10/12 sm:w-3/4 m-auto">
          <h1 className="font-extrabold text-3xl  mb-5 text-center">
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
                <div className="text-red-400 my-2 text-sm">
                  {errors.surname}
                </div>
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
                  <div className="text-red-400 my-2 text-sm">
                    {errors.email}
                  </div>
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
              <button
                type="submit"
                className={`btn text-lg ${isSubmitting ? "submitting" : ""}`}
                disabled={isSubmitting}
              >
                Kayıt Ol
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
