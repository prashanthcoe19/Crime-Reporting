import React, { createContext, useEffect, useState } from "react";
import api from "../utils/api";
// import axios from "axios";
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    getUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, setUser, auth, setAuth, loading, getUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
