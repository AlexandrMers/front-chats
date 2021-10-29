import React, { memo, useEffect, useRef } from "react";
import { NavLink, RouteProps } from "react-router-dom";

import { BarsOutlined } from "@ant-design/icons";
import { Image, Spin } from "antd";

import { ROUTE_PATHS } from "../index";

import { useAppDispatch, useTypedSelector } from "state/store";
import {
  getAllUsers,
  getCurrentUser,
  uploadUserAvatar
} from "state/modules/user/actions";
import { getChats } from "state/modules/chats/actions";

import fallBackImage from "assets/fallback.png";

import Button from "primitives/Button";

import styles from "./style.module.scss";

interface PersonPagePropsInterface extends RouteProps {}

const PersonPage = (_: PersonPagePropsInterface) => {
  const { userInfo, isLoadingUserInfo, isLoadingUploadAvatar } =
    useTypedSelector((state) => ({
      userInfo: state?.userModule?.userInfo,
      isLoadingUserInfo: state?.userModule?.loading,
      isLoadingUploadAvatar: state?.userModule?.isAvatarUploadLoading
    }));

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
    const file = e.target.files[0];
    dispatch(uploadUserAvatar(file));
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
          />
          {isLoadingUploadAvatar && <Spin size="large" />}
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
            disabled={isLoadingUploadAvatar}
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
