import React, { FC, memo, useEffect, useRef, useState } from "react";
import { RouteProps } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../state/store";
import { getAllUsers, getCurrentUser } from "../../state/modules/user/actions";
import { getChats } from "../../state/modules/chats/actions";
import { Spin, Image } from "antd";

import fallBackImage from "assets/fallback.png";

import styles from "./style.module.scss";
import Button from "../../primitives/Button";

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
        <div>{userInfo?.fullName}</div>
        <div>{userInfo?.email}</div>
      </div>
    </div>
  );
};

export default memo(PersonPage);
