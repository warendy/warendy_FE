import React, { useState } from "react";
import { useRouter } from "next/router";
import { patchUserInfo } from "@/services/api";
import styles from "./EditInfos.module.css";
import { validatePassword } from "../form/FormValidation";

const EditInfo = ({ userInfo, token }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // New state for confirmation error

  const router = useRouter;

  const validatePasswordInput = (value) => {
    if (!validatePassword(value)) {
      return "비밀번호는 영문자와 숫자를 포함한 6자 이상이어야 합니다.";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
    const passwordErrorMsg = validatePasswordInput(newPasswordValue);
    setPasswordError(passwordErrorMsg);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    const confirmPasswordErrorMsg =
      newPassword === confirmPasswordValue
        ? ""
        : "비밀번호가 일치하지 않습니다.";
    setConfirmPasswordError(confirmPasswordErrorMsg);
  };

  const handlePasswordUpdate = async () => {
    if (passwordError || confirmPasswordError) {
      return;
    }

    try {
      const updateResponse = await patchUserInfo(token, {
        password: newPassword,
      });

      if (updateResponse.status === "success") {
        const closeAlert = alert(
          "비밀번호 업데이트가 완료되었습니다. 누르면 페이지가 이동됩니다."
        );
        if (closeAlert) {
          router.push("/sign-in");
        }
      } else {
        alert("비밀번호 업데이트 실패");
      }
    } catch (error) {
      return null;
    }
  };

  const passwordHasError = passwordError;
  const confirmHasError = confirmPasswordError;
  return (
    <div className={styles.editArea}>
      <h3 className={styles.title}>로그인 정보</h3>
      <div className={styles.profileInfo}>
        <h4 className={styles.groupTitle}>내 계정</h4>
        <div className={styles.unit}>
          <h5 className={styles.unitTitle}>이메일 주소</h5>
          <p className={styles.content}>{userInfo.email}</p>
        </div>
        <div className={`${styles.unit} ${styles.confirmUnit}`}>
          <h5
            className={`${styles.unitTitle} ${
              passwordHasError ? styles.errorTitle : ""
            }`}
          >
            비밀번호
          </h5>
          <div className={styles.editPassword}>
            <input
              type="text"
              placeholder="새로운 비밀번호를 입력해주세요"
              className={styles.password + " input "}
              value={newPassword}
              onChange={handlePasswordChange}
            />
            {passwordError && <p className={styles.error}>{passwordError}</p>}
          </div>
        </div>
        <div className={`${styles.unit} ${styles.confirmUnit}`}>
          <h5
            className={`${styles.unitTitle} ${
              confirmHasError ? styles.errorTitle : ""
            }`}
          >
            비밀번호 확인
          </h5>
          <div className={styles.editPassword}>
            <input
              type="text"
              placeholder="동일한 비밀번호를 입력해주세요"
              className={styles.password + " input "}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {confirmPasswordError && (
              <p className={styles.error}>{confirmPasswordError}</p>
            )}
          </div>
        </div>
        <button
          type="button"
          className={styles.btnSave + " btn outline "}
          onClick={handlePasswordUpdate}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default EditInfo;
