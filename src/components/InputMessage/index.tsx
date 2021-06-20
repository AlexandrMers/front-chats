import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import classNames from "classnames";

// Types
import { BaseEmoji } from "emoji-mart/dist-es/utils/emoji-index/nimble-emoji-index";
import { UploadFile } from "antd/lib/upload/interface";

// Constants
import { ENTER_KEY_UP_CODE } from "./constants";

// Primitives
import Wrapper from "primitives/Wrapper";
import FieldUpload, { FileAccept } from "primitives/FieldUpload";
import {
  AudioOutlined,
  PictureOutlined,
  SendOutlined
} from "@ant-design/icons";

// Components
import EmojiPicker from "./EmojiPicker";
import { Upload } from "antd";
import ScrollBar from "react-custom-scrollbars";

// Styles
import styleModule from "./style.module.scss";
import { FileFromServerInterface } from "../../state/modules/selectedChat/types";

export interface InputMessagePropsInterface {
  placeholder?: string;
  fileList: UploadFile[];

  sendMessage: (msg: string) => void;
  onLoadFiles: (files: File[]) => void;
  removeFile: (file: UploadFile & Partial<FileFromServerInterface>) => void;
}

const InputMessage: FC<InputMessagePropsInterface> = ({
  placeholder,
  fileList,
  sendMessage,
  onLoadFiles,
  removeFile
}) => {
  useEffect(() => {
    focusInput();
  });

  const [value, setValue] = useState("");

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );

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
            onFilesLoaded={onLoadFiles}
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
            onClick={onSendClick}
            disabled={!value}
          >
            <SendOutlined
              className={classNames(styleModule.icon_common)}
              disabled={!value}
            />
          </button>
        </div>
      </Wrapper>

      {fileList.length > 0 && (
        <ScrollBar
          style={{
            height: "150px"
          }}
        >
          <Upload
            fileList={fileList}
            onRemove={removeFile}
            listType="picture"
          />
        </ScrollBar>
      )}
    </>
  );
};

export default React.memo(InputMessage);
