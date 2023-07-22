import styles from "./footer.module.css";

export default function footer() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.center}>
        <div className={styles.footerbox}>
          <div className={styles.copyright}>
            Copyright © 2023 Warendy Inc. All rights reserved.
          </div>
          <div className={styles.policy}>
            Privacy Policy | Terms of Use | Legal{" "}
          </div>
          <div className={styles.republic}>Republic of Korea</div>
        </div>
      </div>
    </div>
  );
}
