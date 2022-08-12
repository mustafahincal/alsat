import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";
import { getUsers } from "../../../services/userService";

function ControlUsers() {
  const { users, setUsers } = useUserContext();
  useEffect(() => {
    getUsers().then((result) => setUsers(result.data));
  }, []);
  return (
    <div>
      {users.map((user, index) => (
        <div
          className="py-5 px-6  bg-white hover:border-gray-400 border-2 border-gray-100 rounded w-full mb-4 flex justify-between items-center"
          key={index}
        >
          <div>{user.firstName + " " + user.lastName}</div>
          <div>{user.email}</div>
          <div>{user.status ? "true" : "false"}</div>
          <div>
            <NavLink
              to={`/updateUser/${user.id}`}
              className="btn border-2 box-border bg-white border-indigo-600 transition-all text-indigo-500 hover:bg-indigo-500 hover:text-white"
            >
              Güncelle
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ControlUsers;
