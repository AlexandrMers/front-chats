import React, { FC, memo, useMemo, useState } from "react";
import { Modal, Upload } from "antd";

import { UploadFile } from "antd/lib/upload/interface";
import { MessageInterface } from "types/types";

import { getBase64 } from "./helpers";

export enum AlignRow {
  START = "start",
  END = "end"
}

interface FileRowPropsInterface {
  message: MessageInterface;
  classNames?: any;
  alignRow?: AlignRow;
}

const ImageFilesRow: FC<FileRowPropsInterface> = ({
  message: { attachments }
}) => {
  const [previewImage, setPreviewImage] = useState("");

  const fileList = useMemo(
    () =>
      attachments.map((file) => ({
        name: file.fileName,
        size: file.size,
        uid: file.publicId,
        url: file.url
      })),
    [attachments]
  );

  const handlePreview = async (file: UploadFile<any>) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
  };

  const handleClose = () => {
    setPreviewImage("");
  };

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
      />
      <Modal visible={!!previewImage} footer={null} onCancel={handleClose}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default memo(ImageFilesRow);
