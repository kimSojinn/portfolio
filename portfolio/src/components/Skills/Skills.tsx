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
        <li className={styles.iconBox} aria-label="HTML">
          <img src={html} alt="" className={styles.iconImg} />
        </li>
        <li className={styles.iconBox} aria-label="CSS">
          <img src={css} alt="" className={styles.cssIcon} />
        </li>
        <li className={styles.iconBox} aria-label="JavaScript">
          <img src={js} alt="" className={styles.iconImg} />
        </li>
        <li className={styles.iconBox} aria-label="React">
          <img src={react} alt="" className={styles.reactIcon} />
        </li>
        <li className={styles.iconBox} aria-label="TypeScript">
          <img src={ts} alt="" className={styles.iconImg} />
        </li>
        <li className={styles.iconBox} aria-label="Git">
          <img src={gitLogo} alt="" className={styles.gitIcon} />
        </li>
        <li className={styles.iconBox} aria-label="Figma">
          <img src={figma} alt="" className={styles.iconImg} />
        </li>
        <li className={styles.iconBox} aria-label="Slack">
          <img src={slack} alt="" className={styles.iconImg} />
        </li>
      </ul>
    </section>
  );
};

export default Skills;
