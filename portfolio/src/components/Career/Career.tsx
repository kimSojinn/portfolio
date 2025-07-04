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
            description: (
              <>
                • 블록체인 기술을 기반으로 한 국가 연구개발(R&D) 사업,
                소프트웨어 지적재산권 유통 및 관리 플랫폼 Myso 개발 참여
              </>
            ),
            subDescription: [
              <>
                기존 프로젝트들의 Tailwind CSS 사용으로 인한 클래스 네이밍
                난잡화 및 유지보수 이슈를 해결하기 위해,
                <br /> 컴포넌트 단위 스타일링이 가능한 CSS Module (.module.scss)
                기반 구조를 도입하여{" "}
                <strong>코드 가독성과 재사용성을 향상.</strong>
              </>,
              <>
                기존 GitHub Actions 기반 프론트엔드 배포 자동화 방식을 AWS
                Amplify Hosting을 도입하여 배포 프로세스를 간소화하고{" "}
                <strong>안정성을 개선</strong>하는데에 주도.
              </>,
            ],
            stack: ["React", "TypeScript", "SCSS", "zustand"],
          },
          {
            description: (
              <>• 자체 저작권 모니터링 B2B 시스템 Autogreen 유지보수</>
            ),
            subDescription: [
              <>
                프로젝트 내 80여 개 드롭다운 항목을 수동 인덱싱하던 레거시코드를
                데이터 기반 동적 렌더링 방식으로 리팩토링하여, 신규 항목 추가 시
                드롭다운 유지보수 시간을 약 <strong>90% 이상 단축.</strong>
              </>,
            ],
            stack: ["HTML5", "CSS", "JavaScript", "JQuery", "ejs"],
          },
          {
            description: <>• 프론트엔드팀 온보딩 프로세스 도입</>,
            subDescription: [
              <>
                체계적인 온보딩 절차가 없던 기존 환경을 개선하기 위해, 신규
                입사자에게 자사 홈페이지 클론 코딩 과제를 부여하고
                <br /> 코드 리뷰를 통해 사내 프로젝트 구조 및 개발 프로세스를
                빠르게 이해할 수 있도록 하여 신규 인력의 업무 적응 속도를 크게{" "}
                <strong>향상.</strong>
              </>,
            ],
          },
        ]}
      />
    </div>
  );
};

export default Career;
