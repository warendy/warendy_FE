export const validateEmail = (inputValue) => {
  if (!inputValue) {
    return false;
  }

  const atIndex = inputValue.indexOf("@");
  const lastDotIndex = inputValue.lastIndexOf(".");

  if (
    atIndex !== -1 &&
    atIndex < lastDotIndex &&
    lastDotIndex < inputValue.length - 1
  ) {
    return true;
  }

  return false;
};

export const validatePassword = (inputValue) => {
  // 패스워드 유효성 검사 로직
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/; // 영문, 숫자 포함 6글자 이상
  return passwordRegex.test(inputValue);
};

export const validateNickname = (inputValue) => {
  return inputValue.length >= 3;
};
