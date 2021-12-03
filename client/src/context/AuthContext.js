import React, { createContext, useEffect, useState } from "react";
import api from "../utils/api";
import setAuthToken from "../utils/setAuthToken";
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const getUser = async () => {
    try {
      const res = await api.get("/auth");
      console.log(res.data);
      setUser(res.data);
      setAuth(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setAuth(false);
    setLoading(true);
    setToken(null);
    // props.history.push("/login");
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    getUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        auth,
        setAuth,
        setToken,
        setLoading,
        loading,
        getUser,
        logout,
        ...props,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
