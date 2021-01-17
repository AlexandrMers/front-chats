import React, { useState } from "react";
import { FormOutlined, WechatOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import styleModule from "./style.module.scss";
import classNames from "classnames";
import CreateChatModal from "../../../../components/CreateChatModal";

const fakeUsers = [
  {
    id: "1",
    fullName: "Alexandr",
    isOnline: false,
    email: "alexandr@msmas.ru",
    avatar: "",
    lastSeen: new Date()
  },
  {
    id: "2",
    fullName: "Alexandr 2",
    isOnline: false,
    email: "alexandr@msm4as.ru",
    avatar: "",
    lastSeen: new Date()
  },
  {
    id: "3",
    fullName: "Alexandr 3",
    isOnline: false,
    email: "alexandr@msma3s.ru",
    avatar: "",
    lastSeen: new Date()
  }
];

export const LeftColumnHeader = () => {
  const [visibleModal, setVisibleModal] = useState(false);

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
        onClick={() => setVisibleModal(true)}
      />

      {visibleModal && (
        <CreateChatModal
          loading={false}
          visible={visibleModal}
          onCancel={() => {
            setVisibleModal(false);
          }}
          onSuccess={() => {
            setVisibleModal(false);
          }}
          users={fakeUsers}
          selectUser={(id) => {
            console.log("select user -> ", id);
          }}
        />
      )}
    </header>
  );
};
