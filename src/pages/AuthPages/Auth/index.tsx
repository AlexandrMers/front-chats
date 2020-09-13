import React, { memo } from "react";

import { Form } from "antd";
import { SecurityScanOutlined, UserOutlined } from "@ant-design/icons";

import Wrapper from "primitives/Wrapper";
import Button from "primitives/Button";
import WhiteBlock from "primitives/WhiteBlock";
import Input from "primitives/Input/Input";

import styleModule from "../style.module.scss";

const AuthPage = ({ toRegister }: { toRegister: () => void }) => {
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
            <Input
              type="text"
              placeholder="Логин"
              prefix={<UserOutlined style={{ opacity: 0.5 }} />}
            />
          </Form.Item>

          <Form.Item className={styleModule.wrapperAuth__input} name="password">
            <Input
              type="password"
              placeholder="Пароль"
              prefix={<SecurityScanOutlined style={{ opacity: 0.5 }} />}
            />
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
          <Button
            type="text"
            onClick={toRegister}
            className={styleModule.authForm__link}
          >
            Зарегистрироваться
          </Button>
        </Wrapper>
      </WhiteBlock>
    </Wrapper>
  );
};

export default memo(AuthPage);
