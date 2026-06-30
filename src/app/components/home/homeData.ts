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
    title: "테스트 시나리오 설계",
    description:
      "사용자 흐름과 예외 상황을 분석해 요구사항을 검증 가능한 테스트 케이스로 구체화합니다.",
  },
  {
    title: "API · UI 교차 검증",
    description:
      "API 응답과 화면 동작을 함께 확인하며 데이터 바인딩과 예외 처리까지 점검합니다.",
  },
  {
    title: "재현 가능한 Bug Report",
    description:
      "발생 환경, 재현 절차, 기대 결과와 실제 결과를 정리해 누구나 동일한 문제를 확인할 수 있도록 기록합니다.",
  },
];

export const careers = [
  {
    year: "2023 - Present",
    company: "Union Contents",
    summary: "웹 서비스와 B2B 관리자 페이지의 운영 흐름 개발·검증",
    details: [
      "권한, 다국어(i18n), CRUD, 데이터 반영 흐름 회귀 검증",
      "로그인·인증 플로우 E2E Smoke Test 구축",
    ],
  },
  {
    year: "2025",
    company: "SEOMSE",
    summary: "예약 서비스의 핵심 사용자 플로우 QA",
    details: [
      "예약 생성부터 관리자 조회까지 31건의 테스트 케이스 작성",
      "API 검증, Bug Report, Playwright E2E 테스트 수행",
    ],
  },
];
