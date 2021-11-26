import React, { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import NotFound from "./components/layout/NotFound";
import AuthContextProvider from "./context/AuthContext";
import CrimeContextProvider from "./context/CrimeContext";
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
        <CrimeContextProvider>
          <BrowserRouter>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route component={Routess} />
              <Route path="*" component={NotFound} />
              {/* <Route path="/login" element={<Login />} />
            <Route exact path="/dashboard" element={<Dashboard />} /> */}
            </Switch>
          </BrowserRouter>
        </CrimeContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;
