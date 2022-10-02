import { createContext, useContext, useEffect, useState } from "react";
import { getFromLocalStorage } from "../services/localStorageService";
import jwtDecode from "jwt-decode";
import { getUserById } from "../services/userService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    if (getFromLocalStorage("token")) {
      const decode = jwtDecode(getFromLocalStorage("token"));

      getUserById(
        decode[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ]
      ).then((response) => setSelectedUser(response.data[0]));
    }
  }, []);

  const values = {
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
