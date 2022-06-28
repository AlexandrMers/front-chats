import React, { FC, memo, ReactNode } from "react";
import { Upload } from "antd";
import { RcFile, UploadChangeParam } from "antd/lib/upload/interface";

interface UploadFilePropsInterface {
  children: ReactNode;
  onChange: (info: UploadChangeParam) => void;
  onAction:
    | string
    | ((file: RcFile) => string)
    | ((file: RcFile) => PromiseLike<string>);
}

const UploadFileComponent: FC<UploadFilePropsInterface> = ({
  children,
  onChange,
  onAction
}) => {
  const previewFile = (file: File | Blob): PromiseLike<string> => {
    return Promise.resolve(".jpg");
  };

  return (
    <Upload
      action={onAction}
      onChange={onChange}
      listType="picture"
      previewFile={previewFile}
    >
      {children}
    </Upload>
  );
};

export default memo(UploadFileComponent);
