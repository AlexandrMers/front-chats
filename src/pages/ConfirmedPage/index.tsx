import React, { FC, memo, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { shallowEqual } from "react-redux";

import Loader from "primitives/Loader";
import WhiteBlock from "primitives/WhiteBlock";
import Wrapper from "primitives/Wrapper";

import { useAppDispatch, useTypedSelector } from "state/store";
import { confirmRegistrationUser } from "state/modules/auth";

import style from "./style.module.scss";

const ConfirmedPage: FC = () => {
  const { id: hash } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const {
    confirmedRegistrationError,
    confirmedRegistrationLoading,
    confirmedRegistration
  } = useTypedSelector(
    (state) => ({
      confirmedRegistration: state.authModule.confirmedRegistration,
      confirmedRegistrationLoading:
        state.authModule.confirmedRegistrationLoading,
      confirmedRegistrationError: state.authModule.confirmedRegistrationError
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!hash) return undefined;
    dispatch(confirmRegistrationUser({ hash }));
  }, [dispatch, hash]);

  return (
    <Wrapper className={style.cmpConfirmedPage}>
      {confirmedRegistrationLoading ? (
        <Loader />
      ) : confirmedRegistration && !confirmedRegistrationError ? (
        <WhiteBlock className={style.cmpConfirmedPage__innerBlock}>
          <div>Ваш аккаунт успешно подтвержден</div>
          <Link to="/login">Перейти на страницу входа</Link>
        </WhiteBlock>
      ) : (
        <WhiteBlock className={style.cmpConfirmedPage__innerBlock}>
          <div>Что-то пошло не так. Попробуйте еще раз.</div>
        </WhiteBlock>
      )}
    </Wrapper>
  );
};

export default memo(ConfirmedPage);
