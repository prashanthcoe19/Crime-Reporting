import React, { useEffect, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import AuthContextProvider from "./context/AuthContext";
import setAuthToken from "./utils/setAuthToken";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Routess from "./routes/Routess";

import "./App.css";

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, []);

  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routess} />
            {/* <Route path="/login" element={<Login />} />
            <Route exact path="/dashboard" element={<Dashboard />} /> */}
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
};

export default App;
