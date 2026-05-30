export type ProjectCategory = "All" | "CX" | "Operations" | "QA";

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
    title: "고객과 관리자 모두를 고려한 예약 프로세스 설계",
    description:
      "고객이 필요한 정보를 충분히 전달할 수 있도록 예약·상담 흐름을 설계하고 성능을 개선한 MVP",
    year: "2025",
    category: "CX",
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    id: "admin-ops-automation",
    title: "반복 작업을 줄여 운영 프로세스 개선",
    description:
      "신규 항목을 더 빠르고 정확하게 반영할 수 있도록 관리 방식을 개선한 경험",
    year: "2023-2026",
    category: "CX",
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    id: "onboarding-qa-system",
    title: "신규 구성원의 빠른 적응을 위한 온보딩 운영 체계",
    description:
      "실무 흐름을 빠르게 익힐 수 있도록 과제와 피드백 프로세스를 체계화",
    year: "2023-2026",
    category: "Operations",
    gradient: "from-violet-500/10 to-purple-500/10",
  },
  {
    id: "service-flow-qa",
    title: "운영 관점에서 서비스 품질을 검증한 경험",
    description:
      "기획 의도부터 엣지 케이스까지 실제 사용 환경을 기준으로 요구사항을 검토한 경험",
    year: "2023-2026",
    category: "QA",
    gradient: "from-rose-500/10 to-pink-500/10",
  },
];

export const categories: ProjectCategory[] = ["All", "CX", "Operations", "QA"];

export const strengths = [
  {
    title: "운영 과정의 비효율을 찾습니다",
    description:
      "관리자 페이지와 내부 운영 프로세스를 직접 개선하며 반복 작업과 운영 비효율이 발생하는 지점을 찾아 해결해왔습니다.",
  },
  {
    title: "문제의 원인을 좁혀갑니다",
    description:
      "고객 제보나 이슈를 그대로 전달하기보다 발생 조건과 영향 범위를 파악하며 문제의 원인을 좁혀갑니다.",
  },
  {
    title: "고객의 목소리를 개선으로 연결합니다",
    description:
      "고객 문의와 운영 이슈를 화면, 데이터, 프로세스 관점에서 분석하고 유관 부서와 협업하여 개선 방향을 도출합니다.",
  },
];

export const experience = [
  {
    year: "2023 - Present",
    company: "Union Contents",
    role: "운영 프로세스 개선 · QA 검증 · B2B 관리자 페이지 구축",
  },
  {
    year: "2025",
    company: "SEOMSE",
    role: "예약 플로우 설계 · MVP 기획 및 개발",
  },
  {
    year: "2023",
    company: "SEO Guide Book",
    role: "SEO · 접근성 가이드 공동 집필",
  },
];
