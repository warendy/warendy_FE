import React, { useState } from "react";
import styles from "./InputForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {
  validateEmail,
  validatePassword,
  validateNickname,
} from "./FormValidation";

const InputForm = ({
  type,
  email,
  setEmail,
  password,
  setPassword,
  nickname,
  setNickname,
  passwordConfirm,
  setPasswordConfirm,
  isValidEmail,
  setIsValidEmail,
  isValidPassword,
  setIsValidPassword,
  isValidNickname,
  setIsValidNickname,
  onSubmit,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value.trim());
      setIsValidEmail(validateEmail(value));
    } else if (name === "password") {
      setPassword(value);
      setIsValidPassword(validatePassword(value));
    } else if (name === "passwordConfirm") {
      setPasswordConfirm(value);
      setIsValidNickname(validateNickname(value));
    } else if (name === "nickname") {
      setNickname(value);
    }
  };

  const handleClear = () => {
    setEmail("");
    setIsValidEmail(true);
  };

  const isFormValid =
    type === "signup"
      ? isValidEmail &&
        isValidPassword &&
        isValidNickname &&
        password === passwordConfirm
      : isValidEmail && isValidPassword;

  return (
    <>
      <div className={styles.email}>
        <h3 className={`${styles.title} ${isValidEmail ? "" : styles.valid}`}>
          이메일 주소
        </h3>
        <div
          className={`${styles.inputArea} ${
            isValidEmail ? "" : styles.inputValid
          }`}
        >
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
        )}
      </div>
      <div className={styles.password}>
        <h3
          className={`${styles.title} ${isValidPassword ? "" : styles.valid}`}
        >
          비밀번호
        </h3>
        <div
          className={`${styles.inputArea} ${
            isValidPassword ? "" : styles.inputValid
          }`}
        >
          <input
            type="password"
            name="password"
            autoComplete="off"
            value={password}
            onChange={handleInputChange}
            className={styles.input + " input "}
          />
        </div>
        {!isValidPassword && (
          <p className={styles.error}>
            영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자){" "}
          </p>
        )}
      </div>
      {type === "signup" && (
        <>
          <div className={styles.passwordConfirm}>
            <h3
              className={`${styles.title} ${
                password === passwordConfirm ? "" : styles.valid
              }`}
            >
              비밀번호 확인
            </h3>
            <div
              className={`${styles.inputArea} ${
                password === passwordConfirm ? "" : styles.inputValid
              }`}
            >
              <input
                type="password"
                name="passwordConfirm"
                autoComplete="off"
                value={passwordConfirm}
                onChange={handleInputChange}
                className={styles.input + " input "}
              />
            </div>
            {password !== passwordConfirm && (
              <p className={styles.error}>비밀번호가 일치하지 않습니다.</p>
            )}
          </div>
          <div className={styles.nickname}>
            <h3
              className={`${styles.title} ${
                isValidNickname ? "" : styles.valid
              }`}
            >
              닉네임
            </h3>
            <div
              className={`${styles.inputArea} ${
                isValidNickname ? "" : styles.inputValid
              }`}
            >
              <input
                type="text"
                name="nickname"
                autoComplete="off"
                value={nickname}
                onChange={handleInputChange}
                className={styles.input + " input "}
              />
            </div>
            {!isValidNickname && (
              <p className={styles.error}>필수 입력 항목입니다. (3자 이상) </p>
            )}
          </div>
        </>
      )}
      <div className={styles.btnArea}>
        <button
          type="submit"
          value="Submit Form"
          disabled={!isFormValid}
          onClick={onSubmit}
          className={`${styles.btn} ${styles.text} ${
            isFormValid ? styles.validate : styles.unvalidate
          } btn`}
        >
          {type === "signup" ? "가입하기" : "로그인"}
        </button>
      </div>
    </>
  );
};

export default InputForm;
