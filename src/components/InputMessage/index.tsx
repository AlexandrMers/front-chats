import React, { FC, FormEvent, useCallback, useEffect, useRef } from "react";

import Wrapper from "primitives/Wrapper";

import styleModule from "./style.module.scss";

interface InputMessagePropsInterface {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputMessage: FC<InputMessagePropsInterface> = ({
  value,
  onChange,
  placeholder
}) => {
  const inputRef = useRef<HTMLDivElement>(null);

  const changeValueInput = useCallback(
    (e: FormEvent<HTMLDivElement>) => {
      const element = e.target as HTMLElement;
      onChange(element.textContent);
    },
    [onChange]
  );

  useEffect(() => {
    if (!inputRef.current) return undefined;

    inputRef.current.textContent = value;
  }, [value]);

  return (
    <Wrapper className={styleModule.input}>
      {!!placeholder && !value && (
        <span className={styleModule.input__placeholder}>{placeholder}</span>
      )}
      <div
        ref={inputRef}
        contentEditable
        onInput={changeValueInput}
        className={styleModule.input__input}
      />
    </Wrapper>
  );
};

export default React.memo(InputMessage);
