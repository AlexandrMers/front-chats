import React, { FC, memo } from "react";
import { Typography } from "antd";

import { UserInterface } from "types/types";
import Circle from "primitives/Circle";

import styleModule from "./style.module.scss";
import classNames from "classnames";

interface ChatHeaderPropsInterface {
  user: UserInterface;
  onClick?: () => void;
}

const ChatHeader: FC<ChatHeaderPropsInterface> = ({ user, onClick }) => {
  return (
    <header className={styleModule.chatHeader} onClick={onClick}>
      <div className={styleModule.chatHeader__info}>
        <h2 className={styleModule.chatHeader__name}>{user.fullName}</h2>
        {user.isOnline && (
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
