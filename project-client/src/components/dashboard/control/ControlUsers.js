import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../../context/UserContext";
import { block, unBlock } from "../../../services/authService";
import { deleteAccount, getUsers } from "../../../services/userService";
import { AiFillDelete } from "react-icons/ai";
import { getFromLocalStorage } from "../../../services/localStorageService";

function ControlUsers() {
  const { users, setUsers } = useUserContext();
  useEffect(() => {
    getUsers().then((result) => setUsers(result.data));
  }, []);

  const handleUnBlock = (userId) => {
    unBlock(userId).then((result) => {
      toast.success(result.message);
      getUsers().then((result) => setUsers(result.data));
    });
  };

  const handleBlock = (userId) => {
    block(userId).then((result) => {
      toast.success(result.message);
      getUsers().then((result) => setUsers(result.data));
    });
  };

  const deleteUser = (userId) => {
    if (getFromLocalStorage("userId") == userId) {
      console.log("silemezsin");
    } else {
      deleteAccount(userId)
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
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
          className={`py-4 px-6  border-2 transition-all duration-75  rounded w-full mb-4 flex justify-between items-center ${
            user.operationClaimId == 1
              ? "bg-gold text-black font-bold hover:border-darkBlue"
              : " bg-white hover:border-gray-400 border-gray-100"
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
                      className="cursor-pointer btn border-2 box-border bg-white border-red-600 transition-all text-red-500 hover:bg-red-500 hover:text-white ml-3 "
                      onClick={() => handleUnBlock(user.userId)}
                    >
                      Bloke Kaldır
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer btn border-2 box-border bg-white border-red-600 transition-all text-red-500 hover:bg-red-500 hover:text-white ml-3 "
                      onClick={() => handleBlock(user.email)}
                    >
                      Bloke
                    </div>
                  )}
                  <div
                    className="cursor-pointer btn border-2 box-border bg-white border-red-600 transition-all text-red-500 hover:bg-red-500 hover:text-white ml-3 flex justify-center items-center"
                    onClick={() => deleteUser(user.userId)}
                  >
                    <AiFillDelete className="text-2xl" />
                  </div>
                </div>
              )}
              <NavLink
                to={`/updateUser/${user.userId}`}
                className={`btn border-2 box-border bg-white hover:text-white transition-all ml-3 ${
                  user.operationClaimId == 1
                    ? " border-darkBlue  text-darkBlue hover:bg-darkBlue"
                    : " border-indigo-600  text-indigo-500 hover:bg-indigo-500"
                } `}
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
