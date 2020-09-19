import React, { memo } from "react";

import Wrapper from "../Wrapper";
import classNames from "classnames";

import styleModule from "./style.module.scss";

interface AvatarPropsInterface {
  avatar: string;
  name: string;
  className?: any;
  size?: number;
}

const Avatar = ({
  avatar,
  name,
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
      <img src={avatar} alt={`avatar ${name}`} />
    </Wrapper>
  );
};

export default memo(Avatar);
