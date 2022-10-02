import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../../context/UserContext";
import { block, unBlock } from "../../../services/authService";
import { deleteAccount, getUsers } from "../../../services/userService";
import { AiFillDelete } from "react-icons/ai";
import { getFromLocalStorage } from "../../../services/localStorageService";
import { useSubmitContext } from "../../../context/SubmitContext";

function ControlUsers() {
  const { isSubmitting, setIsSubmitting } = useSubmitContext();

  const { users, setUsers } = useUserContext();
  useEffect(() => {
    setIsSubmitting(false);
    getUsers().then((result) => setUsers(result.data));
  }, []);

  const handleUnBlock = (userId) => {
    setIsSubmitting(true);
    unBlock(userId).then((result) => {
      toast.success(result.message);
      setIsSubmitting(false);
      getUsers().then((result) => setUsers(result.data));
    });
  };

  const handleBlock = (userId) => {
    setIsSubmitting(true);
    block(userId).then((result) => {
      toast.success(result.message);
      setIsSubmitting(false);
      getUsers().then((result) => setUsers(result.data));
    });
  };

  const deleteUser = (userId) => {
    setIsSubmitting(true);
    if (getFromLocalStorage("userId") == userId) {
      console.log("silemezsin");
      setIsSubmitting(false);
    } else {
      deleteAccount(userId)
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            setIsSubmitting(false);
            getUsers().then((result) => setUsers(result.data));
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      {users.map((user, index) => (
        <div
          className={`py-4 px-6  border-2 transition-all duration-75  rounded w-full mb-4 flex justify-between items-center dark:border-gray-800 shadow-item2 ${
            user.operationClaimId == 1
              ? "bg-gold text-black font-bold hover:border-gray-700 dark:hover:border-gray-100"
              : " bg-white dark:bg-gray-800 hover:border-gray-600 dark:hover:border-gray-100 "
          } `}
          key={index}
        >
          <div className="grid grid-cols-12 w-full items-center text-center">
            <div className="col-span-3">
              {user.firstName + " " + user.lastName}
            </div>
            <div className="col-span-3">{user.email}</div>
            <div className="col-span-3">{user.operationClaimName}</div>
            <div className="flex col-span-3 justify-end">
              {user.operationClaimId == 2 && (
                <div className="flex shrink-0">
                  {!user.status ? (
                    <div
                      className={`cursor-pointer btn border-2 box-border bg-white border-red-600 transition-all text-red-500 hover:bg-red-500 hover:text-white ml-3 text-center ${
                        isSubmitting ? "submitting" : ""
                      }`}
                      onClick={() => handleUnBlock(user.userId)}
                      disabled={isSubmitting}
                    >
                      Bloke Kaldır
                    </div>
                  ) : (
                    <button
                      className={`cursor-pointer btn border-2 box-border bg-white border-red-600 transition-all text-red-500 hover:bg-red-500 hover:text-white ml-3 text-center ${
                        isSubmitting ? "submitting" : ""
                      }`}
                      onClick={() => handleBlock(user.email)}
                      disabled={isSubmitting}
                    >
                      Bloke
                    </button>
                  )}
                  <button
                    className={`cursor-pointer btn border-2 box-border bg-white border-red-600 transition-all text-red-500 hover:bg-red-500 hover:text-white ml-3 text-center ${
                      isSubmitting ? "submitting" : ""
                    }`}
                    onClick={() => deleteUser(user.userId)}
                    disabled={isSubmitting}
                  >
                    <AiFillDelete className="text-2xl" />
                  </button>
                </div>
              )}
              <NavLink
                to={isSubmitting ? "" : `/updateUser/${user.userId}`}
                className={`btn border-2 box-border bg-white hover:text-white transition-all ml-3 ${
                  user.operationClaimId == 1
                    ? " border-darkBlue  text-darkBlue hover:bg-darkBlue"
                    : " border-indigo-600  text-indigo-500 hover:bg-indigo-500"
                } ${isSubmitting ? "submitting" : ""}`}
              >
                Güncelle
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ControlUsers;
