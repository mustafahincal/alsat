import React, { useEffect } from "react";
import { useFormik } from "formik";
import { UserSchema } from "../../../validations/userSchema";
import { useUserContext } from "../../../context/UserContext";
import { useParams } from "react-router-dom";
import { getUserById } from "../../../services/userService";

function UpdateUser() {
  const { selectedUser, setSelectedUser } = useUserContext();
  const { id } = useParams();

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
      },
      onSubmit: (values) => {
        console.log(values);
      },
      validationSchema: UserSchema,
    });

  return (
    <div className="flex justify-between items-center p-16">
      <div className="w-1/3  mx-auto  bg-white rounded-md shadow-item ">
        <div className="w-full flex justify-between border-2 py-3 px-10 font-bold">
          <div>Ad</div>
          <div>{selectedUser.firstName}</div>
        </div>
        <div className="w-full flex justify-between border-2 py-3 px-10 font-bold">
          <div>Soyad</div>
          <div>{selectedUser.lastName}</div>
        </div>
        <div className="w-full flex justify-between border-2 py-3 px-10 font-bold">
          <div>Email</div>
          <div>{selectedUser.email}</div>
        </div>
      </div>

      <div className="w-1/2  py-10 shadow-item  bg-white">
        <div className="w-3/4 m-auto">
          <h1 className="font-extrabold text-3xl text-black mb-5 text-center">
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
              <button type="submit" className="btn text-lg">
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
