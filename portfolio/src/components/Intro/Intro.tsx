import styles from "./Intro.module.css";

const Intro = () => {
    return (
        <section
            className={styles.intro}
            role="region"
            aria-label="Intro Section"
        >
            <div className={styles.overlay}>
                <div className={styles.topLine} aria-hidden="true"></div>
                <div className={styles.rightLine} aria-hidden="true"></div>
                <div className={styles.rightCircle} aria-hidden="true"></div>
                <div className={styles.bottomLine} aria-hidden="true"></div>
                <div className={styles.leftLine} aria-hidden="true"></div>

                <header className={styles.rightCircle}>
                    <p>김소진</p>
                    <h1>Intro</h1>
                </header>
            </div>
        </section>
    );
};

export default Intro;
