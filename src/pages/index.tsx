import React, { memo, useContext } from "react";
import { __RouterContext, Route, Switch } from "react-router";
import { useTransition, animated } from "react-spring";

import AuthPage from "./AuthPages/Auth";
import RegistrationPage from "./AuthPages/Registration";
import ConfirmPage from "./AuthPages/Confirm";

function useRouter() {
  return useContext(__RouterContext);
}

const animationsValues = {
  from: {
    opacity: 0.5,
    transform: "scale(0.5)",
  },
  enter: { opacity: 1, transform: "scale(1)" },
  leave: {
    opacity: 0,
    transform: "scale(0.5)",
  },
};

const Routes = () => {
  const { location } = useRouter();

  const transitions = useTransition(
    location,
    (location) => location.key,
    animationsValues
  );

  return transitions.map(({ item, props: transition, key }) => (
    <animated.div key={key} style={transition}>
      <Switch location={item}>
        <Route exact path={["/", "/auth"]} component={AuthPage} />
        <Route exact path="/registration" component={RegistrationPage} />
        <Route exact path="/confirm" component={ConfirmPage} />
      </Switch>
    </animated.div>
  ));
};

//@ts-ignore
export default memo(Routes);
