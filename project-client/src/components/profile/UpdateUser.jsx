import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useUserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../services/userService";
import { getFromLocalStorage } from "../../services/localStorageService";
import { UpdateUserSchema } from "../../validations/updateUserSchema";
import { toast } from "react-toastify";
import { useSubmitContext } from "../../context/SubmitContext";

function UpdateUser() {
  const { selectedUser, setSelectedUser } = useUserContext();
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
        firstName: "",
        lastName: "",
        email: "",
      },
      onSubmit: (values) => {
        setIsSubmitting(true);
        const data = {
          userId: selectedUser.userId,
          firstName: capitalize(values.firstName),
          lastName: capitalize(values.lastName),
          email: values.email,
          passwordHash: selectedUser.passwordHash,
          passwordSalt: selectedUser.passwordSalt,
          status: selectedUser.status,
        };
        updateUser(data)
          .then((result) => {
            toast.success("Kullanıcı bilgileri başarıyla güncellendi");
            setIsSubmitting(false);
            getUserById(getFromLocalStorage("userId")).then((result) =>
              setSelectedUser(result.data[0])
            );
            values.firstName = "";
            values.lastName = "";
            values.email = "";
          })
          .catch((err) => {
            console.log(err);
            setIsSubmitting(false);
          });
      },
      validationSchema: UpdateUserSchema,
    });

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center px-6 sm:px-0 py-28">
      <div className="mb-10 w-full sm:w-3/4 md:w-1/3 md:mb-0 lg:w-1/3 xl:w-1/4  mx-auto  bg-white dark:bg-gray-800 dark:text-white rounded-md shadow-item ">
        <div className="w-full flex justify-between border-2 py-3 px-10 font-bold dark:border-gray-700">
          <div>Ad</div>
          <div>{selectedUser.firstName}</div>
        </div>
        <div className="w-full flex justify-between border-2 py-3 px-10 font-bold dark:border-gray-700">
          <div>Soyad</div>
          <div>{selectedUser.lastName}</div>
        </div>
        <div className="w-full flex justify-between border-2 py-3 px-10 font-bold dark:border-gray-700">
          <div>Email</div>
          <div>{selectedUser.email}</div>
        </div>
      </div>

      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/2 xl:w-5/12  py-10 shadow-item mx-auto  bg-white dark:bg-gray-800 dark:text-white">
        <div className="w-10/12 sm:w-3/4 m-auto">
          <h1 className="font-extrabold text-3xl mb-5 text-center">
            Kullanıcıyı Güncelle
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex  flex-col bg-darkBlue text-gray-100  px-14 py-14 text-lg">
              <input
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                name="firstName"
                type="text"
                className="text-darkBlue py-2 px-4 w-full"
                placeholder="Kullanıcı Adı"
              />
              {errors.firstName && touched.firstName && (
                <div className="text-red-400 my-2 text-sm">
                  {errors.firstName}
                </div>
              )}
              <input
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                name="lastName"
                type="text"
                className="text-darkBlue py-2 px-4 w-full mt-5"
                placeholder="Kullanıcı Soyadı"
              />
              {errors.lastName && touched.lastName && (
                <div className="text-red-400 my-2 text-sm">
                  {errors.lastName}
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
            </div>
            <div className="text-right mt-5">
              <button
                type="submit"
                className={`btn text-lg ${isSubmitting ? "submitting" : ""}`}
                disabled={isSubmitting}
              >
                Güncelle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
