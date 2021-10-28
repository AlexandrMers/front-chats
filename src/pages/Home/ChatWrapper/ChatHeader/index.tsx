import React, { FC, memo } from "react";
import { Typography } from "antd";

import classNames from "classnames";

import { PartnerInfoChatInterface } from "types/types";

import Circle from "primitives/Circle";

import styleModule from "./style.module.scss";

interface ChatHeaderPropsInterface {
  info: PartnerInfoChatInterface;
}

const ChatHeader: FC<ChatHeaderPropsInterface> = ({ info }) => {
  return (
    <header className={styleModule.chatHeader}>
      <div className={styleModule.chatHeader__info}>
        <h2 className={styleModule.chatHeader__name}>{info.name}</h2>

        {info?.isOnline && (
          <div className={styleModule.chatHeader__inner}>
            <Circle className={styleModule.chatHeader__circle} size={6} />
            <Typography.Text className={styleModule.chatHeader__title}>
              онлайн
            </Typography.Text>
          </div>
        )}
      </div>
      <div className={styleModule.chatHeader__buttonWrap}>
        <button
          className={classNames(styleModule.chatHeader__button, "tripplePoint")}
        />
      </div>
    </header>
  );
};

export default memo(ChatHeader);
