import React, { FC, memo, useState } from "react";
import { Modal, Card, Avatar } from "antd";
import { UserInterface } from "../../types/types";
import Meta from "antd/lib/card/Meta";
import ScrollBar from "react-custom-scrollbars";

interface CreateChatModalInterface {
  onSuccess: () => void;
  loading: boolean;
  onCancel: () => void;
  users: UserInterface[];
  selectUser: (id: string) => void;
  visible: boolean;
}

const CreateChatModal: FC<CreateChatModalInterface> = ({
  onSuccess,
  loading,
  onCancel,
  users,
  visible
}) => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <Modal
      title="Создать новый чат"
      confirmLoading={loading}
      onCancel={onCancel}
      onOk={onSuccess}
      visible={visible}
      okText="Создать"
      okButtonProps={{
        disabled: !selectedUserId
      }}
    >
      <ScrollBar
        style={{
          height: 500
        }}
      >
        {users.map((user, index) => (
          <Card
            key={index}
            onClick={() => setSelectedUserId(user.id)}
            style={{
              cursor: "pointer",
              background: selectedUserId === user.id ? "#1890ff" : null
            }}
          >
            <Meta avatar={<Avatar src="" />} title={user.fullName} />
          </Card>
        ))}
      </ScrollBar>
    </Modal>
  );
};

export default memo(CreateChatModal);
