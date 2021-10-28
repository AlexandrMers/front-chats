import React, { memo, useEffect, useRef, useState } from "react";
import { NavLink, RouteProps } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../state/store";
import { getAllUsers, getCurrentUser } from "../../state/modules/user/actions";
import { getChats } from "../../state/modules/chats/actions";
import { Image, Spin } from "antd";

import fallBackImage from "assets/fallback.png";

import styles from "./style.module.scss";
import Button from "../../primitives/Button";
import { BarsOutlined } from "@ant-design/icons";
import { ROUTE_PATHS } from "../index";

interface PersonPagePropsInterface extends RouteProps {}

const PersonPage = (props: PersonPagePropsInterface) => {
  const { userInfo, isLoadingUserInfo } = useTypedSelector((state) => ({
    userInfo: state?.userModule?.userInfo,
    isLoadingUserInfo: state?.userModule?.loading
  }));

  const [loadingAvatar, setLoadingAvatar] = useState(false);

  const dispatch = useAppDispatch();

  const getAllData = async () => {
    await dispatch(getCurrentUser());
    await dispatch(getAllUsers());
    await dispatch(getChats());
  };

  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    getAllData();
  }, []);

  const handleClickButton = () => {
    if (!inputRef?.current) return;
    inputRef.current.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingAvatar(true);
    const file = e.target.files[0];
    console.log("file -> ", file);
  };

  if (isLoadingUserInfo) {
    return <Spin />;
  }

  return (
    <div className={styles.personPage}>
      <NavLink to={ROUTE_PATHS.HOME}>
        <BarsOutlined className={styles.personPage__backButton} />
      </NavLink>
      <div className={styles.personPage__content}>
        <div className={styles.personPage__blockImage}>
          <Image
            width={200}
            height={200}
            src={userInfo?.avatar ?? "error"}
            fallback={fallBackImage}
            loading="lazy"
            onLoad={() => {
              setLoadingAvatar(false);
            }}
          />
          {loadingAvatar && <Spin size="large" />}
          <input
            className={styles.personPage__input}
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onFileChange}
          />
          <Button
            className={styles.personPage__buttonChange}
            onClick={handleClickButton}
          >
            Изменить аватар
          </Button>
        </div>
        <div className={styles.personPage__blockInfo}>
          <div>
            <b>Имя:</b> {userInfo?.fullName}
          </div>
          <div>
            <b>E-mail:</b> {userInfo?.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PersonPage);
