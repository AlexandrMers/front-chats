import React, { memo } from "react";
import { Button as ButtonBase } from "antd";

const Button = ({ name = "Просто кнопка" }: { name?: string }) => {
  return <ButtonBase type={"primary"}>{name}</ButtonBase>;
};

export default memo(Button);
