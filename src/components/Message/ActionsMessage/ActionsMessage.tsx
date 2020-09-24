import React, { FC, memo } from "react";
import classNames from "classnames";

import styleModule from "../style.module.scss";

import Wrapper from "primitives/Wrapper";
import checkDoubleIcon from "assets/check-double.svg";
import checkOnceIcon from "assets/check-once.svg";
import { ActionsMessagePropsInterface } from "../types";

const ActionsMessage: FC<ActionsMessagePropsInterface> = ({ isMe, isRead }) => {
  return (
    <Wrapper
      className={classNames(
        styleModule.messageWrapper__params,
        isMe && styleModule.messageWrapper__params_me
      )}
    >
      <div
        className={classNames(
          "tripplePoint",
          styleModule.messageWrapper__tripplePoint
        )}
      />
      <img
        src={isRead ? checkDoubleIcon : checkOnceIcon}
        alt="icon read"
        className={classNames(
          "iconCheck",
          styleModule.messageWrapper__iconCheck,
          !isRead && styleModule.messageWrapper__iconCheck_left
        )}
      />
    </Wrapper>
  );
};

export default memo(ActionsMessage);
