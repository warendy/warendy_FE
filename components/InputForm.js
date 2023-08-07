import React from "react";
import styles from "./InputForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { validateEmail, validatePassword } from "./FormValidation";

const InputForm = ({
  type,
  email,
  setEmail,
  password,
  setPassword,
  isValidEmail,
  setIsValidEmail,
  isValidPassword,
  setIsValidPassword,
  showAvatarInput,
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
    }
  };

  const handleClear = () => {
    setEmail("");
    setIsValidEmail(true);
  };

  const isFormValid = isValidEmail && isValidPassword;

  return (
    <>
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
        )}
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
      {showAvatarInput && (
        <div className="avatar">
          <h3
            className={`${styles.title} ${isValidPassword ? "" : styles.valid}`}
          >
            닉네임
          </h3>
          <input type="text" />
        </div>
      )}
      <div className={styles.btnArea}>
        <button
          type="submit"
          value="Submit Form"
          disabled={!isFormValid}
          onClick={onSubmit} // Use the onSubmit prop here to handle form submission
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
