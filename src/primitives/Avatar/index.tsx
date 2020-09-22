import React, { memo, useMemo } from "react";

import Wrapper from "../Wrapper";
import classNames from "classnames";

import styleModule from "./style.module.scss";
import { isEmpty } from "ramda";

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
  const isEmptyAvatar = useMemo(() => isEmpty(avatar), [avatar]);

  return (
    <Wrapper
      styles={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
      }}
      className={classNames(
        styleModule.avatar,
        {
          [styleModule.avatar_isEmpty]: isEmptyAvatar,
        },
        className
      )}
    >
      {!isEmptyAvatar && <img src={avatar} alt={`avatar ${name}`} />}
    </Wrapper>
  );
};

export default memo(Avatar);
