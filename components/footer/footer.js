import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className="inner">
      <div className={styles.footerBox}>
        <div>Copyright © 2023 Warendy Inc. All rights reserved.</div>
        <div className={styles.policy}>Privacy Policy | Terms of Use | Legal </div>
        <div>Republic of Korea</div>
      </div>
    </div>
  );
};

export default Footer;
