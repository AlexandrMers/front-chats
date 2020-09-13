import React, { memo } from "react";

import styleModule from "pages/AuthPages/style.module.scss";

import WhiteBlock from "primitives/WhiteBlock";
import Wrapper from "primitives/Wrapper";
import classNames from "classnames";

const ConfirmPage = () => {
  return (
    <Wrapper className={styleModule.wrapperAuth}>
      <header className={styleModule.wrapperAuth__header}>
        <h1 className={styleModule.wrapperAuth__title}>Регистрация</h1>
        <p className={styleModule.wrapperAuth__text}>
          Для входа в чат, вам нужно зарегистрироваться
        </p>
      </header>

      <WhiteBlock
        className={classNames(
          styleModule.wrapperAuth__form,
          styleModule.confirmBlock
        )}
        withShadow
      >
        <Wrapper className={styleModule.authForm__confirmWrapper}>
          <Wrapper className={styleModule.authForm__confirmBlock}>
            <div className={styleModule.confirmBlock__iconConfirm}></div>
            <h3 className={styleModule.confirmBlock__title}>
              Подтвердите свой аккаунт
            </h3>
            <p className={styleModule.confirmBlock__text}>
              На Вашу почту отправлено письмо с ссылкой на подтверждение
              аккаунта.
            </p>
          </Wrapper>
        </Wrapper>
      </WhiteBlock>
    </Wrapper>
  );
};

export default memo(ConfirmPage);
