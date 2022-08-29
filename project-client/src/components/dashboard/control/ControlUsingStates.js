import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useColorContext } from "../../../context/ColorContext";
import {
  deleteColor,
  getColors,
  postColor,
  updateColor,
} from "../../../services/colorService";
import { toast } from "react-toastify";
import { ControlSchema } from "../../../validations/controlSchema";
import { UseUsingStateContext } from "../../../context/UsingStateContext";
import {
  deleteUsingState,
  getUsingStates,
  postUsingState,
  updateUsingState,
  updateUsingStates,
} from "../../../services/usingStateService";
import { useSubmitContext } from "../../../context/SubmitContext";

function ControlUsingStates() {
  const {
    usingStates,
    setUsingStates,
    selectedUsingState,
    setSelectedUsingState,
    updateUsingStateStatus,
    setUpdateUsingStateStatus,
  } = UseUsingStateContext();
  const { isSubmitting, setIsSubmitting } = useSubmitContext();
  useEffect(() => {
    setIsSubmitting(false);
    getUsingStates().then((result) => setUsingStates(result.data));
    setUpdateUsingStateStatus(false);
  }, []);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
      },
      onSubmit: (values) => {
        setIsSubmitting(true);
        if (!updateUsingStateStatus) {
          values = { name: capitalize(values.name) };

          postUsingState(values)
            .then((response) => {
              if (response.success) {
                toast.success(response.message);
                getUsingStates().then((result) => setUsingStates(result.data));
              }
              values.name = "";
              setIsSubmitting(false);
            })
            .catch((err) => {
              toast.error(err.response.data.message);
              setIsSubmitting(false);
            });
        } else {
          const data = {
            usingStateId: selectedUsingState.usingStateId,
            name: capitalize(values.name),
          };

          updateUsingState(data)
            .then((response) => {
              if (response.success) {
                toast.success(response.message);
                setIsSubmitting(false);
                getUsingStates().then((result) => setUsingStates(result.data));
                values.name = "";
                setUpdateUsingStateStatus(false);
              }
            })
            .catch((err) => {
              toast.error(err.response.data.message);
              setIsSubmitting(false);
            });
        }
      },
      validationSchema: ControlSchema,
    });

  const handleDeleteUsingState = (usingStateId) => {
    values.name = "";
    setIsSubmitting(true);
    deleteUsingState(usingStateId)
      .then((response) => {
        if (response.success) {
          toast.success(response.message);
          getUsingStates().then((result) => setUsingStates(result.data));
        }
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
      });
  };

  const handleUpdateUsingState = (usingStateId, usingStateName) => {
    if (!updateUsingStateStatus) {
      values.name = usingStateName;
    } else {
      values.name = "";
    }
    setUpdateUsingStateStatus(!updateUsingStateStatus);
    const usingState = {
      usingStateId: usingStateId,
      name: usingStateName,
    };
    setSelectedUsingState(usingState);
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center pt-16 lg:pb-16 md:px-16">
      <div className="w-full sm:w-2/3 md:w-1/3  mx-auto  bg-white dark:bg-gray-800 rounded-md shadow-item px-4 py-5 order-2 md:order-1">
        <div className="flex flex-col gap-2">
          {usingStates.map((usingState) => (
            <div
              className="py-2 px-3 bg-gold text-black rounded text-center flex justify-between items-center"
              key={usingState.usingStateId}
            >
              <div>{usingState.name}</div>
              <div className="flex">
                {updateUsingStateStatus ? (
                  <button
                    onClick={() =>
                      handleUpdateUsingState(
                        usingState.usingStateId,
                        usingState.name
                      )
                    }
                    className={`bg-indigo-500 text-white  px-2 flex items-center justify-center rounded cursor-pointer mr-2 ${
                      isSubmitting ? "submitting" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    Düzenlemeyi Sonlandır
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleUpdateUsingState(
                        usingState.usingStateId,
                        usingState.name
                      )
                    }
                    className={`bg-blue-500 text-white px-2 flex items-center justify-center rounded cursor-pointer mr-2 ${
                      isSubmitting ? "submitting" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    Düzenle
                  </button>
                )}

                <button
                  onClick={() =>
                    handleDeleteUsingState(
                      usingState.usingStateId,
                      usingState.name
                    )
                  }
                  className={`bg-red-500 text-white w-7 h-7 flex items-center justify-center rounded cursor-pointer ${
                    isSubmitting ? "submitting" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  &#215;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full sm:w-2/3 md:w-1/2 mx-auto mb-16  py-10 shadow-item  bg-white dark:bg-gray-800 dark:text-white order-1 md:order-2">
        <div className="w-3/4 m-auto">
          <h1 className="font-extrabold text-3xl  mb-5 text-center">
            {updateUsingStateStatus
              ? "Kullanım Durumu Güncelle"
              : "Kullanım Durumu Ekle"}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex  flex-col bg-darkBlue text-gray-100  px-14 py-14 text-lg">
              <input
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                name="name"
                type="text"
                className={`text-darkBlue py-2 px-4 w-full ${
                  isSubmitting ? "submitting" : ""
                }`}
                disabled={isSubmitting}
                placeholder="Kullanım Durumu"
                required
              />
              {errors.name && touched.name && (
                <div className="text-red-400 my-2 text-sm">{errors.name}</div>
              )}
            </div>
            <div className="text-right mt-5">
              {updateUsingStateStatus ? (
                <button
                  type="submit"
                  className={`btn text-lg ${isSubmitting ? "submitting" : ""}`}
                  disabled={isSubmitting}
                >
                  Güncelle
                </button>
              ) : (
                <button
                  type="submit"
                  className={`btn text-lg ${isSubmitting ? "submitting" : ""}`}
                  disabled={isSubmitting}
                >
                  Ekle
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ControlUsingStates;
