import AboutMe from "../components/About/AboutMe";
import Career from "../components/Career/Career";
import Intro from "../components/Intro/Intro";
import githubIcon from "../assets/images/git.png";
import mail from "../assets/images/mail.png";
import arrow from "../assets/images/arrow.png";

import styles from "./MainPage.module.css";
import Skills from "../components/Skills/Skills";
import Project from "../components/Projects/Project";

const MainPage = () => {
  const email = "ksjinn9545@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      alert("이메일이 복사되었습니다!");
    } catch (err) {
      console.log(err);
      alert("이메일 복사에 실패했습니다.");
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
      </div>

      <div className={styles.floatingButtons}>
        <button onClick={handleScrollToTop}>
          <img src={arrow} alt="arrow icon" width={20} height={15} />
        </button>
        <button>
          <a
            href="https://github.com/kimSojinn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubIcon} alt="GitHub logo" width={30} height={30} />
          </a>
        </button>
        <button onClick={handleCopyEmail}>
          <img src={mail} alt="mail icon" width={25} height={20} />
        </button>
      </div>
    </div>
  );
};

export default MainPage;
