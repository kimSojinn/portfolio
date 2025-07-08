import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer} aria-labelledby="footer-heading">
      <div className={styles.footerInner}>
        <h2 id="footer-heading" className={styles.visuallyHidden}>
          감사 인사
        </h2>

        <div className={styles.visualHeading} aria-hidden="true">
          Thank You
        </div>

        <p className={styles.message}>감사합니다 :)</p>

        <p className={styles.description}>
          모든 사용자가 동등하게 접근할 수 있는, 장벽 없는 웹 환경을 만들어가고
          싶습니다.
        </p>

        <p className={styles.copyright}>
          © 2025 Kim Sojin. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
