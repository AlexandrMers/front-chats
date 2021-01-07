import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Form } from "antd";
import { SecurityScanOutlined, UserOutlined } from "@ant-design/icons";

import { userActionsCreators } from "state/user/actions/userActionsCreators";

import Wrapper from "primitives/Wrapper";
import Button from "primitives/Button";
import WhiteBlock from "primitives/WhiteBlock";
import Input from "primitives/Input/Input";

import styleModule from "../style.module.scss";
import {
  fieldValidate,
  helpViewForFormik,
  validateAuthForm
} from "libs/validators";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";

export interface AuthorizationInterface {
  username: string;
  password: string;
}

const LoginPage = withRouter(({ history }: RouteComponentProps) => {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    isValid
  } = useFormik<AuthorizationInterface>({
    initialValues: {
      username: "",
      password: ""
    },
    validate: validateAuthForm,
    onSubmit: (_values: AuthorizationInterface) => {
      login();
    }
  });

  const dispatch = useDispatch();

  const login = () => {
    dispatch(userActionsCreators.authUserActionCreator());
  };

  return (
    <Wrapper className={styleModule.wrapperAuth}>
      <header className={styleModule.wrapperAuth__header}>
        <h1 className={styleModule.wrapperAuth__title}>Войти в аккаунт</h1>
        <p className={styleModule.wrapperAuth__text}>
          Пожалуйста, войдите в свой аккаунт
        </p>
      </header>

      <WhiteBlock className={styleModule.wrapperAuth__form} withShadow>
        <Form
          className={styleModule.authForm__form}
          name="authForm"
          onSubmitCapture={handleSubmit}
        >
          <Form.Item
            className={styleModule.wrapperAuth__input}
            name="username"
            validateStatus={fieldValidate(touched.username, errors.username)}
            hasFeedback={touched.username}
            help={helpViewForFormik(touched.username, errors.username)}
          >
            <Input
              name="username"
              type="text"
              onChange={handleChange("username")}
              onBlur={handleBlur("username")}
              placeholder="Логин"
              value={values.username}
              prefix={<UserOutlined style={{ opacity: 0.5 }} />}
            />
          </Form.Item>

          <Form.Item
            className={styleModule.wrapperAuth__input}
            name="password"
            validateStatus={fieldValidate(touched.password, errors.password)}
            hasFeedback={touched.password}
            help={helpViewForFormik(touched.password, errors.password)}
          >
            <Input
              type="password"
              name="password"
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              placeholder="Пароль"
              prefix={<SecurityScanOutlined style={{ opacity: 0.5 }} />}
            />
          </Form.Item>

          <Button
            className={styleModule.authForm__button}
            type="primary"
            htmlType="submit"
            disabled={!isValid}
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
});

export default memo(LoginPage);
