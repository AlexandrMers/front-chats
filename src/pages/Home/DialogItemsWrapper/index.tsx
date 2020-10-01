import React, { FC, memo, useCallback, useEffect, useState } from "react";
import ScrollBar from "react-custom-scrollbars";
import { SearchOutlined } from "@ant-design/icons";
import classNames from "classnames";

import styleModule from "./style.module.scss";
import Wrapper from "primitives/Wrapper";
import { renderSortedDialogs } from "./tools";
import Input from "primitives/Input/Input";
import { hasPath, path } from "ramda";
import { fakeData } from "./fakeData";

const DialogItemsWrapper: FC<any> = () => {
  const [selectedDialogId, setSelectedDialogId] = useState<string>(null);

  const [dialogs, setDialogs] = useState([]);

  useEffect(() => {
    setDialogs(fakeData);
  }, []);

  const onChangeSearch = useCallback(
    (value) => {
      // if (isEmpty(value)) {
      //   setDialogs(fakeData);
      //   return;
      // }

      const filteredData = filterChange({
        array: dialogs,
        pathToElem: ["user", "name"],
        matchField: value
      });

      setDialogs(filteredData);
    },
    [dialogs, setDialogs, filterChange]
  );

  function filterChange<T>({
    pathToElem,
    array,
    matchField
  }: {
    pathToElem: string[];
    array: T[];
    matchField: string;
  }) {
    return array.filter((elem) => {
      if (hasPath(pathToElem, elem)) {
        return path<string>(pathToElem, elem).includes(matchField);
      }

      console.error("Указанный путь в функции фильтра не существует");
      return false;
    });
  }

  return (
    <Wrapper className={classNames(styleModule.dialogItemsWrapper)}>
      <Wrapper className={styleModule.searchInput_Wrapper}>
        <Input
          prefix={<SearchOutlined className={styleModule.searchIcon} />}
          onChange={onChangeSearch}
          placeholder="Поиск среди контактов"
          className={styleModule.searchInput}
        />
      </Wrapper>

      <ScrollBar
        style={{
          paddingRight: 6,
          height: "calc(100% - 68px)"
        }}
        autoHide
        hideTracksWhenNotNeeded
      >
        {renderSortedDialogs({
          dialogItems: dialogs,
          selectedDialogId,
          setSelectedDialogId
        })}
      </ScrollBar>
    </Wrapper>
  );
};

export default memo(DialogItemsWrapper);
