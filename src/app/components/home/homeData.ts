export type ProjectCategory = "All" | "Quality" | "Regression";

export type Project = {
  id: string;
  title: string;
  description: string;
  year: string;
  category: Exclude<ProjectCategory, "All">;
  gradient: string;
};

export const projects: Project[] = [
  {
    id: "seomse-reservation-qa",
    title: "SEOMSE 예약 기능 테스트 케이스 설계 및 품질 검증",
    description:
      "예약 생성부터 관리자 조회까지의 핵심 사용자 플로우를 검증한 QA 프로젝트",
    year: "2025",
    category: "Quality",
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    id: "service-flow-qa",
    title: "다국어·권한별 서비스 플로우 회귀 검증",
    description:
      "정상 플로우 밖의 상세 정보 모달까지 탐색한 다국어·권한 회귀 검증",
    year: "2023-2026",
    category: "Regression",
    gradient: "from-rose-500/10 to-pink-500/10",
  },
  {
    id: "operations-e2e-smoke",
    title: "사내 운영 서비스 로그인·인증 플로우 Smoke Test 자동화",
    description:
      "배포 후 실유저 진입 전, 로그인·인증 플로우를 운영 도메인에서 직접 검증한 E2E 자동화",
    year: "2025",
    category: "Quality",
    gradient: "from-sky-500/10 to-blue-500/10",
  },
  // {
  //   id: "seomse-login-e2e",
  //   title: "섬세 로그인 E2E 자동화 테스트",
  //   description:
  //     "백엔드 없이 page.route()로 6개 로그인 시나리오를 검증한 Playwright 기반 자동화",
  //   year: "2025",
  //   category: "Quality",
  //   gradient: "from-violet-500/10 to-purple-500/10",
  // },
];

export const categories: ProjectCategory[] = ["All", "Quality", "Regression"];

export const strengths = [
  {
    title: "요구사항을 검증 가능한 조건으로 나눕니다",
    description:
      "정상 흐름뿐 아니라 예외 상황, 경계값, 권한, 상태 변화 등 놓치기 쉬운 조건을 구체화하여 검증합니다.",
  },
  {
    title: "재현 가능한 형태로 문제를 전달합니다",
    description:
      "발생 환경과 재현 절차를 정리하고 기대 결과와 실제 결과를 구분하여 원인과 영향 범위를 명확하게 공유합니다.",
  },
  {
    title: "수정 이후의 흐름까지 확인합니다",
    description:
      "결함 수정 여부만 확인하지 않습니다. 연결된 기능과 기존 사용자 흐름에 영향이 없는지 회귀 테스트를 진행합니다.",
  },
];

export const experience = [
  {
    year: "2023 - Present",
    company: "Union Contents",
    role: "서비스 플로우 QA · 회귀 검증 · B2B 관리자 페이지 품질 개선",
  },
  {
    year: "2025",
    company: "SEOMSE",
    role: "예약 플로우 QA · 성능 품질 점검 · MVP 개발",
  },
  {
    year: "2023",
    company: "SEO Guide Book",
    role: "SEO · 웹 접근성 품질 기준 정리 · 가이드 공동 집필",
  },
];
