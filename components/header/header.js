import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faComment,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.topInner}>
            <ul className={styles.topList}>
              <li className={styles.topItem}>
                <Link href="/myPage" className={styles.link}>
                  마이페이지
                </Link>
              </li>
              <li className={styles.topItem}>
                <Link href="/login" className={styles.link}>
                  로그인
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.headerMain}>
          <div className={styles.mainInner}>
            <h1>
              <Link href="/" className={styles.logo}>
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  className={styles.img}
                  width={100}
                  height={100}
                />
              </Link>
            </h1>
            <div className={styles.iconList}>
              <div className={styles.gnbArea}>
                <nav className={styles.gnb}>
                  <div className={styles.gnbList}>
                    <Link
                      href="/wineBar"
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
                  </div>
                </nav>
                <div className={styles.searchBtnBox}>
                  <Link
                    href="#"
                    className={`${styles.btnSearch} ${styles.link}`}
                  >
                    <FontAwesomeIcon icon={faSearch} className={styles.icon} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
