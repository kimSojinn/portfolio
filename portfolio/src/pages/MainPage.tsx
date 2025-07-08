import { useState } from "react";
import AboutMe from "../components/About/AboutMe";
import Career from "../components/Career/Career";
import Intro from "../components/Intro/Intro";
import githubIcon from "../assets/images/git.png";
import mail from "../assets/images/mail.png";
import arrow from "../assets/images/arrow.png";
import Skills from "../components/Skills/Skills";
import Project from "../components/Projects/Project";
import Footer from "../components/Footer/Footer";

import styles from "./MainPage.module.css";

const MainPage = () => {
  const email = "ksjinn9545@gmail.com";
  const [copyMessage, setCopyMessage] = useState("");

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      alert("이메일이 복사되었습니다 :)");
      setCopyMessage("이메일이 복사되었습니다 :)");
      setTimeout(() => setCopyMessage(""), 3000);
    } catch (err) {
      console.log(err);
      setCopyMessage("이메일 복사에 실패했습니다.");
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.layout}>
      <div className={styles.introSection}>
        <Intro />
      </div>

      <div className={styles.scrollSections}>
        <AboutMe />
        <Career />
        <Project />
        <Skills />
        <Footer />
      </div>

      <div aria-live="polite">{copyMessage}</div>

      <div className={styles.floatingButtons}>
        <button
          onClick={handleScrollToTop}
          aria-label="맨 위로 이동"
          className={styles.iconButton}
        >
          <img
            src={arrow}
            className={styles.arrowIcon}
            alt=""
            aria-hidden="true"
            width={20}
            height={15}
          />
        </button>

        <a
          href="https://github.com/kimSojinn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub 페이지 새 창에서 열기"
          className={styles.iconButton}
        >
          <img
            src={githubIcon}
            className={styles.gitIcon}
            alt=""
            aria-hidden="true"
            width={30}
            height={30}
          />
        </a>

        <button
          onClick={handleCopyEmail}
          aria-label="이메일 주소 복사"
          className={styles.iconButton}
        >
          <img
            src={mail}
            className={styles.mailIcon}
            alt=""
            aria-hidden="true"
            width={25}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default MainPage;
