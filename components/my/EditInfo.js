import React, { useState } from "react";
import { useRouter } from "next/router";
import { patchUserInfo } from "@/services/api";
import styles from "./EditInfos.module.css";

const EditInfo = ({ userInfo, token }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter;

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      alert("새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const updateResponse = await patchUserInfo(token, {
        password: newPassword,
      });
      console.log(updateResponse);

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

  return (
    <div className={styles.editArea}>
      <h3 className={styles.title}>로그인 정보</h3>
      <div className={styles.profileInfo}>
        <h4 className={styles.groupTitle}>내 계정</h4>
        <div className={styles.unit}>
          <h5 className={styles.unitTitle}>이메일 주소</h5>
          <p className={styles.content}>{userInfo.email}</p>
        </div>
        <div className={styles.unit}>
          <h5 className={styles.unitTitle}>비밀번호</h5>
          <div className={styles.editTarget}>
            <input
              type="text"
              placeholder="새로운 비밀번호를 입력해주세요"
              className={styles.password + " input "}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.unit}>
          <h5 className={styles.unitTitle}>비밀번호 확인</h5>
          <div className={styles.editTarget}>
            <input
              type="text"
              placeholder="동일한 비밀번호를 입력해주세요"
              className={styles.password + " input "}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
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
