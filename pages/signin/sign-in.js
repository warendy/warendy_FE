import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import styles from "./sign-in.module.css";

import Layout from "../../components/layout/layout";

const SignIn = () => {
  return (
    <Layout>
      <Image
        src="/images/logo.svg"
        alt="Logo"
        className={styles.logo}
        width={250}
        height={50}
      />
      <div className={styles.contentArea + " inner "}>
        <div className={styles.inputInfo}>
          <div className={styles.email}>
            <h3 className={styles.title}>이메일 주소</h3>
            <div>
              <div className={styles.inputArea}>
                <input
                  type="email"
                  placeholder="예) ozik@ozik.co.kr"
                  className={styles.input + " input "}
                  autoComplete="off"
                />
                <button type="button" className="input">
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className={styles.icon}
                  />
                </button>
              </div>
              <p className={styles.error}>이메일 주소를 정확히 입력해주세요.</p>
            </div>
          </div>
          <div className={styles.password}>
            <h3 className={styles.title}>비밀번호</h3>
            <div>
              <div className={styles.inputArea}>
                <input type="password" className="input" autoComplete="off" />
              </div>
            </div>
            <p className={styles.error}>
              영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자){" "}
            </p>
          </div>
          <div className={styles.btnArea}>
            <button className={styles.btnSignin + " btn "}>
              <span className={styles.text}>로그인</span>
            </button>
            <Link href="/signup/sign-up" className={styles.btnSignup}>
              이메일 가입
            </Link>
            <button className={styles.btnSocial + " btn "}>
              <Image
                src="/images/kakao.svg"
                alt="Logo"
                className={styles.social}
                width={30}
                height={30}
              />
              <span className={styles.kakao}>카카오톡으로 로그인</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
