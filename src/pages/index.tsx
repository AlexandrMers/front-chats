import React, { memo } from "react";
import Wrapper from "../primitives/Wrapper";
import AuthPage from "./AuthPage";

const Routes = () => (
  <Wrapper>
    <AuthPage />
  </Wrapper>
);

export default memo(Routes);
