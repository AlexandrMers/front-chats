import React, { useCallback, useState } from "react";
import { FormOutlined, WechatOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import styleModule from "./style.module.scss";
import classNames from "classnames";
import CreateChatModal from "./CreateChatModal";

export const LeftColumnHeader = () => {
  const [visibleModal, setVisibleModal] = useState(false);

  const onCancelModal = useCallback(() => setVisibleModal(false), []);
  const onSuccessModal = useCallback(() => setVisibleModal(false), []);

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
          visible={visibleModal}
          onCancel={onCancelModal}
          onSuccess={onSuccessModal}
        />
      )}
    </header>
  );
};
