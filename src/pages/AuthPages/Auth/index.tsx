import React, { memo } from "react";
import { Link } from "react-router-dom";

import { Form } from "antd";

import Wrapper from "primitives/Wrapper";
import Button from "primitives/Button";
import WhiteBlock from "primitives/WhiteBlock";
import Input from "primitives/Input/Input";

import styleModule from "../style.module.scss";

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
          <Link to="/registration" className={styleModule.authForm__link}>
            Зарегистрироваться
          </Link>
        </Wrapper>
      </WhiteBlock>
    </Wrapper>
  );
};

export default memo(AuthPage);
