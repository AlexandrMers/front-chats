import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { Upload } from "antd";
import {
  AudioOutlined,
  PictureOutlined,
  SendOutlined
} from "@ant-design/icons";
import classNames from "classnames";
import { BaseEmoji } from "emoji-mart/dist-es/utils/emoji-index/nimble-emoji-index";

import Wrapper from "primitives/Wrapper";
import FieldUpload, { FileAccept } from "primitives/FieldUpload";
import { ExtendedFile } from "./types";

import EmojiPicker from "./EmojiPicker";
import { filterFileListById, formatFilesData } from "./libs";

import styleModule from "./style.module.scss";
import { ENTER_KEY_UP_CODE } from "./constants";

interface InputMessagePropsInterface {
  placeholder?: string;
  sendMessage: (msg: string) => void;
}

const InputMessage: FC<InputMessagePropsInterface> = ({
  placeholder,
  sendMessage
}) => {
  useEffect(() => {
    focusInput();
  });

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState("");

  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  const [fileList, setFileList] = useState<ExtendedFile[]>([]);

  const handlerEmoji = useCallback(
    (emoji: BaseEmoji) => {
      setValue((prevVal) => prevVal + emoji.native);
      focusInput();
    },
    [setValue]
  );

  const clearInputValue = useCallback(() => setValue(""), [setValue]);

  const onSendMessage = useCallback(
    (msg: string) => {
      sendMessage(msg);
      clearInputValue();
    },
    [sendMessage, clearInputValue]
  );

  const onKeyUp = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.keyCode !== ENTER_KEY_UP_CODE || e.shiftKey) return;
      e.preventDefault();
      onSendMessage(value);
    },
    [value, onSendMessage]
  );

  const focusInput = () => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  };

  const changeFileList = useCallback((files) => {
    setFileList(formatFilesData(files));
  }, []);

  const removeFile = (data: ExtendedFile) => {
    setFileList(filterFileListById(data.uid));
  };

  const onSendClick = useCallback(() => {
    onSendMessage(value);
  }, [value, onSendMessage]);

  return (
    <>
      <Wrapper className={classNames(styleModule.input)}>
        <EmojiPicker
          addEmojiHandler={handlerEmoji}
          className={classNames(
            styleModule.input__smiles,
            styleModule.icon_common
          )}
        />

        <textarea
          ref={inputRef}
          onChange={onChange}
          value={value}
          className={styleModule.input__input}
          placeholder={placeholder}
          onKeyUp={onKeyUp}
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

          <button className={styleModule.input__button} onClick={onSendClick}>
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
