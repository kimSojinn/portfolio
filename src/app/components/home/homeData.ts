export type ProjectCategory = "전체" | "기능 QA" | "회귀 QA";

export type Project = {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  year: string;
  category: Exclude<ProjectCategory, "전체">;
  gradient: string;
};

export const projects: Project[] = [
  {
    id: "seomse-reservation-qa",
    title: "SEOMSE 예약 QA",
    description:
      "31개 테스트 케이스로 예약 생성부터 관리자 조회까지 검증하고 주요 결함 4건을 발견했습니다.",
    keywords: ["Test Case", "Bug Report", "API Test"],
    year: "2025",
    category: "기능 QA",
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    id: "operations-e2e-smoke",
    title: "로그인 기능 Smoke Test 자동화",
    description:
      "Playwright로 운영 서비스의 로그인 기능을 7개 시나리오로 검증합니다.",
    keywords: ["Playwright", "E2E", "Smoke Test"],
    year: "2025",
    category: "기능 QA",
    gradient: "from-sky-500/10 to-blue-500/10",
  },
  {
    id: "service-flow-qa",
    title: "관리자 권한·다국어 회귀 QA",
    description:
      "권한·CRUD·다국어 회귀 테스트 18건 중 기대 결과와 다른 동작 3건을 확인했습니다.",
    keywords: ["Regression Test", "Admin QA", "i18n"],
    year: "2023-2026",
    category: "회귀 QA",
    gradient: "from-rose-500/10 to-pink-500/10",
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

export const categories: ProjectCategory[] = ["전체", "기능 QA", "회귀 QA"];

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
    summary:
      "사용자 웹 서비스와 B2B 관리자 페이지의 프론트엔드 개발 및 품질 개선",
    details: [
      "하드코딩된 UI를 데이터 기반 렌더링 구조로 개선해 신규 항목의 화면 반영 누락 방지",
      "권한별 접근, CRUD, 다국어(i18n), 빈 데이터·API 오류 조건 회귀 검증",
      "로그인 기능의 Playwright E2E Smoke Test 구축",
    ],
  },
  {
    year: "2025",
    company: "SEOMSE",
    summary:
      "예약 서비스의 프론트엔드 전반을 주도하고 핵심 사용자 플로우 QA 수행",
    details: [
      "React·TypeScript 기반 프론트엔드 전반 담당",
      "매장 탐색부터 일반·섬세 예약 생성, 마이페이지 조회까지 화면·상태 관리·API 연동 구현",
      "정상·예외 조건 31건을 검증해 주요 결함 4건을 기록하고 Playwright 예약 자동화 7건 구축",
    ],
  },
];
