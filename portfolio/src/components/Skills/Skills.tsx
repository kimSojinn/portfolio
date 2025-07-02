import html from "../../assets/images/html.png";
import css from "../../assets/images/css.png";
import js from "../../assets/images/js.png";
import react from "../../assets/images/react.png";
import ts from "../../assets/images/ts.png";
import gitLogo from "../../assets/images/gitLogo.png";
import figma from "../../assets/images/figma.png";
import slack from "../../assets/images/slack.png";

import styles from "./Skills.module.css";

const Skills = () => {
  return (
    <section className={styles.skillsSection} aria-labelledby="skills-heading">
      <h3 id="skills-heading" className={styles.subTitle}>
        Skills & Tools
      </h3>
      <ul className={styles.skillsList}>
        <li className={styles.iconBox}>
          <img src={html} alt="HTML 로고" className={styles.iconImg} />
        </li>
        <li className={styles.iconBox}>
          <img src={css} alt="CSS 로고" className={styles.cssIcon} />
        </li>
        <li className={styles.iconBox}>
          <img src={js} alt="JavaScript 로고" className={styles.iconImg} />
        </li>
        <li className={styles.iconBox}>
          <img src={react} alt="React 로고" className={styles.reactIcon} />
        </li>
        <li className={styles.iconBox}>
          <img src={ts} alt="TypeScript 로고" className={styles.iconImg} />
        </li>
        <li className={styles.iconBox}>
          <img src={gitLogo} alt="Git 로고" className={styles.gitIcon} />
        </li>
        <li className={styles.iconBox}>
          <img src={figma} alt="Figma 로고" className={styles.iconImg} />
        </li>
        <li className={styles.iconBox}>
          <img src={slack} alt="Slack 로고" className={styles.iconImg} />
        </li>
      </ul>
    </section>
  );
};

export default Skills;
