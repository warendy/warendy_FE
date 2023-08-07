export const validateEmail = (inputValue) => {
  // 이메일 유효성 검사 로직
  if (inputValue) {
    return !(
      !inputValue.includes("@") ||
      !inputValue.includes(".", inputValue.indexOf("@")) ||
      inputValue.endsWith(".")
    );
  }
  return false;
};

export const validatePassword = (inputValue) => {
  // 패스워드 유효성 검사 로직
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/; // 영문, 숫자 포함 6글자 이상
  return regex.test(inputValue);
};
