import { useState, useEffect } from "react";
import styles from "./profile.module.css";

const Profile = () => {
  const [isPasswordEditable, setPasswordEditable] = useState(false);
  const [password, setPassword] = useState("*****"); // Initial password value (you can fetch it from the backend)
  const [email, setEmail] = useState(""); // New state to store email address

  useEffect(() => {
    // Fetch the email address from the backend API and update the 'email' state
    // For demonstration purposes, let's set a dummy email address here
    // In a real application, you would make an actual API call to the backend
    // and update the 'email' state with the fetched value
    setEmail("waren@warendy.com");
  }, []);

  const handlePasswordEditToggle = () => {
    setPasswordEditable((prev) => !prev);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSavePassword = () => {
    // Here, you can handle the API call to save the modified password
    // For example, you can send the 'password' state to the backend and update the password in the database
    // After the successful API call, you can set isPasswordEditable back to false
    setPasswordEditable(false);
  };

  const renderEmail = () => {
    return <p className={styles.content}>{email}</p>;
  };

  const emailContent = renderEmail(); // Store the email content in a variable

  const renderPasswordInput = () => {
    return (
      <>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className={styles.passwordInput + " outline "}
        />
        <button
          className={styles.btnModify + " outline "}
          onClick={handleSavePassword}
        >
          저장
        </button>
      </>
    );
  };

  const renderPasswordDisplay = () => {
    return (
      <>
        <p className={styles.content}>{password}</p>
        <button
          className={styles.btnModify + " outline "}
          onClick={handlePasswordEditToggle}
        >
          변경
        </button>
      </>
    );
  };

  return (
    <div className={styles.profile}>
      <h3 className={styles.title}>로그인 정보</h3>
      <div className={styles.profileInfo}>
        <div className={styles.profileGroup}>
          <h4 className={styles.groupTitle}>내 계정</h4>
          <div className={styles.unit}>
            <h5 className={styles.unitTitle}>이메일 주소</h5>
            <div className={styles.unitContent}>
              <p className={styles.emailContent}>{emailContent}</p>
            </div>
          </div>
          <div className={styles.unit}>
            <h5 className={styles.unitTitle}>비밀번호</h5>
            <div className={styles.unitContent}>
              {isPasswordEditable
                ? renderPasswordInput()
                : renderPasswordDisplay()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
