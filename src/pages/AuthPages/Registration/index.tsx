import React, { memo } from "react";
import { Link } from "react-router-dom";

import { Form } from "antd";

import styleModule from "pages/AuthPages/style.module.scss";

import WhiteBlock from "primitives/WhiteBlock";
import Input from "primitives/Input/Input";
import Button from "primitives/Button";
import Wrapper from "primitives/Wrapper";

const RegistrationPage = () => {
  return (
    <Wrapper className={styleModule.wrapperAuth}>
      <header className={styleModule.wrapperAuth__header}>
        <h1 className={styleModule.wrapperAuth__title}>Регистрация</h1>
        <p className={styleModule.wrapperAuth__text}>
          Для входа в чат, вам нужно зарегистрироваться
        </p>
      </header>

      <WhiteBlock className={styleModule.wrapperAuth__form} withShadow>
        <Form className={styleModule.authForm__form} name="authForm">
          <Form.Item
            hasFeedback
            className={styleModule.wrapperAuth__input}
            name="email"
          >
            <Input type="email" placeholder="E-mail" />
          </Form.Item>

          <Form.Item className={styleModule.wrapperAuth__input} name="username">
            <Input type="text" placeholder="Ваше имя" />
          </Form.Item>

          <Form.Item className={styleModule.wrapperAuth__input} name="password">
            <Input type="password" placeholder="Пароль" />
          </Form.Item>

          <Form.Item
            className={styleModule.wrapperAuth__input}
            name="passwordReset"
          >
            <Input type="password" placeholder="Повторите пароль" />
          </Form.Item>

          <Button
            className={styleModule.authForm__button}
            type="primary"
            htmlType="submit"
          >
            Зарегистрироваться
          </Button>
        </Form>
        <Wrapper className={styleModule.authForm__linkWrapper}>
          <Link to="/auth" className={styleModule.authForm__link}>
            Войти в аккаунт
          </Link>
        </Wrapper>
      </WhiteBlock>
    </Wrapper>
  );
};

export default memo(RegistrationPage);
