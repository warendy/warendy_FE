import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./InputForm.module.css";
import { postSignup } from "../pages/services/api";
import InputForm from "./InputForm";
import Modal from "./Modal";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidNickname, setIsValidNickname] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isAppropriate, setIsAppropriate] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showNicknameInput, setshowNicknameInput] = useState(false);

  const router = useRouter();

  const handleSignup = async () => {
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

  useEffect(() => {
    setIsFormValid(isValidEmail && isValidPassword && isValidNickname);
  }, [isValidEmail, isValidPassword, isValidNickname]);

  return (
    <>
      <h3 className={styles.mainTitle + " title "}>회원가입</h3>
      <div className={styles.contentArea}>
        <InputForm
          type="signup"
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          nickname={nickname}
          setNickname={setNickname}
          isValidEmail={isValidEmail}
          setIsValidEmail={setIsValidEmail}
          isValidPassword={isValidPassword}
          setIsValidPassword={setIsValidPassword}
          isValidNickname={isValidNickname}
          setIsValidNickname={setIsValidNickname}
          showNicknameInput={showNicknameInput}
          onSubmit={handleSignup}
        />
        {showErrorMessage && <Modal />}
      </div>
    </>
  );
};

export default SignupForm;
