import React, { memo, useMemo } from "react";
import classNames from "classnames";

import Avatar from "antd/lib/avatar";

import styleModule from "./style.module.scss";

import { shortName } from "./helpers";

interface AvatarPropsInterface {
  avatar: string;
  name: string;
  className?: any;
  size?: number;
}

const AvatarCmp = ({
  avatar,
  name,
  className,
  size = 30
}: AvatarPropsInterface) => {
  const isEmptyAvatar = useMemo(() => !avatar, [avatar]);

  return (
    <Avatar
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,

        color: "#ffffff",
        backgroundColor: "#9E9EA1"
      }}
      className={classNames(styleModule.avatar, className)}
    >
      {!isEmptyAvatar ? (
        <img src={avatar} alt={`avatar ${name}`} />
      ) : (
        shortName(name)
      )}
    </Avatar>
  );
};

export default memo(AvatarCmp);
