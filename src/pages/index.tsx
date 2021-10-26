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

const animationsValues = {
  from: {
    opacity: 0,
    transform: "scale(0)"
  },
  enter: { opacity: 1, transform: "scale(1)" },
  leave: {
    opacity: 0,
    transform: "scale(0.5)"
  }
};

export enum ROUTE_PATHS {
  LOGIN = "/login",
  REGISTRATION = "/registration",
  CONFIRM_HASH = "/confirm/hash/:id",
  MAIN = "/",
  HOME = "/home",
  PERSON = "/person/"
}

const Routes: FC = () => {
  const { location } = useRouter();

  const transitions = useTransition(
    location,
    (location) => location.key,
    animationsValues
  );

  return (
    <>
      {transitions.map(({ item, props: transition, key }) => (
        <animated.div
          key={key}
          style={{
            ...transition,
            overflow: "hidden"
          }}
        >
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
              render={(props) => <PersonPage {...props} />}
            />
          </Switch>
        </animated.div>
      ))}
    </>
  );
};

export default Routes;
