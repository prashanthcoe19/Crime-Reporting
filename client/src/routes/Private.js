import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Private = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { auth, loading } = authContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <h1>Loading...</h1>
        ) : auth ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default Private;
