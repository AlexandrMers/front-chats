import React, { memo, ReactNode } from "react";
import { Button as ButtonBase } from "antd";
import { ButtonProps } from "antd/lib/button/button";
import classNames from "classnames";

interface ButtonPropsInterface extends ButtonProps {
  children: ReactNode;
}

const Button = (props: ButtonPropsInterface) => {
  return (
    <ButtonBase {...props} className={classNames("button", props.className)}>
      {props.children}
    </ButtonBase>
  );
};

export default memo(Button);
