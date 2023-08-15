import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./EditInfos.module.css";
import { getUserInfo, patchUserInfo } from "@/services/api";

const EditProfile = ({ userInfo, token }) => {
  const [newNickname, setNewNickname] = useState("");
  const [editingNickname, setEditingNickname] = useState(false);

  const handleNicknameUpdate = async () => {
    if (userInfo.nickname == newNickname) {
      alert("현재 닉네임과 동일합니다.");
      return;
    }

    try {
      const updateResponse = await patchUserInfo(token, {
        nickname: newNickname,
      });
      console.log(updateResponse);

      if (updateResponse.status === "success") {
        const closeAlert = alert(
          "닉네임 업데이트가 완료되었습니다. 누르면 페이지가 이동됩니다."
        );
        if (closeAlert) {
          router.push("/sign-in");
        }
      } else {
        alert("닉네임 업데이트 실패");
      }
    } catch (error) {
      return null;
    }
  };
  return (
    <div className={styles.editArea}>
      <h3 className={styles.title}>프로필 관리</h3>
      <div className={styles.userMembership}>
        <Image
          src="/images/profile.svg"
          alt="Logo"
          width={100}
          height={100}
          className={styles.userThumb}
        />
        <div className={styles.infoBox}>
          <strong className={styles.name}>{userInfo.nickname}</strong>
          <button
            onClick={() => handleNicknameUpdate()}
            type="button"
            className={styles.btn + " btn outline "}
          >
            이미지 변경
          </button>
          <button type="button" className="btn outline">
            삭제
          </button>
        </div>
      </div>
      <div className={styles.profileInfo}>
        <h4 className={styles.groupTitle}>프로필 정보</h4>
        <div className={styles.unit}>
          <h5 className={styles.unitTitle}>닉네임</h5>
          {editingNickname ? (
            <div className={styles.editTarget}>
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                placeholder="새로운 닉네임을 만들어보세요"
                className={styles.nickname + " input "}
              />
              <button
                onClick={handleNicknameUpdate}
                type="button"
                className={styles.btnModify + " btn outline "}
              >
                저장
              </button>
            </div>
          ) : (
            <div className={styles.editTarget}>
              <p className={styles.nickname}>{userInfo.nickname}</p>
              <button
                onClick={() => setEditingNickname(true)}
                type="button"
                className={styles.btnModify + " outline "}
              >
                변경
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
