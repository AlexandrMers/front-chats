import React from "react";
import Wrapper from "primitives/Wrapper";
import Button from "primitives/Button";

const AuthPage = () => {
  return (
    <Wrapper>
      <h1>Авторизация</h1>

      <Wrapper>
        <Button>Войти в аккаунт</Button>
      </Wrapper>
    </Wrapper>
  );
};

export default AuthPage;
