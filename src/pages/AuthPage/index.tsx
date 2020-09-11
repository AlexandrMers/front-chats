import React from "react";
import Wrapper from "primitives/Wrapper";
import Button from "primitives/Button";
import WhiteBlock from "primitives/WhiteBlock";

import { Form } from "antd";

import styleModule from "./style.module.scss";
import Input from "../../primitives/Input/Input";

const AuthPage = () => {
  return (
    <Wrapper className={styleModule.wrapperAuth}>
      <header className={styleModule.wrapperAuth__header}>
        <h1 className={styleModule.wrapperAuth__title}>Войти в аккаунт</h1>
        <p className={styleModule.wrapperAuth__text}>
          Пожалуйста, войдите в свой аккаунт
        </p>
      </header>

      <WhiteBlock className={styleModule.wrapperAuth__form} withShadow>
        <Form className={styleModule.authForm__form} name="authForm">
          <Form.Item
            hasFeedback
            className={styleModule.wrapperAuth__input}
            name="username"
          >
            <Input type="text" placeholder="Логин" />
          </Form.Item>

          <Form.Item className={styleModule.wrapperAuth__input} name="password">
            <Input type="password" placeholder="Пароль" />
          </Form.Item>

          <Button
            className={styleModule.authForm__button}
            type="primary"
            htmlType="submit"
          >
            Войти в аккаунт
          </Button>
        </Form>
        <Wrapper className={styleModule.authForm__linkWrapper}>
          <a className={styleModule.authForm__link} href="/">
            Зарегистрироваться
          </a>
        </Wrapper>
      </WhiteBlock>
    </Wrapper>
  );
};

export default AuthPage;
