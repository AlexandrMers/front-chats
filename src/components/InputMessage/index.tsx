import React, {
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

import Wrapper from "primitives/Wrapper";

import styleModule from "./style.module.scss";
import classNames from "classnames";

interface InputMessagePropsInterface {
  defaultInputValue?: string;
  placeholder?: string;
}

const InputMessage: FC<InputMessagePropsInterface> = ({
  placeholder,
  defaultInputValue
}) => {
  const inputRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState<string>(defaultInputValue);

  const [isFocusInput, setIsFocusInput] = useState(false);

  const changeValueInput = useCallback(
    (e: FormEvent<HTMLDivElement>) => {
      const element = e.target as HTMLElement;
      setInputValue(element.textContent);
    },
    [setInputValue]
  );

  useEffect(() => {
    if (!inputRef.current) return undefined;

    inputRef.current.textContent = inputValue;
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper
      className={classNames(styleModule.input, {
        [styleModule.input_focused]: isFocusInput
      })}
    >
      {!!placeholder && !inputValue && (
        <span
          onClick={() => inputRef.current && inputRef.current.focus()}
          className={styleModule.input__placeholder}
        >
          {placeholder}
        </span>
      )}
      <div
        ref={inputRef}
        contentEditable
        onInput={changeValueInput}
        className={styleModule.input__input}
        onFocus={() => {
          if (isFocusInput) return;
          setIsFocusInput(true);
        }}
        onBlur={() => {
          if (!isFocusInput) return;
          setIsFocusInput(false);
        }}
        tabIndex={2}
      />
    </Wrapper>
  );
};

export default React.memo(InputMessage);
