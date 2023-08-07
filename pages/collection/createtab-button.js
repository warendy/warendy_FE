import React from "react";
import Swal from "sweetalert2";

const CreateTabButton = ({ onCreateTab }) => {
  const handleCreateTab = () => {
    Swal.fire({
      title: "나만의 와인 컬렉션 만들기",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      cancelButtonText: "취소",
      showCancelButton: true,
      confirmButtonText: "생성",
      showLoaderOnConfirm: true,
      preConfirm: (title) => {
        const newTabName = title.trim();
        if (!newTabName) {
          Swal.showValidationMessage("컬렉션 이름을 입력해주세요");
        } else {
          onCreateTab(newTabName);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <button onClick={handleCreateTab} className="btn outline">
      컬렉션 추가하기
    </button>
  );
};

export default CreateTabButton;
