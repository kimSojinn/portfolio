export type ProjectCategory = "All" | "CX Ops" | "Operations" | "QA";

export type Project = {
  id: string;
  title: string;
  description: string;
  year: string;
  role: string;
  category: Exclude<ProjectCategory, "All">;
  tags: string[];
  gradient: string;
};

export const projects: Project[] = [
  {
    id: "admin-ops-automation",
    title: "Admin Ops Automation",
    description: "80여 개 드롭다운 항목 자동 반영으로 운영 리스크 감소",
    year: "2023-2026",
    role: "CX Ops / QA",
    category: "CX Ops",
    tags: ["Admin", "운영 효율", "데이터 정확도"],
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    id: "onboarding-qa-system",
    title: "Onboarding Ops System",
    description: "신규 입사자의 실무 적응을 돕는 과제·리뷰 운영 체계",
    year: "2023-2026",
    role: "Internal Ops / SOP",
    category: "Operations",
    tags: ["Onboarding", "Review", "SOP"],
    gradient: "from-violet-500/10 to-purple-500/10",
  },
  {
    id: "seomse-reservation-cx",
    title: "SEOMSE Reservation CX",
    description: "예약 흐름 설계와 이미지 최적화로 고객 초기 사용 경험 개선",
    year: "2025",
    role: "Service CX / Product",
    category: "CX Ops",
    tags: ["Reservation", "Performance", "Analytics"],
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    id: "service-flow-qa",
    title: "Service Flow QA",
    description:
      "기획서 기반 화면 흐름과 다국어 어드민 기능을 검증한 QA 관점 정리",
    year: "2023-2026",
    role: "QA / Issue Triage",
    category: "QA",
    tags: ["Requirements", "Regression", "Admin"],
    gradient: "from-rose-500/10 to-pink-500/10",
  },
  {
    id: "seo-accessibility-quality",
    title: "Accessibility & SEO QA",
    description: "접근성, 정보 구조, 성능을 사용자 관점에서 점검",
    year: "2023-2026",
    role: "Quality Improvement",
    category: "QA",
    tags: ["Accessibility", "SEO", "Performance"],
    gradient: "from-amber-500/10 to-orange-500/10",
  },
];

export const categories: ProjectCategory[] = [
  "All",
  "CX Ops",
  "Operations",
  "QA",
];

export const expertise = [
  "Admin Tool Understanding",
  "VOC Issue Structuring",
  "QA / Issue Triage",
  "Internal Operation Design",
  "Customer Journey Mapping",
  "Accessibility / SEO Quality",
];

export const strengths = [
  {
    title: "어드민 구조를 아는 CX",
    description:
      "관리자 페이지 구조를 이해하고 있어 내부 프로세스에서 문제가 생기는 지점을 빠르게 찾습니다.",
  },
    {
        title: "원인을 좁혀가는 QA 감각",
        description:
            "고객 제보를 그대로 전달하기보다 발생 조건과 영향 범위를 먼저 파악합니다.",
    },
    {
        title: "VOC를 이슈로 구조화",
        description:
            "고객 문의를 화면·데이터·운영 기준으로 분류해 유관 부서가 빠르게 대응할 수 있도록 연결합니다.",
    },
];

export const experience = [
  {
    year: "2023 - Present",
    company: "Union Contents",
    role: "저작권 모니터링 서비스와 B2B 어드민을 다루며, 반복 운영 항목을 자동화하고 다국어 페이지의 사용 흐름과 관리 효율을 개선했습니다.",
  },
  {
    year: "2025",
    company: "SEOMSE",
    role: "미용실 예약 과정에서 고객이 망설이는 지점과 관리자가 확인해야 하는 정보를 연결해, 예약부터 확인까지 이어지는 MVP 화면 흐름을 설계하고 구현했습니다.",
  },
  {
    year: "2023",
    company: "SEO Guide Book",
    role: "프론트엔드 개발자가 실무에서 놓치기 쉬운 SEO 기준을 접근성, 메타데이터, 콘텐츠 구조 관점으로 정리해 학습 가능한 가이드로 공동 집필했습니다.",
  },
];
