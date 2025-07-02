import { useEffect, useRef, useState } from "react";
import memoji1 from "../../assets/images/memoji1.png";
import memoji2 from "../../assets/images/memoji2.png";

import styles from "./AboutMe.module.css";

const AboutMe = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      if (triggerRef.current) observer.unobserve(triggerRef.current);
    };
  }, [hasAnimated]);

  return (
    <section className={styles.mainSection}>
      <h2 className={styles.title}>About me</h2>

      <div className={styles.imageWrapper}>
        <img
          src={memoji1}
          alt="기본 미모지"
          className={`${styles.image} ${styles.default}`}
        />
        <img
          src={memoji2}
          alt="호버 미모지"
          className={`${styles.image} ${styles.hover}`}
        />
      </div>

      <div className={styles.descBox} ref={triggerRef}>
        <p className={`${styles.desc} ${hasAnimated ? styles.animate : ""}`}>
          기술로 사회의 장벽을 허물고, <br />
          누구나 차별 없이 이용할 수 있는 UI/UX를 만들고자하는
        </p>
        <p
          className={`${styles.role} ${hasAnimated ? styles.animateDelay : ""}`}
        >
          프론트엔드 개발자 <strong>김소진</strong> 입니다.
        </p>

        <span className={styles.memo}>
          * 채용공고에 주어진 사전 질문을 포트폴리오에 녹여두었습니다!
        </span>
        <div className={styles.questionBox}>
          <p>💡 웹 접근성이 무엇인가요?</p>
          <p>A. </p>
        </div>
        <div className={styles.questionBox}>
          <p>
            💡 웹 접근성을 준수하기 위한 마크업 방법 3가지와 그 이유를 작성해
            주세요.
          </p>
          <p>A. </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
