import React, { memo } from "react";

import { LogoutOutlined } from "@ant-design/icons/lib/icons";
import Typography from "antd/lib/typography";
import { NavLink } from "react-router-dom";

import { ROUTE_PATHS } from "../../index";

import Button from "../../../primitives/Button";

import styles from "./styles.module.scss";

function HomeHeader({
  id,
  name,
  onLogout
}: {
  id: string;
  name: string;
  onLogout: () => void;
}) {
  return (
    <div className={styles.homeHeaderWrapper}>
      {name && (
        <Typography className={styles.homeHeaderWrapper__Title}>
          {name}
        </Typography>
      )}

      <NavLink to={`${ROUTE_PATHS.PERSON}:${id}`}>Моя страница</NavLink>

      <Button
        className={styles.homeHeaderWrapper__LogoutButton}
        icon={<LogoutOutlined />}
        onClick={onLogout}
      >
        Выйти
      </Button>
    </div>
  );
}

export default memo(HomeHeader);
