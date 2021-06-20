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
    "removeFile" | "fileList" | "onLoadFiles"
  > {}

const InputMessageContainer: FC<InputMessageContainerInterface> = (props) => {
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

  return (
    <InputMessage
      {...props}
      onLoadFiles={onLoadFiles}
      fileList={fileList}
      removeFile={removeFile}
    />
  );
};

export default memo(InputMessageContainer);
