import { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import thumbnail from "../../assets/images/thumbnail.png";
import bookCover from "../../assets/images/bookCover.webp";
import review from "../../assets/images/review.png";

import styles from "./Project.module.css";

const cardList = [
  {
    period: "2023.05 - 2023.07",
    organization: "Show in Seoul",
    description:
      "서울시 공공 API를 사용하여 문화 행사 정보를 한눈에 볼 수 있는 웹앱 서비스",
    role: "Team | 공통 컴포넌트 개발, Splash Screen 애니메이션 제작, 로그인 화면 및 기능개발 ",
    stack: ["React", "styled-components", "Recoil"],
    link: "https://github.com/kimSojinn/final-07-show-in-seoul",
    content: (
      <img
        src={thumbnail}
        className={styles.screenshot}
        alt="Show in Seoul 웹앱 화면"
      />
    ),
  },
  {
    period: "2023.04 - 2023.06",
    organization: "프론트엔드 개발자를 위한 SEO 가이드 집필",
    description: (
      <>
        마케터가 아닌 웹개발자가 쉽게 이해하고 적용할 수 있도록 내용을
        구성했으며, <br /> SEO의 개념과 등장 배경 파트 집필 참여
      </>
    ),
    role: "Team | 집필 참여 및 표지 디자인 참여",
    stack: ["Notion", "Figma", "RIDI"],
    link: "https://ridibooks.com/books/2773000071?_s=instant&_q=%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C&_rdt_sid=search_instant&_rdt_idx=2&_rdt_arg=%ED%94%84%EB%25",
    content: (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          width: "100%",
        }}
      >
        <img
          src={bookCover}
          alt="프론트엔드 개발자를 위한 SEO 가이드 책 표지"
          style={{ width: "200px" }}
          className={styles.bookCoverImg}
        />
        <img
          src={review}
          alt="실제 리뷰"
          className={styles.reviewImage}
          style={{ width: "270px" }}
        />
      </div>
    ),
  },
];

const Project = () => {
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasAnimated]);

  return (
    <section className={styles.projectSection} ref={sectionRef}>
      <h2 className={styles.title}>Project & Education</h2>

      <div className={styles.cardGrid}>
        {cardList.map((card, index) => (
          <div
            key={index}
            className={`${styles.cardWrapper} ${
              hasAnimated ? styles.fadeInUp : ""
            } ${hasAnimated ? styles[`delay${index}`] : ""}`}
          >
            <ProjectCard {...card} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;
