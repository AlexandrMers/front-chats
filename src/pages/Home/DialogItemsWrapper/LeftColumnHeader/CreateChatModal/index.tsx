import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { Avatar, Card, Modal, Spin, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import ScrollBar from "react-custom-scrollbars";
import { shallowEqual } from "react-redux";

import {
  AlignItemsTypes,
  FlexTypes,
  JustifyContentTypes
} from "../../../../../primitives/FlexContainer/types";
import FlexContainer from "primitives/FlexContainer";

import style from "./style.module.scss";

import { CreateChatModalInterface } from "./types";
import { useAppDispatch, useTypedSelector } from "../../../../../state/store";
import { getAllUsers } from "../../../../../state/modules/user/actions";
import { selectUsersForCreateChat } from "./selectors";
import { createNewChat } from "../../../../../state/modules/chats/actions";

const CreateChatModal: FC<CreateChatModalInterface> = ({
  visible,
  onCancel,
  onSuccess
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string>(null);

  const dispatch = useAppDispatch();

  const { users, usersLoading, loadingCreateChat } = useTypedSelector(
    (state) => ({
      users: selectUsersForCreateChat(state),
      usersLoading: state.userModule.allUsersLoading,
      loadingCreateChat: state.chatModule.createChatLoading
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const createChat = useCallback(() => {
    if (!selectedUserId) return;

    dispatch(createNewChat(selectedUserId)).then(() => {
      onSuccess();
    });
  }, [dispatch, onSuccess, selectedUserId]);

  return (
    <Modal
      title="Создать новый чат"
      confirmLoading={loadingCreateChat}
      onCancel={onCancel}
      onOk={createChat}
      visible={visible}
      okText="Создать"
      cancelText="Отмена"
      okButtonProps={{
        disabled: !selectedUserId
      }}
    >
      <ScrollBar
        style={{
          height: 500
        }}
      >
        {usersLoading ? (
          <FlexContainer
            className={style.cmpCreateModal__loaderWrapper}
            flexType={FlexTypes.FLEX}
            jc={JustifyContentTypes.CENTER}
            ai={AlignItemsTypes.CENTER}
          >
            <Spin tip="Загрузка..." />
          </FlexContainer>
        ) : users.length > 0 ? (
          users.map((user, index) => (
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
          ))
        ) : (
          <FlexContainer
            className={style.cmpCreateModal__loaderWrapper}
            flexType={FlexTypes.FLEX}
            jc={JustifyContentTypes.CENTER}
            ai={AlignItemsTypes.CENTER}
          >
            <Typography>
              Нет пользователей в системе, с которыми можно создать диалог
            </Typography>
          </FlexContainer>
        )}
      </ScrollBar>
    </Modal>
  );
};

export default memo(CreateChatModal);
