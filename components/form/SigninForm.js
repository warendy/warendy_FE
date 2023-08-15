import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "./SigninForm.module.css";
import { userTokenState } from "../../recoil/atoms";
import { postLogin } from "../../services/api";
import InputForm from "./InputForm";
import { ErrorModal } from "../Modal";
import { useRecoilState } from "recoil";
import {
  emailState,
  passwordState,
  isValidEmailState,
  isValidPasswordState,
} from "@/recoil/input";
import { validateEmail, validatePassword } from "./FormValidation";

const SigninForm = () => {
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [isValidEmail, setIsValidEmail] = useRecoilState(isValidEmailState);
  const [isValidPassword, setIsValidPassword] =
    useRecoilState(isValidPasswordState);

  const [isFormValid, setIsFormValid] = useState(false);
  const [isAppropriate, setIsAppropriate] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [token, setToken] = useRecoilState(userTokenState);
  const router = useRouter();

  const handleLogin = async () => {
    const loginInfo = {
      email: email,
      password: password,
    };

    try {
      setIsAppropriate(true);

      if (!isFormValid) {
        setShowErrorMessage(true);
        return;
      }

      const loginResponse = await postLogin(loginInfo);
      console.log("Login Response:", loginResponse);

      setToken(loginResponse);
      sessionStorage.setItem("userTokenState", loginResponse);

      router.push("/");
    } catch (error) {
      setIsAppropriate(false);
      console.error("Error fetching data:", error);
      setShowErrorMessage(true);
    }
  };

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

  useEffect(() => {
    setIsFormValid(isValidEmail && isValidPassword);
  }, [isValidEmail, isValidPassword]);

  return (
    <div className={styles.signinPage}>
      <Image
        src="/images/logo.svg"
        alt="Logo"
        className={styles.logo}
        width={150}
        height={50}
      />
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
        />
        <InputForm
          label="비밀번호"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          isValid={isValidPassword}
          onBlur={() => setIsAppropriate(true)}
          errorMessage="영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)"
          onClear={() => setPassword("")}
        />
        {showErrorMessage && <ErrorModal />}
      </div>
      <div className={styles.btnArea}>
        <button
          type="submit"
          disabled={!isFormValid}
          onClick={handleLogin}
          className={`${styles.btn} ${
            isFormValid ? styles.validate : styles.unvalidate
          } btn outline`}
        >
          로그인하기
        </button>
      </div>
      <Link href="/sign-up" className={styles.btnSignup}>
        이메일 가입
      </Link>
      {/* <button className={`${styles.btnSocial} ${styles.kakao} btn`}>
        <Image
          src="/images/kakao.svg"
          alt="Logo"
          className={styles.social}
          width={30}
          height={30}
        />
        카카오톡으로 로그인
      </button> */}
    </div>
  );
};

export default SigninForm;
