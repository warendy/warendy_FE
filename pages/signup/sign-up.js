import styles from "./sign-up.module.css";

const SignIn = () => {
  return (
    <>
      <div className="container">
        <div className="inner top">
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
                    />
                  </div>
                  <p className={styles.error}>
                    이메일 주소를 정확히 입력해주세요.
                  </p>
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
                    />
                  </div>
                </div>
                <p className={styles.error}>
                  영문, 숫자, 특수문자를 조합해서 입력해주세요.
                </p>
              </div>
              <div className={styles.btnArea}>
                <button className={styles.btnSignup + " btn "}>
                  <span className={styles.text}>가입하기</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
