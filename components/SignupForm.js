import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./InputForm.module.css";
import { postSignup } from "../pages/services/api";
import InputForm from "./InputForm";
import Modal from "./Modal";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isAppropriate, setIsAppropriate] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showAvatarInput, setShowAvatarInput] = useState(false);

  const router = useRouter();

  const handleSignup = async () => {
    const signupInform = {
      email: email,
      password: password,
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
    setIsFormValid(isValidEmail && isValidPassword);
  }, [isValidEmail, isValidPassword]);

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
          isValidEmail={isValidEmail}
          setIsValidEmail={setIsValidEmail}
          isValidPassword={isValidPassword}
          setIsValidPassword={setIsValidPassword}
          showAvaterInput={showAvatarInput}
          onSubmit={handleSignup}
        />
        {showErrorMessage && <Modal />}
      </div>
    </>
  );
};

export default SignupForm;

{
  /* <h3 className={styles.mainTitle + " title "}>회원가입</h3>
<div className={styles.contentArea}>
  <div className={styles.email}>
    <h3 className={`${styles.title} ${isValidEmail ? "" : styles.valid}`}>
      이메일 주소
    </h3>
    <div className={styles.inputArea}>
      <input
        type="email"
        name="email"
        placeholder="예) warend@warendy.co.kr"
        autoComplete="off"
        value={email}
        onChange={handleInputChange}
        className={styles.input + " input "}
      />
      {email && (
        <button type="button" className="input" onClick={handleClear}>
          <FontAwesomeIcon icon={faCircleXmark} className={styles.icon} />
        </button>
      )}
    </div>
    {!isValidEmail && (
      <p className={styles.error}>이메일 주소를 정확히 입력해주세요.</p>
    )}{" "}
  </div>
  <div className={styles.password}>
    <h3
      className={`${styles.title} ${isValidPassword ? "" : styles.valid}`}
    >
      비밀번호
    </h3>
    <div>
      <div className={styles.inputArea}>
        <input
          type="password"
          name="password"
          autoComplete="off"
          value={password}
          onChange={handleInputChange}
          className="input"
        />
      </div>
    </div>
    {!isValidPassword && (
      <p className={styles.error}>
        영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자){" "}
      </p>
    )}
  </div>
  <div className={styles.btnArea}>
    <button
      type="submit"
      value="Submit Form"
      disabled={!isFormValid}
      onClick={handleSignup}
      className={`${styles.btn} ${styles.text} ${
        isFormValid ? styles.unvalidate : styles.validate
      } btn`}
    >
      가입하기
    </button>
  </div>
</div> */
}
