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
import { FileFromServerInterface } from "../../state/modules/selectedChat/types";

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
import { useSendDisabledByMessageAndFilesList } from "./hooks/useSendDisabledByMessageAndFilesList";

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
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isDisabledSendMessage = useSendDisabledByMessageAndFilesList({
    messageText: value,
    fileList
  });

  useEffect(() => {
    focusInput();
  });

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handlerEmoji = (emoji: BaseEmoji) => {
    setValue((prevVal) => prevVal + emoji.native);
    focusInput();
  };

  const focusInput = () => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  };

  const clearInputValue = useCallback(() => setValue(""), [setValue]);

  const onSendMessage = (msg: string) => {
    sendMessage(msg);
    clearInputValue();
  };

  const onKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (isDisabledSendMessage) {
      if (e.key === ENTER_KEY_UP_CODE) {
        return e.preventDefault();
      }
      return;
    }

    if (e.key !== ENTER_KEY_UP_CODE || e.shiftKey) return;
    e.preventDefault();
    onSendMessage(value);
  };

  const onSendClick = () => {
    onSendMessage(value);
  };

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
          onKeyPress={onKeyPress}
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
            disabled={isDisabledSendMessage}
          >
            <SendOutlined
              className={classNames(styleModule.icon_common)}
              disabled={isDisabledSendMessage}
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
