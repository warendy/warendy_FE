import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userTokenState } from "@/recoil/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faSearch,
  faPaste,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./header.module.css";
import { LogoutModal } from "../Modal";
import { searchBarState, slideState } from "@/recoil/searchbar";

const Header = () => {
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  console.log(userToken);
  const [mounted, setMounted] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();
  const setSearchBarState = useSetRecoilState(searchBarState);
  const setAnimationClass = useSetRecoilState(slideState);

  const changeState = (e) => {
    e.preventDefault();
    setSearchBarState(true);
    setAnimationClass("slidein");
  };

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
                      href="../post/post"
                      className={`${styles.gnbItem} ${styles.link}`}
                    >
                      <FontAwesomeIcon icon={faPaste} className={styles.icon} />
                    </Link>
                  </nav>
                  <div className={styles.searchBtnBox}>
                    <Link
                      href="#"
                      className={`${styles.btnSearch} ${styles.link}`}
                      onClick={changeState}
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
