import React, { FC, memo } from "react";
import classNames from "classnames";

import styleModule from "./style.module.scss";
import { MessageInterface } from "types/types";

import Wrapper from "primitives/Wrapper";

import { calculateAlignForAttachments } from "./helpers";

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
  message: { attachments, createdAt, text },
  alignRow = AlignRow.START
}) => {
  const isOneAttachment = attachments.length === 1;

  return (
    <Wrapper
      className={classNames(
        styleModule.attachmentsWrapper,
        calculateAlignForAttachments(alignRow, isOneAttachment, !!text),
        classNames
      )}
    >
      {attachments?.length > 0 &&
        attachments.map((file, index) => (
          <Wrapper
            key={index}
            className={classNames(styleModule.attachmentsWrapper__attachment, {
              [styleModule.attachmentsWrapper__attachment_big]: isOneAttachment
            })}
          >
            <img src={file.url} alt="file" />
          </Wrapper>
        ))}
    </Wrapper>
  );
};

export default memo(ImageFilesRow);
