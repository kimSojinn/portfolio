import githubIcon from "../../assets/images/git.png";
import mail from "../../assets/images/mail.png";

import styles from "./Intro.module.css";

const Intro = () => {
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
                <div className={styles.bottomLine} aria-hidden="true">
                    <footer>
                        <div className={styles.footerContainer}>
                            <a
                                href="https://github.com/kimSojinn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={githubIcon}
                                    alt="GitHub logo"
                                    width={40}
                                    height={40}
                                />
                            </a>
                            <img
                                src={mail}
                                alt="mail icon"
                                width={38}
                                height={38}
                                style={{ cursor: "pointer" }}
                                onClick={handleCopyEmail}
                            />
                        </div>
                    </footer>
                </div>

                <div className={styles.leftLine} aria-hidden="true"></div>

                <div className={styles.rightCircle}>
                    <div className={styles.info}>
                        <span>김 소 진</span>
                        <h1>Portfolio</h1>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Intro;
