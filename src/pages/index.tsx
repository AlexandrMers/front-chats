import React, { memo, useContext } from "react";
import { __RouterContext, Route, Switch } from "react-router";
import { animated, useTransition } from "react-spring";

import Home from "./Home";

import RegistrationPage from "./Registration";
import LoginPage from "./Login";

import ProtectedRoute from "../hoc/ProtectedRoute";
import SocketHOC from "./Home/SocketHandleHOC";
import ConfirmedPage from "./ConfirmedPage";

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

const Routes = () => {
  const { location } = useRouter();

  const transitions = useTransition(
    location,
    (location) => location.key,
    animationsValues
  );

  return transitions.map(({ item, props: transition, key }) => (
    <animated.div
      key={key}
      style={{
        ...transition,
        overflow: "hidden"
      }}
    >
      <Switch location={item}>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/registration" component={RegistrationPage} />
        <Route exact path="/confirm-hash/:id" component={ConfirmedPage} />
        <ProtectedRoute
          exact
          path={["/", "/home"]}
          render={(props) => <SocketHOC component={Home} {...props} />}
        />
      </Switch>
    </animated.div>
  ));
};

//@ts-ignore
export default memo(Routes);
