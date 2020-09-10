import React from "react";
import Wrapper from "primitives/Wrapper";
import Button from "primitives/Button";
import WhiteBlock from "primitives/WhiteBlock";

import "./style.scss";

const AuthPage = () => {
  return (
    <Wrapper className="wrapper-auth">
      <header className="wrapper-auth__header">
        <h1 className="wrapper-auth__title">Войти в аккаунт</h1>
        <p className="wrapper-auth__text">Пожалуйста, войдите в свой аккаунт</p>
      </header>

      <WhiteBlock className="wrapper-auth__form" withShadow>
        <input type="text" />
        <input type="text" />
        <Button type="primary">Войти в аккаунт</Button>
        <Wrapper>
          <a href="/">Зарегистрироваться</a>
        </Wrapper>
      </WhiteBlock>
    </Wrapper>
  );
};

export default AuthPage;
