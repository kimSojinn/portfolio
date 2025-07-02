import CareerCard from "./CareerCard";

import styles from "./Career.module.css";

const Career = () => {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Career</h2>
      <CareerCard
        period="2023.09 - 재직 중"
        company="(주)유니온콘텐츠"
        role="Frontend Developer"
        experiences={[
          {
            description:
              "블록체인 기술을 기반으로 한 국가 연구개발(R&D) 사업, 소프트웨어 지적재산권 유통 및 관리 플랫폼 Myso 개발 참여",
            stack: ["React", "TypeScript", "SCSS"],
          },
          {
            description: "자체 저작권 모니터링 B2B 시스템 Autogreen 유지보수",
            stack: ["React", "TypeScript", "SCSS"],
          },
          {
            description: "프론트엔드팀 온보딩 프로세스 도입",
            stack: ["React", "TypeScript", "SCSS"],
          },
        ]}
      />
    </div>
  );
};

export default Career;
