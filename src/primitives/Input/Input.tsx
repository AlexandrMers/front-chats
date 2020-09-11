import React from "react";
import { Input as InputAnt } from "antd";
import { InputProps } from "antd/lib/input/Input";
import classNames from "classnames";

import styledModule from "./style.module.scss";

interface InputPropsInterface extends InputProps {
  className?: any;
  placeholder?: string;
}

const Input = (props: InputPropsInterface) => {
  return (
    <InputAnt
      {...props}
      className={classNames(styledModule.input, props.className)}
    />
  );
};

export default React.memo(Input);
