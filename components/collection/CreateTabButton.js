import React from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./Collection.module.css";

const CreateTabButton = ({ onCreateTab }) => {
  const handleCreateTab = async () => {
    const { value: title } = await Swal.fire({
      title: "나만의 와인 컬렉션 만들기",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      cancelButtonText: "취소",
      showCancelButton: true,
      confirmButtonText: "생성",
      showLoaderOnConfirm: true,
      inputValidator: (value) => {
        if (!value.trim()) {
          return "컬렉션 이름을 입력해주세요";
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (title) {
      onCreateTab(title);
    }
  };

  return (
    <>
      <button
        onClick={handleCreateTab}
        className={styles.createBtn + " resetBtn "}
      >
        <FontAwesomeIcon icon={faCirclePlus} className={styles.icon} />
      </button>
    </>
  );
};

export default CreateTabButton;
