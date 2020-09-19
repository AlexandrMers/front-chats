import React, { memo } from "react";

import { MessageInterface } from "components/Message/types";

import Wrapper from "../Wrapper";
import classNames from "classnames";

import styleModule from "./style.module.scss";

interface AvatarPropsInterface {
  message: MessageInterface;
  user: { name: string };
  className?: any;
  size?: number;
}

const Avatar = ({
  message,
  user,
  className,
  size = 30,
}: AvatarPropsInterface) => {
  return (
    <Wrapper
      styles={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
      }}
      className={classNames(styleModule.avatar, className)}
    >
      <img src={message.avatar} alt={`avatar ${user.name}`} />
    </Wrapper>
  );
};

export default memo(Avatar);
