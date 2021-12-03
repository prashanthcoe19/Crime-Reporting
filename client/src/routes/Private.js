import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import Spinnner from "../components/layout/Spinner";

const Private = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { auth } = authContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default Private;
