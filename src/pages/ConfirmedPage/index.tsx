import React, { FC, memo } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import Loader from "primitives/Loader";
import WhiteBlock from "primitives/WhiteBlock";
import Wrapper from "primitives/Wrapper";

import style from "./style.module.scss";

const ConfirmedPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  console.log("id -> ", id);

  const isSuccess = true;
  const isLoading = false;

  return (
    <Wrapper className={style.cmpConfirmedPage}>
      {isLoading ? (
        <Loader />
      ) : isSuccess ? (
        <WhiteBlock className={style.cmpConfirmedPage__innerBlock}>
          <div>Ваш аккаунт успешно подтвержден</div>
          <Link to="/login">Перейти на страницу входа</Link>
        </WhiteBlock>
      ) : (
        <WhiteBlock className={style.cmpConfirmedPage__innerBlock}>
          <div>Произошла ошибка</div>
        </WhiteBlock>
      )}
    </Wrapper>
  );
};

export default memo(ConfirmedPage);
