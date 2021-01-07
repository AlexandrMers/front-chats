import React, { memo } from "react";
import WhiteBlock from "primitives/WhiteBlock";
import classNames from "classnames";

import Wrapper from "primitives/Wrapper";

import styleModule from "../../style.module.scss";

function SuccessNotifyRegistration() {
  return (
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
            На Вашу почту отправлено письмо с ссылкой на подтверждение аккаунта.
          </p>
        </Wrapper>
      </Wrapper>
    </WhiteBlock>
  );
}

export default memo(SuccessNotifyRegistration);
