import React from "react";
import styles from "./InputForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const InputForm = (props) => {
  const {
    label,
    type,
    value,
    onChange,
    isValid,
    onBlur,
    errorMessage,
    onClear,
    email,
  } = props;

  const showClearButton = email && email !== "";

  return (
    <div className={styles.inputContainer}>
      <h3 className={`${styles.title} ${isValid ? "" : styles.unvalid}`}>
        {label}
      </h3>
      <div
        className={`${styles.inputArea} ${isValid ? "" : styles.inputValid}`}
      >
        <input
          type={type}
          name={label}
          autoComplete="off"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`${styles.input} input`}
        />
        {showClearButton && (
          <button type="button" className="input" onClick={onClear}>
            <FontAwesomeIcon icon={faCircleXmark} className={styles.icon} />
          </button>
        )}
      </div>
      {!isValid && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};

export default InputForm;
