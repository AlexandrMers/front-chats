import React, { FC, useContext } from "react";
import { __RouterContext, Route, Switch } from "react-router";
import { animated, useTransition } from "react-spring";

import Home from "./Home";

import RegistrationPage from "./Registration";
import LoginPage from "./Login";

import ProtectedRoute from "../hocs/ProtectedRoute";
import SocketHOC from "../hocs/SocketHandleHOC";
import ConfirmedPage from "./ConfirmedPage";
import PersonPage from "./PersonPage";

function useRouter() {
  return useContext(__RouterContext);
}

export enum ROUTE_PATHS {
  LOGIN = "/login",
  REGISTRATION = "/registration",
  CONFIRM_HASH = "/confirm/hash/:id",
  MAIN = "/",
  HOME = "/home",
  PERSON = "/person"
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Routes: FC = () => {
  const { location } = useRouter();

  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.7)" },
    delay: 500
  });

  return transitions.map(({ item, props, key }) => (
    <animated.div style={props} key={key}>
      <Switch location={item}>
        <Route exact path={ROUTE_PATHS.LOGIN} component={LoginPage} />
        <Route
          exact
          path={ROUTE_PATHS.REGISTRATION}
          component={RegistrationPage}
        />
        <Route
          exact
          path={ROUTE_PATHS.CONFIRM_HASH}
          component={ConfirmedPage}
        />

        <ProtectedRoute
          exact
          path={[ROUTE_PATHS.MAIN, ROUTE_PATHS.HOME]}
          render={(props) => <SocketHOC component={Home} {...props} />}
        />
        <ProtectedRoute
          exact
          path={`${ROUTE_PATHS.PERSON}:id`}
          render={(props) => <SocketHOC component={PersonPage} {...props} />}
        />
      </Switch>
    </animated.div>
  ));
};

export default Routes;
