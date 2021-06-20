import React, { FC, memo, useCallback } from "react";
import { shallowEqual } from "react-redux";

// Components
import InputMessage, { InputMessagePropsInterface } from "./index";

// State
import { deleteFile, loadFile } from "state/modules/selectedChat/actions";
import { useAppDispatch, useTypedSelector } from "state/store";

// Types
import { UploadFile } from "antd/lib/upload/interface";
import { selectFilesSelector } from "./selectors";
import { FileFromServerInterface } from "state/modules/selectedChat/types";

interface InputMessageContainerInterface
  extends Omit<
    InputMessagePropsInterface,
    "removeFile" | "fileList" | "onLoadFiles" | "sendMessage"
  > {
  sendMessage: (msg: string, files: UploadFile[]) => void;
}

const InputMessageContainer: FC<InputMessageContainerInterface> = ({
  sendMessage,
  ...otherProps
}) => {
  const fileList = useTypedSelector(selectFilesSelector, shallowEqual);

  const dispatch = useAppDispatch();

  const onLoadFiles = useCallback(
    (files: File[]) => {
      files.forEach((file) => {
        dispatch(loadFile(file));
      });
    },
    [dispatch]
  );

  const removeFile = (data: UploadFile & Partial<FileFromServerInterface>) => {
    dispatch(deleteFile({ uid: data.uid, publicId: data.publicId }));
  };

  const onSendMessage = (message: string) => {
    sendMessage(message, fileList);
  };

  return (
    <InputMessage
      {...otherProps}
      onLoadFiles={onLoadFiles}
      fileList={fileList}
      removeFile={removeFile}
      sendMessage={onSendMessage}
    />
  );
};

export default memo(InputMessageContainer);
