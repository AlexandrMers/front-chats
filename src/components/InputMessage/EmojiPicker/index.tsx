import React, { memo, useCallback, useState } from "react";
import classNames from "classnames";
import { Picker, BaseEmoji } from "emoji-mart";
import { SmileOutlined } from "@ant-design/icons";

import ClickOutside from "primitives/ClickOutside";

import "emoji-mart/css/emoji-mart.css";

import style from "./style.module.scss";

interface EmojiPickerInterface {
  className: string;
  addEmojiHandler: (emoji: BaseEmoji) => void;
}

const EmojiPicker = ({ className, addEmojiHandler }: EmojiPickerInterface) => {
  const [isShowPicker, setIsShowPicker] = useState(false);

  const toggleShowPicker = useCallback(() => {
    setIsShowPicker((prevIsShow) => !prevIsShow);
  }, [setIsShowPicker]);

  return (
    <ClickOutside handleClickOut={() => setIsShowPicker(false)}>
      <div className={classNames(style.emojiPicker, className)}>
        <SmileOutlined onClick={toggleShowPicker} />
        {isShowPicker && (
          <Picker
            set="apple"
            onSelect={addEmojiHandler}
            style={{
              position: "absolute",
              bottom: 50,
              left: 0,
              zIndex: 1
            }}
          />
        )}
      </div>
    </ClickOutside>
  );
};

export default memo(EmojiPicker);
