import React, { FC, memo } from "react";
import { Typography } from "antd";

import styleModule from "./style.module.scss";

import Avatar from "primitives/Avatar";
import classNames from "classnames";

const DialogItem: FC<any> = () => {
  return (
    <div className={styleModule.dialogItem}>
      <Avatar
        size={40}
        avatar="https://live.staticflickr.com/65535/50339368162_ddc568be3e_c.jpg"
        name="Светлана"
        className={classNames(styleModule.dialogItem__avatar)}
      />
      <div className={styleModule.dialogItem__content}>
        <header className={styleModule.dialogItem__header}>
          <Typography.Title className={styleModule.dialogItem__title} level={5}>
            Светлана
          </Typography.Title>
          <time className={styleModule.dialogItem__date}>Сейчас</time>
        </header>

        <section className={styleModule.dialogItem__msgInfo}>
          <Typography.Paragraph
            ellipsis
            className={styleModule.dialogItem__messageText}
          >
            Текст последнего сообщения Текст последнего сообщения Текст
            последнего сообщения Текст последнего сообщения Текст последнего
            сообщения
          </Typography.Paragraph>
          <div className="dialogItem__counter">3</div>
        </section>
      </div>
    </div>
  );
};

export default memo(DialogItem);
