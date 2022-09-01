import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useUserContext } from "../../context/UserContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../services/userService";
import { ChangePasswordSchema } from "../../validations/changePasswordSchema";
import { getFromLocalStorage } from "../../services/localStorageService";
import { changePassword } from "../../services/authService";
import { toast } from "react-toastify";
import { useSubmitContext } from "../../context/SubmitContext";

function ChangePassword() {
  const { selectedUser, setSelectedUser } = useUserContext();
  const navigate = useNavigate();
  const { isSubmitting, setIsSubmitting } = useSubmitContext();
  useEffect(() => {
    setIsSubmitting(false);
    getUserById(getFromLocalStorage("userId")).then((result) =>
      setSelectedUser(result.data[0])
    );
  }, []);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        oldPass: "",
        newPass: "",
        userEmail: "",
        newPassConfirm: "",
      },
      onSubmit: (values) => {
        setIsSubmitting(true);
        const data = {
          userId: selectedUser.userId,
          userEmail: values.userEmail,
          oldPass: values.oldPass,
          newPass: values.newPass,
        };
        changePassword(data)
          .then((result) => {
            if (result.success) {
              toast.success(result.message);
            }
            setIsSubmitting(false);
            navigate("/profile");
          })
          .catch((err) => toast.error(err.response.data.message));
      },
      validationSchema: ChangePasswordSchema,
    });

  return (
    <div className="w-full md:w-3/4 lg:w-3/5 xl:w-1/2  py-10 shadow-item  bg-white dark:bg-gray-800 dark:text-white mx-auto mt-14">
      <div className="w-10/12 sm:w-3/4 m-auto">
        <h1 className="font-extrabold text-3xl  mb-5 text-center">
          Şifre Değiştir
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex  flex-col bg-darkBlue text-gray-100  px-14 py-14 text-lg">
            <input
              value={values.userEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              name="userEmail"
              type="text"
              className="text-darkBlue py-2 px-4 w-full"
              placeholder="Email"
            />
            {errors.userEmail && touched.userEmail && (
              <div className="text-red-400 my-2 text-sm">
                {errors.userEmail}
              </div>
            )}

            <input
              value={values.oldPass}
              onChange={handleChange}
              onBlur={handleBlur}
              name="oldPass"
              type="password"
              className="text-darkBlue py-2 px-4 w-full mt-4"
              placeholder="Eski Şifrenizi Giriniz"
            />
            {errors.oldPass && touched.oldPass && (
              <div className="text-red-400 my-2 text-sm">{errors.oldPass}</div>
            )}
            <input
              value={values.newPass}
              onChange={handleChange}
              onBlur={handleBlur}
              name="newPass"
              type="password"
              className="text-darkBlue py-2 px-4 w-full mt-5"
              placeholder="Yeni Şifreniz"
            />
            {errors.newPass && touched.newPass && (
              <div className="text-red-400 my-2 text-sm">{errors.newPass}</div>
            )}
            <div className="mt-5">
              <input
                value={values.newPassConfirm}
                onChange={handleChange}
                onBlur={handleBlur}
                name="newPassConfirm"
                type="password"
                className="text-darkBlue py-2 px-4 w-full"
                placeholder="Yeni Şifrenizi Tekrar Giriniz"
              />
              {errors.newPassConfirm && touched.newPassConfirm && (
                <div className="text-red-400 my-2 text-sm">
                  {errors.newPassConfirm}
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
              Değiştir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
