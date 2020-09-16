import React, { memo, useState } from "react";
import { Link } from "react-router-dom";

import { Form } from "antd";

import styleModule from "pages/AuthPages/style.module.scss";

import WhiteBlock from "primitives/WhiteBlock";
import Input from "primitives/Input/Input";
import Button from "primitives/Button";
import Wrapper from "primitives/Wrapper";
import {
  MailOutlined,
  SecurityScanOutlined,
  UserOutlined,
} from "@ant-design/icons";

import SuccessNotifyRegistration from "./SuccessNotifyRegistration";
import { useFormik } from "formik";

const RegistrationPage = () => {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    dirty,
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
    validate: (values) => {
      const errors: {
        [key: string]: string;
      } = {};

      if (!values.email) {
        errors.email = "Обязательное поле";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Невалидный адрес почты";
      }

      if (!values.password) {
        errors.password = "Обязательное поле";
      } else if (
        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.password)
      ) {
        errors.password = "Невалидный пароль";
      }

      return errors;
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
              help={dirty && touched.email && errors.email}
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
              help={dirty && touched.password && errors.password}
            >
              <Input
                id="password"
                type="password"
                placeholder="Пароль"
                onChange={handleChange}
                onBlur={handleBlur}
                prefix={<SecurityScanOutlined style={{ opacity: 0.5 }} />}
                value={values.password}
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
