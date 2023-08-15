import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./SignupForm.module.css";
import { postSignup } from "../../services/api";
import { ErrorModal } from "../Modal";
import {
  validateEmail,
  validatePassword,
  validateNickname,
} from "./FormValidation";

import InputForm from "./InputForm";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidNickname, setIsValidNickname] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  console.log(isFormValid);
  const [isAppropriate, setIsAppropriate] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValidEmail(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsValidPassword(validatePassword(value));
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    setIsValidNickname(validateNickname(value));
  };

  const handlePasswordConfirmChange = (e) => {
    const value = e.target.value;
    setPasswordConfirm(value);
  };

  useEffect(() => {
    setIsFormValid(isValidEmail && isValidPassword && isValidNickname);
  }, [isValidEmail, isValidPassword, isValidNickname]);

  const handleSignup = async (e) => {
    e.preventDefault();

    const signupInform = {
      email: email,
      password: password,
      nickname: nickname,
    };

    try {
      if (!isFormValid) {
        setShowErrorMessage(true);
        return;
      }
      setShowErrorMessage(false);
      const signupResponse = await postSignup(signupInform);
      console.log("Signup Response:", signupResponse);

      router.push("/sign-in");
    } catch (error) {
      console.error("Error fetching data:", error);
      setShowErrorMessage(true);
    }
  };

  useEffect(() => {
    let timer;
    if (!isAppropriate) {
      setShowErrorMessage(true);
      timer = setTimeout(() => {
        setShowErrorMessage(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isAppropriate]);

  return (
    <div className={styles.signupPage}>
      <h3 className={styles.pageTitle + " title "}>회원가입</h3>
      <div className={styles.contentArea}>
        <InputForm
          label="이메일 주소"
          type="email"
          value={email}
          onChange={handleEmailChange}
          isValid={isValidEmail}
          onBlur={() => setIsAppropriate(true)}
          errorMessage="이메일 주소를 정확히 입력해주세요."
          onClear={() => setEmail("")}
          email={email}
        />
        <InputForm
          label="비밀번호"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          isValid={isValidPassword}
          onBlur={() => setIsAppropriate(true)}
          errorMessage="영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)"
        />
        <InputForm
          label="비밀번호 확인"
          type="password"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          isValid={password === passwordConfirm}
          onBlur={() => setIsAppropriate(true)}
          errorMessage="비밀번호가 일치하지 않습니다."
        />
        <InputForm
          label="닉네임"
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          isValid={isValidNickname}
          onBlur={() => setIsAppropriate(true)}
          errorMessage="필수 입력 항목입니다. (3자 이상)"
        />
        {showErrorMessage && <ErrorModal />}
      </div>
      <div className={styles.btnArea}>
        <button
          type="submit"
          disabled={!isFormValid}
          onClick={handleSignup}
          className={`${styles.btn} ${styles.text} ${
            !isFormValid ? styles.unvalidate : styles.validate
          } btn outline`}
        >
          가입하기
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
