import React, { FC, memo } from "react";
import { Typography } from "antd";

import Avatar from "primitives/Avatar";

const DialogItem: FC<any> = () => {
  return (
    <div className="dialogItem">
      <Avatar
        size={40}
        avatar="https://live.staticflickr.com/65535/50339368162_ddc568be3e_c.jpg"
        name="Светлана"
      />
      <div className="dialogItem__content">
        <header className="dialogItem__header">
          <Typography.Title level={5}>Светлана</Typography.Title>
          <time>Сейчас</time>
        </header>

        <section className="dialogItem__msgInfo">
          <Typography.Paragraph ellipsis>
            Текст последнего сообщения...
          </Typography.Paragraph>
          <div className="dialogItem__counter">3</div>
        </section>
      </div>
    </div>
  );
};

export default memo(DialogItem);
