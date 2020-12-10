import React, { FC, FormEvent, useCallback, useRef, useState } from "react";
import { Upload } from "antd";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import { EmojiData } from "emoji-mart/dist-es/utils/emoji-index/nimble-emoji-index";

import reactStringReplace from "react-string-replace";

import Wrapper from "primitives/Wrapper";

import styleModule from "./style.module.scss";
import {
  AudioOutlined,
  PictureOutlined,
  SendOutlined
} from "@ant-design/icons";
import FieldUpload, { FileAccept } from "../../primitives/FieldUpload";
import { ExtendedFile } from "./types";
import EmojiPicker from "../EmojiPicker";
import { Emoji } from "emoji-mart";

interface InputMessagePropsInterface {
  placeholder?: string;
}

const formatFilesData = (files: File[]): ExtendedFile[] =>
  files.map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type,
    uid: uuidv4()
  }));

const getEmojiHtml = (colons: string) => {
  return (
    <span
      dangerouslySetInnerHTML={{
        // @ts-ignore
        __html: Emoji({
          html: true,
          set: "apple",
          emoji: colons,
          size: 16
        })
      }}
    />
  ).toString();
};

const filterFileListById = (id: string) => (prevFileList: ExtendedFile[]) =>
  prevFileList.filter((file) => file.uid !== id);

const InputMessage: FC<InputMessagePropsInterface> = ({ placeholder }) => {
  const inputRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState<string>();

  const changeValueInput = useCallback(
    (e: FormEvent<HTMLDivElement>) => {
      const element = e.target as HTMLElement;
      setValue(element.textContent);
    },
    [setValue]
  );

  console.log("value ", value);

  const [isFocusInput, setIsFocusInput] = useState(false);

  const [fileList, setFileList] = useState<ExtendedFile[]>([]);

  const focusInput = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
    document.execCommand("selectAll", false, null);
    document.getSelection().collapseToEnd();
  }, [inputRef]);

  const handlerEmoji = useCallback(
    ({ colons }: EmojiData) => {
      setValue((prevVal = "") => `${prevVal} ${colons} `);
      focusInput();
    },
    [setValue, inputRef]
  );

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
        <EmojiPicker
          addEmojiHandler={handlerEmoji}
          className={classNames(
            styleModule.input__smiles,
            styleModule.icon_common
          )}
        />

        {!!placeholder && !value && (
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
        >
          {reactStringReplace(value, /:(.+?):/g, (match, i) => (
            <span
              key={i}
              dangerouslySetInnerHTML={{
                //@ts-ignore
                __html: Emoji({
                  html: true,
                  set: "apple",
                  emoji: match,
                  size: 16
                })
              }}
            />
          ))}
        </div>
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
