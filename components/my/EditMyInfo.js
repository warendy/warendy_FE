import React, { useState, useEffect } from "react";
import styles from "./MyInfo.module.css";
import { getUserInfo, patchUserInfo } from "@/services/api";
import CurrentPassword from "./CurrentPassword";

const EditMyInfo = ({ token }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const renderEmail = () => {
    return <p className={styles.content}>{email}</p>;
  };

  const emailContent = renderEmail();

  return (
    <div className={styles.myInfoArea}>
      <h3 className={styles.title}>로그인 정보</h3>
      <div className={styles.profileInfo}>
        <div className={styles.profileGroup}>
          <h4 className={styles.groupTitle}>내 계정</h4>
          <div className={styles.unit}>
            <h5 className={styles.unitTitle}>이메일 주소</h5>
            <div className={styles.unitContent}>
              <p className={styles.emailContent}>{emailContent}</p>
            </div>
          </div>
          <div className={styles.unit}>
            <h5 className={styles.unitTitle}>비밀번호</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMyInfo;
