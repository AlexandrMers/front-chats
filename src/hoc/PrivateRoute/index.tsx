import React, { memo } from "react";
import { RouteProps, Route, Redirect } from "react-router";

interface PrivateRouteInterface extends RouteProps {}

const ProtectedRoute = ({
  component: Component,
  ...rest
}: PrivateRouteInterface) => (
  <Route
    {...rest}
    render={(props) =>
      false ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default memo(ProtectedRoute);
