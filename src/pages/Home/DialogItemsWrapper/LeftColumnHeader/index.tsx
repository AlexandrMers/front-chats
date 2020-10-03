import React, { FC } from "react";
import { FormOutlined, WechatOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import styleModule from "./style.module.scss";
import classNames from "classnames";

interface LeftColumnHeaderPropsInterface {
  onNewChat: () => void;
}

export const LeftColumnHeader: FC<LeftColumnHeaderPropsInterface> = ({
  onNewChat
}) => {
  return (
    <header className={styleModule.leftColumnHeader}>
      <WechatOutlined
        className={styleModule.leftColumnHeader__icon}
        style={{
          fontSize: 22
        }}
        color="#555555"
      />
      <Typography.Paragraph className={styleModule.leftColumnHeader__title}>
        Список диалогов
      </Typography.Paragraph>
      <FormOutlined
        className={classNames(
          styleModule.leftColumnHeader__icon,
          styleModule.leftColumnHeader__icon_newChat
        )}
        style={{
          fontSize: 22
        }}
        color="#555555"
        onClick={onNewChat}
      />
    </header>
  );
};
