import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Form } from "antd";

import {
  MailOutlined,
  SecurityScanOutlined,
  UserOutlined,
} from "@ant-design/icons";

import styleModule from "pages/AuthPages/style.module.scss";

import WhiteBlock from "primitives/WhiteBlock";
import Input from "primitives/Input/Input";
import Button from "primitives/Button";
import Wrapper from "primitives/Wrapper";

import SuccessNotifyRegistration from "./SuccessNotifyRegistration";

import {
  excludeUndefinedFromErrors,
  validateEmail,
  validatePassword,
} from "libs/validators";

const RegistrationPage = () => {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    isValid,
  } = useFormik<{
    email: "";
    password: "";
  }>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validate: ({ password, email }) => {
      const errors: {
        [key: string]: string;
      } = {
        email: validateEmail(email),
        password: validatePassword(password),
      };

      return excludeUndefinedFromErrors(errors);
    },
  });

  const [isSuccessRegistration] = useState(false);

  return (
    <Wrapper className={styleModule.wrapperAuth}>
      <header className={styleModule.wrapperAuth__header}>
        <h1 className={styleModule.wrapperAuth__title}>Регистрация</h1>
        <p className={styleModule.wrapperAuth__text}>
          Для входа в чат, вам нужно зарегистрироваться
        </p>
      </header>

      {isSuccessRegistration ? (
        <SuccessNotifyRegistration />
      ) : (
        <WhiteBlock className={styleModule.wrapperAuth__form} withShadow>
          <Form
            onSubmitCapture={handleSubmit}
            className={styleModule.authForm__form}
            name="authForm"
          >
            <Form.Item
              className={styleModule.wrapperAuth__input}
              name="email"
              help={!isValid && touched.email && errors.email}
              hasFeedback={!errors.email}
            >
              <Input
                id="email"
                type="email"
                placeholder="email"
                prefix={<MailOutlined style={{ opacity: 0.5 }} />}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </Form.Item>

            <Form.Item
              className={styleModule.wrapperAuth__input}
              name="username"
            >
              <Input
                type="text"
                placeholder="Ваше имя"
                prefix={<UserOutlined style={{ opacity: 0.5 }} />}
              />
            </Form.Item>

            <Form.Item
              className={styleModule.wrapperAuth__input}
              name="password"
              help={!isValid && touched.password && errors.password}
              hasFeedback={!errors.email}
            >
              <Input
                id="password"
                type="password"
                placeholder="Пароль"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                prefix={<SecurityScanOutlined style={{ opacity: 0.5 }} />}
              />
            </Form.Item>

            <Form.Item
              className={styleModule.wrapperAuth__input}
              name="passwordReset"
            >
              <Input
                type="password"
                placeholder="Повторите пароль"
                prefix={<SecurityScanOutlined style={{ opacity: 0.5 }} />}
              />
            </Form.Item>

            <Button
              className={styleModule.authForm__button}
              type="primary"
              htmlType="submit"
              disabled={!isValid}
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
      )}
    </Wrapper>
  );
};

export default memo(RegistrationPage);
