import React, { memo, useState } from "react";
import RegistrationPage from "./Registration";
import AuthPage from "./Auth";

const Auth = () => {
  const [isRegisterView, setIsRegisterView] = useState(false);

  return isRegisterView ? (
    <RegistrationPage  />
  ) : (
    <AuthPage toRegister={() => setIsRegisterView(true)} />
  );
};

export default memo(Auth);
