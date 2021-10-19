import React, { memo, useEffect, useMemo } from "react";
import { RouteProps, Route, Redirect } from "react-router";

import { useAppDispatch } from "state/store";
import { setAuth } from "state/modules/auth";

interface PrivateRouteInterface extends RouteProps {}

const ProtectedRoute = ({
  component: Component,
  ...rest
}: PrivateRouteInterface) => {
  const isExistToken = useMemo(() => localStorage.getItem("auth_token"), []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isExistToken) {
      dispatch(setAuth(true));
      return;
    }
    dispatch(setAuth(false));
    // eslint-disable-next-line
  }, [isExistToken]);

  if (!isExistToken) {
    return <Redirect to="/login" />;
  }

  return <Route render={(props) => <Component {...props} />} {...rest} />;
};

export default memo(ProtectedRoute);
