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
    id: "seomse-reservation-cx",
    title: "SEOMSE 예약 기능 QA 및 성능 검증",
    description:
      "예약 생성부터 관리자 조회까지 32개 테스트 케이스로 검증하고 핵심 결함과 성능 개선점을 정리한 사례",
    year: "2025",
    category: "Quality",
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    id: "service-flow-qa",
    title: "다국어·권한별 서비스 플로우 회귀 검증",
    description:
      "B2B 관리자 페이지의 권한, 다국어, 등록·수정·삭제 흐름을 회귀 검증한 사례",
    year: "2023-2026",
    category: "Regression",
    gradient: "from-rose-500/10 to-pink-500/10",
  },
];

export const categories: ProjectCategory[] = ["All", "Quality", "Regression"];

export const strengths = [
  {
    title: "요구사항을 테스트 조건으로 구체화합니다",
    description:
      "기능의 정상 흐름뿐 아니라 공백, 경계값, 권한, 상태 변화처럼 놓치기 쉬운 조건을 나누어 확인합니다.",
  },
  {
    title: "재현 가능한 형태로 결함을 전달합니다",
    description:
      "발생 환경, 재현 절차, 기대 결과, 실제 결과를 분리하고 영향 범위를 확인해 빠르게 판단할 수 있도록 정리합니다.",
  },
  {
    title: "수정 이후의 흐름까지 다시 검증합니다",
    description:
      "결함 수정 여부만 확인하지 않고 연결된 기능과 기존 사용자 흐름에 영향이 없는지 회귀 테스트를 수행합니다.",
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
