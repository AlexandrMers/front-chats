import React, {
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { Upload } from "antd";
import { v4 as uuidv4 } from "uuid";

import Wrapper from "primitives/Wrapper";

import styleModule from "./style.module.scss";
import classNames from "classnames";
import {
  AudioOutlined,
  PictureOutlined,
  SendOutlined,
  SmileOutlined
} from "@ant-design/icons";
import FieldUpload, { FileAccept } from "../../primitives/FieldUpload";
import { ExtendedFile } from "./types";

interface InputMessagePropsInterface {
  defaultInputValue?: string;
  placeholder?: string;
}

const formatFilesData = (files: File[]): ExtendedFile[] =>
  files.map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type,
    uid: uuidv4()
  }));

const filterFileListById = (id: string) => (prevFileList: ExtendedFile[]) =>
  prevFileList.filter((file) => file.uid !== id);

const InputMessage: FC<InputMessagePropsInterface> = ({
  placeholder,
  defaultInputValue
}) => {
  const inputRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState<string>(defaultInputValue);

  const [isFocusInput, setIsFocusInput] = useState(false);

  const [fileList, setFileList] = useState<ExtendedFile[]>([]);

  const changeValueInput = useCallback(
    (e: FormEvent<HTMLDivElement>) => {
      const element = e.target as HTMLElement;
      setInputValue(!element.textContent ? "" : element.innerText);
    },
    [setInputValue]
  );

  useEffect(() => {
    if (!inputRef.current) return undefined;

    inputRef.current.textContent = inputValue;
    // eslint-disable-next-line
  }, []);

  const changeFileList = useCallback((files) => {
    setFileList(formatFilesData(files));
  }, []);

  //@ts-ignore
  const removeFile = (data: ExtendedFile) => {
    setFileList(filterFileListById(data.uid));
  };

  return (
    <>
      <Wrapper
        className={classNames(styleModule.input, {
          [styleModule.input_focused]: isFocusInput
        })}
      >
        <SmileOutlined
          className={classNames(
            styleModule.input__smiles,
            styleModule.icon_common
          )}
        />
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
        />
        <div className={styleModule.input__actionMessageWrap}>
          <FieldUpload
            onFilesLoaded={changeFileList}
            view={(openDialog) => {
              return (
                <button
                  onClick={openDialog}
                  className={styleModule.input__button}
                >
                  <PictureOutlined
                    className={classNames(styleModule.icon_common)}
                  />
                </button>
              );
            }}
            accept={FileAccept.IMAGE}
            multiple
          />

          <button className={styleModule.input__button}>
            <AudioOutlined className={classNames(styleModule.icon_common)} />
          </button>

          <button
            className={styleModule.input__button}
            onClick={() => console.log("click")}
          >
            <SendOutlined className={classNames(styleModule.icon_common)} />
          </button>
        </div>
      </Wrapper>

      {fileList.length > 0 && (
        <Upload fileList={fileList} onRemove={removeFile} />
      )}
    </>
  );
};

export default React.memo(InputMessage);
