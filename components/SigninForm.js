import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import styles from "./SigninForm.module.css";

import { postLogin } from "../pages/services/api";
// import { validateEmail, validatePassword } from "./formValidation";
import Layout from "./layout/layout";
import { useSetRecoilState } from "recoil"; // Recoil의 useSetRecoilState를 임포트합니다.
import { myAtom } from "../recoil-persist-config"; // Atom을 정의한 파일을 임포트합니다.

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const setMyAtom = useSetRecoilState(myAtom);

  const validateEmail = (inputValue) => {
    // 폼의 유효성 검사
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    setIsButtonDisabled(!isEmailValid || !isPasswordValid);
  };
  // 백엔드 API 호출 함수 (예시)
  // const postLogin = async (loginData) => {
  //   try {
  //     const response = await fetch("/api/signin", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(loginData),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Login failed");
  //     }

  //     const data = await response.json();
  //     return data.token; // 로그인 토큰 반환
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     return null;
  //   }
  // };

  const handleLogin = async () => {
    const loginInform = {
      email: email,
      password: password,
    };

    try {
      // 폼의 유효성 검사
      // validateForm();

      // if (isButtonDisabled) {
      //   return; // 유효성 검사에 실패하면 로그인 처리를 하지 않음
      // }
      // 로그인 API 호출
      const loginResponse = await postLogin(loginInform);
      console.log("Login Response:", loginResponse);

      // 로그인 성공 시 Recoil Atom을 업데이트합니다.
      setMyAtom({
        email: email,
        token: loginResponse.token, // 로그인 응답에서 토큰을 가져와서 업데이트합니다.
      });

      // 로그인 처리 및 리다이렉션 등 추가 로직
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputFocus = () => {
    setIsButtonVisible(true);
  };

  const handleInputBlur = () => {
    setIsButtonVisible(false);
  };

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
              <div
                onMouseEnter={handleInputFocus}
                onMouseLeave={handleInputBlur}
                className={styles.inputArea}
              >
                <input
                  type="email"
                  placeholder="예) warend@warendy.co.kr"
                  className={styles.input + " input "}
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {isButtonVisible && (
                  <button type="button" className="input">
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className={styles.icon}
                    />
                  </button>
                )}
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
                  className="input"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <p className={styles.error}>
              영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자){" "}
            </p>
          </div>
          <div className={styles.btnArea}>
            <button
              onClick={handleLogin}
              className={styles.btnSignin + " btn "}
            >
              <span className={styles.text}>로그인</span>
            </button>
            <Link href="/sign-up" className={styles.btnSignup}>
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

export default SigninForm;
