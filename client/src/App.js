import React, { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import AuthContextProvider from "./context/AuthContext";
import CrimeContextProvider from "./context/CrimeContext";
import setAuthToken from "./utils/setAuthToken";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Routess from "./routes/Routess";
// import AdminRoute from "./routes/AdminRoute";
import "./App.css";
import Footer from "./components/layout/Footer";

const App = () => {
  // let location = useLocation();
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
            </Switch>
            <Footer />
          </BrowserRouter>
        </CrimeContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;
