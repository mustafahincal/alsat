import React, { useEffect } from "react";
import { useFormik } from "formik";
import { LoginSchema } from "../../validations/loginSchema";
import { block, blockUser, login } from "../../services/authService";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { setToLocalStorage } from "../../services/localStorageService";
import jwtDecode from "jwt-decode";
import { useUserContext } from "../../context/UserContext";
import { getUserById } from "../../services/userService";
import { NavLink, useNavigate } from "react-router-dom";
import { useSubmitContext } from "../../context/SubmitContext";

function Login() {
  const { setIsLogged, counter, setCounter, setIsAdmin } = useAuthContext();
  const { setSelectedUser } = useUserContext();
  const { isSubmitting, setIsSubmitting } = useSubmitContext();
  const navigate = useNavigate();

  useEffect(() => {
    setIsSubmitting(false);
  }, []);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        setIsSubmitting(true);
        login(values)
          .then(async (response) => {
            if (response.success) {
              values.password = "";

              let decode = await jwtDecode(response.data.token);
              let responseUser = await getUserById(
                decode[
                  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                ]
              );
              if (responseUser.data[0].status) {
                toast.success(response.message);
                values.email = "";
                setToLocalStorage("token", response.data.token);
                setToLocalStorage("isLogged", true);
                setToLocalStorage("userId", responseUser.data[0].userId);
                setIsLogged(true);

                if (responseUser.data[0].operationClaimId === 1) {
                  setIsAdmin(true);
                  setToLocalStorage("isAdmin", true);
                }
                setSelectedUser(responseUser.data[0]);

                navigate("/");
              } else {
                toast.error("Hesabınız Bloke Edilmiştir");
              }
              setIsSubmitting(false);
            }
          })
          .catch((err) => {
            if (counter !== 2) toast.error(err.response.data.message);
            if (err.response.data.message === "Şifre hatalı")
              setCounter(counter + 1);
            if (counter === 2) blockUser(values.email);
            setIsSubmitting(false);
          });
      },
      validationSchema: LoginSchema,
    });

  const blockUser = (email) => {
    block(email).then((result) => toast.error("Hesabınız Bloke Edilmiştir"));
    navigate("/");
  };

  return (
    <div className="px-6 sm:px-0">
      <div className="w-full sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-1/3 m-auto py-10 shadow-item mt-20  bg-white dark:bg-gray-800 dark:text-white">
        <div className="w-10/12 sm:w-3/4 m-auto">
          <h1 className="font-extrabold text-3xl  mb-5 text-center">
            Giriş Yap
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="w-full flex  flex-col bg-darkBlue text-gray-100 px-14 py-14 text-lg">
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
                  placeholder="Şifre"
                />
                {errors.password && touched.password && (
                  <div className="text-red-400 my-2 text-sm">
                    {errors.password}
                  </div>
                )}
              </div>
            </div>
            <NavLink
              to={"/register"}
              type="submit"
              className="mt-5 border-2 border-darkBlue text-darkBlue bg-white  w-full py-2 text-center text-lg hover:bg-darkBlue hover:text-white transition-all duration-200 rounded dark:bg-gray-800 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-gray-800 hover:mt-6"
            >
              Hesabın yok mu? Kayıt Ol!
            </NavLink>
            <div className="text-right mt-5">
              <button
                type="submit"
                className={`btn text-lg py-2 ${
                  isSubmitting ? "submitting" : ""
                }`}
                disabled={isSubmitting}
              >
                Giriş Yap
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
