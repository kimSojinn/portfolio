import styles from "./Intro.module.css";

const Intro = () => {
  return (
    <section className={styles.intro} role="region" aria-label="Intro Section">
      <div className={styles.overlay}>
        <div className={styles.topLine} aria-hidden="true"></div>
        <div className={styles.rightLine} aria-hidden="true"></div>
        <div className={styles.rightCircle} aria-hidden="true"></div>
        <div className={styles.bottomLine} aria-hidden="true"></div>
        <div className={styles.leftLine} aria-hidden="true"></div>

        <div className={styles.rightCircle}>
          <div className={styles.info}>
            <span>김 소 진</span>
            <h1>Portfolio</h1>
          </div>
        </div>

        <div className={styles.centerMessage}>
          <p className={styles.line1}>누구에게나 평등한,</p>
          <p className={styles.line2}>모두를 위한 웹을 고민합니다.</p>
        </div>
      </div>
    </section>
  );
};

export default Intro;
