import React, { memo } from "react";
import { RouteProps, Route, Redirect } from "react-router";

interface PrivateRouteInterface extends RouteProps {}

const ProtectedRoute = ({
  component: Component,
  ...rest
}: PrivateRouteInterface) => {
  //TODO - здесь будет проверка авторизации (наличие актуального токена в localStorage)
  const isAuth = false;

  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default memo(ProtectedRoute);
