import React, { useState } from "react";
import styles from "./SignupForm.module.css";
import Layout from "./layout/layout";
import { postSignup } from "../pages/services/api";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 회원 가입 버튼 클릭 이벤트 핸들러
  const handleSignup = async () => {
    const signupInform = {
      email: email,
      password: password,
    };

    try {
      // 회원 가입 API 호출
      const signupResponse = await postSignup(signupInform);
      console.log("Signup Response:", signupResponse);

      // 회원 가입 처리 및 리다이렉션 등 추가 로직
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Layout>
      <h3 className={styles.mainTitle + " title "}>회원가입</h3>
      <div className={styles.contentArea + " inner "}>
        <div className={styles.inputInfo}>
          <div className={styles.email}>
            <h3 className={styles.title}>이메일 주소</h3>
            <div>
              <div className={styles.inputArea}>
                <input
                  type="email"
                  placeholder="예) waren@warendy.com"
                  className={styles.input + " input "}
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <p className={styles.error}>이메일 주소를 정확히 입력해주세요.</p>
            </div>
          </div>
          <div className={styles.password}>
            <h3 className={styles.title}>비밀번호</h3>
            <div>
              <div className={styles.inputArea}>
                <input
                  type="password"
                  placeholder="영문, 숫자, 특수문자 조합 8-16자"
                  className={styles.input + " input "}
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <p className={styles.error}>
              영문, 숫자, 특수문자를 조합해서 입력해주세요.
            </p>
          </div>
          <div className={styles.btnArea}>
            <button
              onClick={handleSignup}
              className={styles.btnSignup + " btn "}
            >
              <span className={styles.text}>가입하기</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignupForm;
