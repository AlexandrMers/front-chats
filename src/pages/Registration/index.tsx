import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Form } from "antd";
import { shallowEqual } from "react-redux";

import {
  MailOutlined,
  SecurityScanOutlined,
  UserOutlined
} from "@ant-design/icons";

import styleModule from "pages/style.module.scss";

import WhiteBlock from "primitives/WhiteBlock";
import Input from "primitives/Input/Input";
import Button from "primitives/Button";
import Wrapper from "primitives/Wrapper";

import SuccessNotifyRegistration from "./SuccessNotifyRegistration";

import {
  fieldValidate,
  helpViewForFormik,
  RegistrationFormInterface
} from "libs/validators";
import { configFormRegistrationFormik } from "./tools";

import { useAppDispatch, useTypedSelector } from "state/store";
import { registerUser } from "state/modules/auth/actions";

const RegistrationPage = () => {
  const dispatch = useAppDispatch();

  const { registrationLoading, registrationSuccess } = useTypedSelector(
    (state) => ({
      registrationError: state.authModule.registrationError,
      registrationSuccess: state.authModule.registrationSuccess,
      registrationLoading: state.authModule.registrationLoading
    }),
    shallowEqual
  );

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    isValid
  } = useFormik<RegistrationFormInterface>({
    ...configFormRegistrationFormik,
    onSubmit: (values: RegistrationFormInterface) => {
      dispatch(
        registerUser({
          email: values.email,
          fullName: values.name,
          password: values.password,
          confirmedPassword: values.password2
        })
      );
    }
  });

  const validateStatusEmail = useMemo(
    () => fieldValidate(touched.email, errors.email),
    [touched.email, errors.email]
  );

  const helpViewEmail = useMemo(
    () => helpViewForFormik(touched.email, errors.email),
    [touched.email, errors.email]
  );

  const validateStatusName = useMemo(
    () => fieldValidate(touched.name, errors.name),
    [touched.name, errors.name]
  );

  const helpViewName = useMemo(
    () => helpViewForFormik(touched.name, errors.name),
    [touched.name, errors.name]
  );

  const validateStatusPassword = useMemo(
    () => fieldValidate(touched.password, errors.password),
    [touched.password, errors.password]
  );

  const helpViewPassword = useMemo(
    () => helpViewForFormik(touched.password, errors.password),
    [touched.password, errors.password]
  );

  const validateStatusPasswordRepeat = useMemo(
    () => fieldValidate(touched.password2, errors.password2),
    [touched.password2, errors.password2]
  );

  const helpViewPasswordRepeat = useMemo(
    () => helpViewForFormik(touched.password2, errors.password2),
    [touched.password2, errors.password2]
  );

  return (
    <Wrapper className={styleModule.wrapperAuth}>
      <header className={styleModule.wrapperAuth__header}>
        <h1 className={styleModule.wrapperAuth__title}>??????????????????????</h1>
        <p className={styleModule.wrapperAuth__text}>
          ?????? ?????????? ?? ??????, ?????? ?????????? ????????????????????????????????????
        </p>
      </header>

      {registrationSuccess ? (
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
              validateStatus={validateStatusEmail}
              hasFeedback={touched.email}
              help={helpViewEmail}
            >
              <Input
                id="email"
                placeholder="email"
                name="email"
                prefix={<MailOutlined style={{ opacity: 0.5 }} />}
                onChange={handleChange("email")}
                onBlur={handleBlur}
                value={values.email}
              />
            </Form.Item>

            <Form.Item
              className={styleModule.wrapperAuth__input}
              name="name"
              validateStatus={validateStatusName}
              hasFeedback={touched.name}
              help={helpViewName}
            >
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="???????? ??????"
                value={values.name}
                onChange={handleChange("name")}
                onBlur={handleBlur}
                prefix={<UserOutlined style={{ opacity: 0.5 }} />}
              />
            </Form.Item>

            <Form.Item
              className={styleModule.wrapperAuth__input}
              name="password"
              validateStatus={validateStatusPassword}
              help={helpViewPassword}
              hasFeedback={touched.password}
            >
              <Input
                id="password"
                type="password"
                placeholder="????????????"
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur}
                prefix={<SecurityScanOutlined style={{ opacity: 0.5 }} />}
              />
            </Form.Item>

            <Form.Item
              className={styleModule.wrapperAuth__input}
              name="password2"
              validateStatus={validateStatusPasswordRepeat}
              hasFeedback={touched.password2}
              help={helpViewPasswordRepeat}
            >
              <Input
                id="password2"
                name="password2"
                type="password"
                placeholder="?????????????????? ????????????"
                value={values.password2}
                onChange={handleChange("password2")}
                onBlur={handleBlur}
                prefix={<SecurityScanOutlined style={{ opacity: 0.5 }} />}
              />
            </Form.Item>

            <Button
              className={styleModule.authForm__button}
              type="primary"
              htmlType="submit"
              disabled={!isValid || registrationLoading}
              loading={registrationLoading}
            >
              ????????????????????????????????????
            </Button>
          </Form>
          <Wrapper className={styleModule.authForm__linkWrapper}>
            <Link to="/login" className={styleModule.authForm__link}>
              ?????????? ?? ??????????????
            </Link>
          </Wrapper>
        </WhiteBlock>
      )}
    </Wrapper>
  );
};

export default memo(RegistrationPage);
