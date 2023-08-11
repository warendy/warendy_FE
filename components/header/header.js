import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userTokenState } from "../../recoil/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import styles from "./Header.module.css";
import { LogoutModal } from "../Modal";

const Header = () => {
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const [mounted, setMounted] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("userTokenState");
    setUserToken(null);
    setShowLogoutModal(true);

    router.push("/");

    setTimeout(() => {
      setShowLogoutModal(false);
    }, 3000);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <header className={styles.header}>
          <div className="inner">
            <div className={styles.headerTop}>
              <Link href="/my/my-page" className={styles.link}>
                마이페이지
              </Link>
              {userToken ? (
                <button
                  onClick={handleLogout}
                  className={styles.link + " resetBtn "}
                >
                  로그아웃
                </button>
              ) : (
                <Link href="/sign-in" className={styles.link}>
                  로그인
                </Link>
              )}
            </div>
            <div className={styles.headerMain}>
              <div className={styles.mainInner}>
                <h1 className={styles.mainLogo}>
                  <Link href="/" className={styles.logo}>
                    <Image
                      src="/images/logo.svg"
                      alt="Logo"
                      className={styles.img}
                      width={100}
                      height={70}
                    />
                  </Link>
                </h1>
                <div className={styles.gnbArea}>
                  <nav className={styles.gnb}>
                    <Link
                      href="/search/search"
                      className={`${styles.gnbItem} ${styles.link}`}
                    >
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className={styles.icon}
                      />
                    </Link>
                    <Link
                      href="/post"
                      className={`${styles.gnbItem} ${styles.link}`}
                    >
                      <FontAwesomeIcon
                        icon={faComment}
                        className={styles.icon}
                      />
                    </Link>
                  </nav>
                  <div className={styles.searchBtnBox}>
                    <Link
                      href="#"
                      className={`${styles.btnSearch} ${styles.link}`}
                    >
                      <FontAwesomeIcon
                        icon={faSearch}
                        className={styles.icon}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
      {showLogoutModal && <LogoutModal onConfirm={handleLogout} />}
    </>
  );
};

export default Header;
