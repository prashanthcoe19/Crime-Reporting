import React, { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/layout/Dashboard";
import AuthContextProvider from "./context/AuthContext";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
};

export default App;
