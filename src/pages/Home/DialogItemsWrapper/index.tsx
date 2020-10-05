import React, { FC, memo, useCallback, useEffect, useState } from "react";
import ScrollBar from "react-custom-scrollbars";
import { SearchOutlined } from "@ant-design/icons";
import classNames from "classnames";

import Input from "primitives/Input/Input";
import Wrapper from "primitives/Wrapper";
import { ChatInterface } from "../../../types/types";

import styleModule from "./style.module.scss";

import { renderSortedDialogs } from "./tools";
import { filterChange } from "./filter";
import { debounce } from "lodash";
import { LeftColumnHeader } from "./LeftColumnHeader";
import { propEq } from "ramda";

const filterCallback = (field: string, matchField: string) => {
  const fieldLower = field.toLowerCase();
  const matchValue = matchField.toLowerCase();
  return fieldLower.includes(matchValue);
};

interface DialogItemsWrapperPropsInterface {
  chats: ChatInterface[];
  onSelectChat: (selectedChat: ChatInterface) => void;
}

const DialogItemsWrapper: FC<DialogItemsWrapperPropsInterface> = ({
  onSelectChat,
  chats
}) => {
  const [selectedDialogId, setSelectedDialogId] = useState<string>(null);

  useEffect(() => {
    const selectedChat = chats.find(propEq("chatId", selectedDialogId));

    if (!selectedChat) return undefined;
    onSelectChat(selectedChat);
  }, [selectedDialogId, chats, onSelectChat]);

  const [allDialogs, setAllDialogs] = useState([]);
  const [filteredDialogs, setFilteredDialogs] = useState([]);

  useEffect(() => {
    setAllDialogs(chats);
    setFilteredDialogs(chats);
  }, [chats]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode !== 27 || !selectedDialogId) return;

      setSelectedDialogId(null);
      onSelectChat(null);
    },
    [selectedDialogId, onSelectChat]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown, selectedDialogId]);

  const onChangeSearch = useCallback(
    (value: string) => {
      const filteredData = filterChange<ChatInterface, string>({
        array: allDialogs,
        pathToElem: ["user", "name"],
        matchField: value,
        filterCallback
      });

      setFilteredDialogs(filteredData);
    },
    [allDialogs, setFilteredDialogs]
  );

  const createNewChat = useCallback(() => {
    console.log("create chat at");
  }, []);

  return (
    <Wrapper className={classNames(styleModule.dialogItemsWrapper)}>
      <LeftColumnHeader onNewChat={createNewChat} />
      <Wrapper className={styleModule.leftColumn__inner}>
        <Wrapper className={styleModule.searchInput_Wrapper}>
          <Input
            prefix={<SearchOutlined className={styleModule.searchIcon} />}
            onChange={debounce(onChangeSearch, 500)}
            placeholder="Поиск среди контактов"
            className={styleModule.searchInput}
          />
        </Wrapper>

        <ScrollBar
          style={{
            paddingRight: 6,
            height: "calc(100% - 80px)"
          }}
          autoHide
          hideTracksWhenNotNeeded
        >
          {renderSortedDialogs({
            dialogItems: filteredDialogs,
            selectedDialogId,
            setSelectedDialogId
          })}
        </ScrollBar>
      </Wrapper>
    </Wrapper>
  );
};

export default memo(DialogItemsWrapper);
