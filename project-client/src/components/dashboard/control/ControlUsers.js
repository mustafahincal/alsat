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
          className="py-4 px-6 bg-white hover:bg-blue-100 rounded w-full mb-3 flex justify-between items-center"
          key={index}
        >
          <div>{user.firstName + " " + user.lastName}</div>
          <div>{user.email}</div>
          <div>{user.status ? "true" : "false"}</div>
          <div>
            <NavLink to={`/updateUser/${user.id}`} className="btn text-sm">
              Düzenle
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ControlUsers;
