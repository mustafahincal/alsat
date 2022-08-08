import { Result } from "postcss";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import profileDefaultImage from "../../assets/profileDefaultImage.jpg";
import { useAuthContext } from "../../context/AuthContext";
import { useUserContext } from "../../context/UserContext";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../../services/localStorageService";
import { deleteAccount, getUserById } from "../../services/userService";

function ProfileMain() {
  const { selectedUser, setSelectedUser } = useUserContext();
  const { setIsLogged } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(getFromLocalStorage("userId")).then((result) =>
      setSelectedUser(result.data)
    );
  }, []);

  const handleDeleteAccount = () => {
    const data = {
      userId: selectedUser.userId,
    };
    deleteAccount(data)
      .then((response) => {
        if (response.success) {
          toast.success(response.message);
          setIsLogged(false);
          removeFromLocalStorage("isLogged");
          removeFromLocalStorage("token");
          removeFromLocalStorage("userId");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="w-1/3  bg-white rounded-md shadow-item mx-auto">
        <img
          src={profileDefaultImage}
          className="object-cover object-center rounded-t-md w-full"
          alt=""
        />
        <div className="text-center">
          <div className="w-full  border-2 py-3 px-20 font-bold">
            <div>{selectedUser.firstName + " " + selectedUser.lastName}</div>
          </div>
          <div className="w-full border-2 py-3 px-20 font-bold">
            <div>{selectedUser.email}</div>
          </div>
          <div className="w-full  border-2 py-3 px-20 font-bold">
            <div>
              {selectedUser.status ? "Aktif Kullanıcı" : "Pasif Kullanıcı"}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-7">
        <button
          className="btn bg-white text-red-500 border-red-500 border-2 hover:bg-red-500 hover:text-white transition-all"
          onClick={handleDeleteAccount}
        >
          Hesabı Sil
        </button>
      </div>
    </div>
  );
}

export default ProfileMain;
