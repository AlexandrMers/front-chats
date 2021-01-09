import React, { memo, useEffect, useState } from "react";
import { RouteProps, Route, Redirect } from "react-router";

interface PrivateRouteInterface extends RouteProps {}

const ProtectedRoute = ({
  component: Component,
  ...rest
}: PrivateRouteInterface) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
      setIsAuth(true);
    }
  }, []);

  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default memo(ProtectedRoute);
