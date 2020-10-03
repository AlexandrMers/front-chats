import React, { ChangeEvent } from "react";
import { Input as InputAnt } from "antd";
import { InputProps } from "antd/lib/input/Input";
import classNames from "classnames";

import styledModule from "./style.module.scss";
import { Overwrite } from "../../types/helpersType";

type InputPropsInterface = Overwrite<
  InputProps,
  {
    className?: any;
    placeholder?: string;
    onChange?: (value: string) => void;
  }
>;

const Input = (props: InputPropsInterface) => {
  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) =>
    props.onChange(e.target.value);

  return (
    <InputAnt
      {...props}
      onChange={changeInputValue}
      className={classNames(styledModule.input, props.className)}
    />
  );
};

export default React.memo(Input);
