import React, { memo } from "react";

import FlexContainer from "primitives/FlexContainer";
import { JustifyContentTypes } from "primitives/FlexContainer/types";

import { MessageInterface } from "types/types";

import style from "./style.module.scss";

const SystemMessage = (message: MessageInterface) => {
  return (
    <FlexContainer
      jc={JustifyContentTypes.CENTER}
      className={style.systemMessage}
    >
      <span className={style.systemMessage__innerText}>
          {message.text}
      </span>
    </FlexContainer>
  );
};

export default memo(SystemMessage);
