import { Result } from "postcss";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import profileDefaultImage from "../../assets/profileDefaultImage.jpg";
import { useAuthContext } from "../../context/AuthContext";
import { useSubmitContext } from "../../context/SubmitContext";
import { useUserContext } from "../../context/UserContext";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../../services/localStorageService";
import { deleteAccount, getUserById } from "../../services/userService";

function ProfileMain() {
  const { selectedUser, setSelectedUser } = useUserContext();
  const { setIsLogged } = useAuthContext();
  const { isSubmitting, setIsSubmitting } = useSubmitContext();
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(getFromLocalStorage("userId")).then((result) =>
      setSelectedUser(result.data[0])
    );
  }, []);

  const handleDeleteAccount = () => {
    setIsSubmitting(true);
    deleteAccount(selectedUser.userId)
      .then((response) => {
        if (response.success) {
          toast.success(response.message);
          setIsLogged(false);
          removeFromLocalStorage("isLogged");
          removeFromLocalStorage("token");
          removeFromLocalStorage("userId");
          removeFromLocalStorage("productId");
          navigate("/");
        }
        setIsSubmitting(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5  bg-white dark:bg-gray-800 rounded-md shadow-item mx-auto">
        <img
          src={profileDefaultImage}
          className="object-cover object-center rounded-t-md w-full"
          alt=""
        />
        <div className="text-center">
          <div className="w-full dark:border-gray-700  border-2 py-3 px-20 font-bold">
            <div>{selectedUser.firstName + " " + selectedUser.lastName}</div>
          </div>
          <div className="w-full border-2 dark:border-gray-700  py-3 px-20 font-bold">
            <div>{selectedUser.email}</div>
          </div>
          <div className="w-full  border-2 dark:border-gray-700  py-3 px-20 font-bold">
            <div>
              {selectedUser.status ? "Aktif Kullanıcı" : "Pasif Kullanıcı"}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-7">
        <button
          className={`btn bg-white text-red-500 border-red-500 border-2 hover:bg-red-500 hover:text-white transition-all ${
            isSubmitting ? "submitting" : ""
          }`}
          onClick={handleDeleteAccount}
          disabled={isSubmitting}
        >
          Hesabı Sil
        </button>
      </div>
    </div>
  );
}

export default ProfileMain;
