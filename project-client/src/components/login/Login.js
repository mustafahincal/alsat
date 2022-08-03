import React from "react";
import { useFormik } from "formik";
import { LoginSchema } from "../../validations/loginSchema";
import { login } from "../../services/authService";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { setToLocalStorage } from "../../services/localStorageService";
import jwtDecode from "jwt-decode";
import { useUserContext } from "../../context/UserContext";
import { getUserById } from "../../services/userService";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setIsLogged } = useAuthContext();
  const { setSelectedUser } = useUserContext();
  const navigate = useNavigate();

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        login(values)
          .then(async (response) => {
            console.log(response);
            if (response.success) {
              toast.success(response.message);
              setToLocalStorage("token", response.data.token);
              values.email = "";
              values.password = "";

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
      validationSchema: LoginSchema,
    });

  return (
    <div className="w-2/6 m-auto py-10 shadow-item mt-20 bg-white">
      <div className="w-3/4 m-auto">
        <h1 className="font-extrabold text-3xl text-black mb-5 text-center">
          Giriş Yap
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="w-full flex  flex-col bg-darkBlue text-gray-100  px-14 py-14 text-lg">
            <div>
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
                placeholder="Şifre"
              />
              {errors.email && touched.email && (
                <div className="text-red-400 my-2 text-sm">
                  {errors.password}
                </div>
              )}
            </div>
          </div>
          <div className="text-right mt-5">
            <button type="submit" className="btn text-lg">
              Giriş Yap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
