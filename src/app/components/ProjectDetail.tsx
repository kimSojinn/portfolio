import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { useEffect } from "react";
import PageTransition from "./PageTransition";
import lighthouseAfterImage from "../../assets/img/after.png";
import lighthouseBeforeImage from "../../assets/img/before.png";

const projectData = {
  "admin-ops-automation": {
    title: "반복 작업을 줄여 운영 프로세스 개선",
    subtitle:
      "신규 항목을 더 빠르고 정확하게 반영할 수 있도록 관리 방식을 개선한 경험",
    year: "2023-2026",
    role: "CX / QA",
    client: "Union Contents",
    duration: "Frontend Developer",
    team: ["Service Operation", "Planning", "Development"],
    overview:
      "서비스에서는 국가별 항목을 관리하고 있었으며, 신규 국가가 추가될 때마다 여러 위치를 함께 확인하고 수정해야 했습니다. 이 과정에서 반영 시간이 길어지고 일부 항목이 누락될 가능성이 있었습니다.\n\n이러한 비효율을 줄이기 위해 항목 관리 방식을 개선하고 관리 기준을 정비해 반복적으로 수행하던 작업을 최소화했습니다. 신규 국가 추가 시 필요한 수정 범위를 줄일 수 있는 운영 체계를 구축했으며, 그 결과 운영 요청 이후 실제 적용까지 걸리는 시간을 크게 단축할 수 있었습니다.",
    challenge:
      "신규 항목이 생길 때마다 수동 입력과 배포가 필요했습니다. 운영자의 반복 업무도 문제였지만, 더 큰 리스크는 사용자가 오래된 선택지나 누락된 항목을 보게 되는 상황이었습니다.",
    solution:
      "하드코딩된 UI를 데이터 기반 렌더링 방식으로 바꾸고, 항목 변경이 화면에 바로 반영되는 흐름을 만들었습니다. 운영 편의보다 먼저 사용자에게 정확한 선택지가 보이는지를 기준으로 검증했습니다.",
    process: [
      {
        phase: "Find Friction",
        description:
          "운영자가 반복 입력하는 항목과 변경 빈도가 높은 화면을 확인",
      },
      {
        phase: "Map Impact",
        description:
          "수동 반영 지연이 내부 업무와 사용자 정보 정확도에 미치는 영향 정리",
      },
      {
        phase: "Redesign Logic",
        description:
          "드롭다운 항목을 데이터 기준으로 자동 렌더링하는 구조 설계",
      },
      {
        phase: "Verify",
        description: "신규 항목 추가 시 화면 반영 여부와 기존 선택 흐름을 검증",
      },
      {
        phase: "Stabilize",
        description:
          "운영 중 요구사항을 반영하며 관리 방식과 화면 사용성을 보완",
      },
    ],
    features: [
      {
        title: "내부 고객 문제 정의",
        description:
          "반복 입력 업무를 단순 불편이 아니라 서비스 최신성 문제로 정리했습니다.",
      },
      {
        title: "데이터 기반 자동 반영",
        description:
          "항목 변경이 UI에 자동 반영되도록 구조를 바꿔 수동 관리 의존도를 낮췄습니다.",
      },
      {
        title: "QA 관점 검증",
        description:
          "항목 추가, 기존 선택값 유지, 빈 값 노출 등 운영 중 발생 가능한 케이스를 확인했습니다.",
      },
      {
        title: "개발팀과 공유하기 쉬운 정리",
        description:
          "문제 원인과 개선 방향을 UI, 데이터, 렌더링 로직 단위로 나눠 공유했습니다.",
      },
    ],
    tech: [
      "Admin",
      "Data-driven UI",
      "Manual QA",
      "HTML5",
      "CSS",
      "JavaScript",
      "jQuery",
      "EJS",
    ],
    metrics: [
      { value: "80 → 10", label: "관리 포인트 감소" },
      { value: "90%+", label: "신규 항목 반영 시간 단축" },
    ],
    results: [
      "신규 항목 반영 시간을 90% 이상 단축",
      "수정 과정에서 발생할 수 있는 누락 및 오류 가능성 감소",
      "반복 작업을 줄여 운영 요청 처리 효율 향상",
    ],
    nextProject: "onboarding-qa-system",
  },
  "onboarding-qa-system": {
    title: "신규 구성원의 빠른 적응을 위한 온보딩 운영 체계",
    subtitle:
      "실무 흐름을 빠르게 익힐 수 있도록 과제와 피드백 프로세스를 체계화",
    year: "2023-2026",
    role: "Internal Ops / SOP",
    client: "Union Contents",
    duration: "Frontend Developer",
    team: ["Development", "New Joiners", "Reviewers"],
    overview:
      "신규 입사자가 팀의 코드 스타일과 업무 방식을 빠르게 이해할 수 있도록 온보딩 과제를 운영했습니다. 기존에는 실무 지식과 협업 방식이 구두로 전달되는 경우가 많아 적응 과정에서 반복적인 질문과 안내가 발생했습니다.\n\n이를 개선하기 위해 사내 홈페이지 클론코딩 과제와 PR 리뷰 프로세스를 설계하고, 과제 수행부터 피드백 반영까지 이어지는 온보딩 흐름을 구축했습니다. 신규 구성원은 실제 업무와 유사한 환경에서 학습할 수 있었고, 팀은 일관된 기준으로 온보딩을 진행할 수 있게 되었습니다.",
    challenge:
      "신규 구성원이 코드 컨벤션과 업무 방식을 각자 파악하면 적응 시간이 길어지고 리뷰 기준도 사람마다 달라질 수 있습니다.",
    solution:
      "실제 업무 방식에 가까운 과제와 PR 리뷰 흐름을 만들었습니다. 자주 반복되던 설명은 과제 요구사항과 리뷰 기준 안에 넣어 다음 온보딩에도 재사용할 수 있게 했습니다.",
    process: [
      {
        phase: "Define Standard",
        description: "팀에서 중요하게 보는 코드 컨벤션과 화면 구현 기준 정리",
      },
      {
        phase: "Design Task",
        description:
          "사내 홈페이지 클론코딩 과제로 실무와 가까운 학습 흐름 설계",
      },
      {
        phase: "Review",
        description:
          "PR 기반으로 코드 품질, 협업 방식, 업무 흐름에 대한 피드백 제공",
      },
      {
        phase: "Improve Fit",
        description: "신규 입사자가 막히는 지점을 확인하고 안내 방식을 보완",
      },
      {
        phase: "Transfer Knowledge",
        description: "반복되는 질문과 기준을 다음 온보딩에 활용할 수 있게 정리",
      },
    ],
    features: [
      {
        title: "온보딩 흐름 설계",
        description:
          "신규 입사자가 처음 겪는 정보 탐색, 과제 수행, 피드백 수신 과정을 하나의 흐름으로 정리했습니다.",
      },
      {
        title: "리뷰 기준 정리",
        description:
          "코드 스타일, 화면 구현, 협업 방식에 대한 기대치를 리뷰 기준으로 전달했습니다.",
      },
      {
        title: "반복 문의 감소",
        description:
          "자주 나오는 질문은 과제 안내와 리뷰 기준에 먼저 반영했습니다.",
      },
      {
        title: "운영형 커뮤니케이션",
        description:
          "상대의 이해 수준에 맞춰 문제와 다음 확인 작업을 구분해 전달했습니다.",
      },
    ],
    tech: [
      "Onboarding",
      "PR Review",
      "SOP",
      "Internal CX",
      "Code Quality",
      "Feedback",
    ],
    metrics: [],
    results: [
      "신규 입사자가 코드 컨벤션과 기술 스택을 빠르게 이해할 수 있는 학습 환경 구축",
      "과제 수행 → 리뷰 → 피드백 반영으로 이어지는 온보딩 프로세스 정립",
      "반복적으로 전달되던 안내와 피드백을 체계화하여 온보딩 운영 효율 향상",
    ],
    nextProject: "service-flow-qa",
  },
  "seomse-reservation-cx": {
    title: "정보 전달부터 로딩 속도까지 개선한 예약 경험 설계",
    subtitle:
      "고객이 필요한 정보를 충분히 전달할 수 있도록 예약·상담 흐름을 설계하고 성능을 개선한 MVP",
    year: "2025",
    role: "Service CX / Product",
    client: "SEOMSE",
    duration: "Side Project",
    team: ["Frontend", "Planning", "Beauty Domain"],
    overview:
      "미용실 예약 과정에서는 고객이 원하는 스타일과 현재 모발 상태를 충분히 전달하지 못하는 경우가 많습니다. 정보가 부족할 경우 고객의 기대와 실제 시술 결과 간 차이가 발생해 만족도 저하로 이어질 수 있습니다.\n\n뷰티 전공과 미용 서비스 경험을 바탕으로 고객이 필요한 정보를 자연스럽게 입력할 수 있는 예약 플로우를 설계했습니다. 시술 유형, 모발 상태, 참고 이미지 등 상담에 필요한 정보를 예약 단계에서 수집할 수 있도록 구성했으며, 예약 정보를 운영자가 효율적으로 확인할 수 있도록 관리자 관점의 정보 구조도 함께 고려했습니다.\n\n또한 페이지 로딩 속도를 개선하기 위해 서비스 내 이미지를 점검하고 최적화했습니다. WebP 형식 적용과 불필요한 이미지 정리를 통해 이미지 용량을 13MB에서 1.4MB로 줄였으며, Lighthouse 성능 점수를 77점에서 89점으로 개선했습니다.",
    challenge:
      "예약 전 정보가 부족하면 고객은 원하는 결과를 설명하기 어렵고, 매장은 상담과 일정 조율에 더 많은 시간을 쓰게 됩니다.",
    solution:
      "시술 유형, 모발 상태, 참고 이미지 첨부를 포함한 예약 프로세스를 만들고, 관리자 페이지에서 필요한 정보를 확인할 수 있게 구성했습니다. 이미지 리소스는 WebP 전환과 중복 파일 정리로 13MB에서 1.4MB까지 줄였고, Google Analytics로 유입과 예약 전환 흐름을 확인했습니다.",
    process: [
      {
        phase: "Listen",
        description: "미용 서비스 경험을 살려 예약 전 정보 부족 문제 확인",
      },
      {
        phase: "Structure",
        description: "고객이 입력해야 할 정보와 매장이 확인해야 할 정보를 분리",
      },
      {
        phase: "Build MVP",
        description:
          "제한된 시간과 인력 안에서 주요 프론트엔드 기능 대부분을 단독 구현",
      },
      {
        phase: "Measure",
        description: "Google Analytics로 유입 경로와 예약 흐름 확인",
      },
      {
        phase: "Optimize",
        description:
          "13MB 이미지 리소스를 WebP 전환과 반복 파일 정리로 1.4MB까지 축소",
      },
    ],
    features: [
      {
        title: "고객 불안 감소",
        description:
          "고객이 원하는 시술 정보를 예약 전에 구체적으로 남길 수 있도록 입력 흐름을 설계했습니다.",
      },
      {
        title: "관리자 확인 흐름",
        description:
          "매장이 상담과 예약 관리에 필요한 정보를 빠르게 확인할 수 있게 구성했습니다.",
      },
      {
        title: "유입 흐름 확인",
        description:
          "유입 경로와 예약 전환 흐름을 확인할 수 있도록 GA를 연동했습니다.",
      },
      {
        title: "성능 품질 개선",
        description:
          "PNG/JPG 중심의 이미지 리소스를 정리하고 WebP를 적용해 초기 로딩 부담을 줄였습니다.",
      },
    ],
    tech: [
      "React",
      "TypeScript",
      "CSS Module",
      "Google Analytics",
      "Lazy Loading",
      "WebP",
    ],
    metrics: [
      { value: "13MB → 1.4MB", label: "이미지 리소스 최적화" },
      { value: "91%↓", label: "이미지 용량 절감" },
      { value: "77 → 89", label: "Lighthouse 성능 개선" },
    ],
    performanceAudit: {
      before: [
        { label: "Performance", value: "77" },
        { label: "Image Weight", value: "13MB" },
        { label: "WebP", value: "0 files" },
      ],
      after: [
        { label: "Performance", value: "89" },
        { label: "Accessibility", value: "95" },
        { label: "Best Practices", value: "78" },
        { label: "SEO", value: "100" },
      ],
      vitals: [
        { label: "FCP", value: "0.4s" },
        { label: "LCP", value: "1.3s" },
        { label: "Speed Index", value: "0.6s" },
        { label: "TBT", value: "0ms" },
        { label: "CLS", value: "0.163" },
      ],
      note: "WebP 변환 및 이미지 최적화를 통해 이미지 용량을 13MB에서 1.4MB로 줄이고 Lighthouse 성능 점수를 77점에서 89점으로 개선",
    },
    results: [
      "시술 정보, 모발 상태, 참고 이미지 입력 흐름을 설계하여 예약 전 정보 부족 문제를 완화",
      "GA를 연동하여 예약 전환 흐름과 사용자 행동 데이터를 분석할 수 있는 환경 구축",
      "학생창업유망팀 U300 본선 진출을 통해 서비스 아이디어를 실제 MVP로 구현",
      "이미지 용량을 13MB에서 1.4MB로 줄이고 Lighthouse 성능 점수를 77점에서 89점으로 개선",
    ],
    nextProject: "admin-ops-automation",
  },
  "service-flow-qa": {
    title: "운영 관점에서 서비스 품질을 검증한 경험",
    subtitle:
      "기획 의도부터 엣지 케이스까지 실제 사용 환경을 기준으로 요구사항을 검토한 경험",
    year: "2023-2026",
    role: "QA / Issue Triage",
    client: "Union Contents",
    duration: "Frontend Developer",
    team: ["Planning", "Development", "Client Communication"],
    overview:
      "서비스 화면 및 관리자 기능을 개발하며 기획서를 기반으로 요구사항과 화면 흐름을 함께 검토했습니다. 기능 구현 과정에서는 다국어 번역 누락, 권한별 메뉴 노출 조건, 필수 입력값 검증 등 품질과 관련된 요소를 함께 확인했습니다.\n\n또한 정상 시나리오뿐 아니라 권한이 없는 사용자의 접근, 필수값 누락, 빈 데이터 상태, 최대 입력 길이 초과, 예외 응답 발생 등 실제 서비스 이용 과정에서 발생할 수 있는 다양한 상황을 검증했습니다.\n\n기획 의도와 실제 동작 간 차이를 확인하고, 요구사항이 실제 사용 환경에서도 의도한 대로 동작하는지 살펴보며 서비스 완성도를 높이는 데 기여했습니다.",
    challenge:
      "기획서에는 기능 단위 요구사항이 정리되어 있어도 실제 사용자는 여러 화면을 이어서 사용합니다. 특히 관리자 페이지와 다국어 페이지는 입력, 저장, 조회, 언어 전환, 권한별 정보 노출처럼 연결된 조건이 많아 단일 화면만 확인하면 문제를 놓칠 수 있습니다.",
    solution:
      "화면 흐름을 사용자 행동 순서로 다시 보고, 정상 흐름과 예외 조건을 나누어 확인했습니다. 클라이언트 요청은 의도와 영향 범위를 기능 단위로 정리해 개발 과정에서 놓치는 조건을 줄였습니다.",
    process: [
      {
        phase: "Read Requirements",
        description: "기획서와 요청사항을 기능, 화면, 데이터 조건으로 분해",
      },
      {
        phase: "Map User Flow",
        description:
          "어드민 입력, 조회, 수정, 언어 전환 흐름을 사용자 행동 순서로 정리",
      },
      {
        phase: "Check Conditions",
        description:
          "정상 케이스와 빈 값, 누락 데이터, 언어별 표시 차이를 확인",
      },
      {
        phase: "Report Gap",
        description: "요구사항과 실제 화면 사이의 차이를 재현 조건과 함께 공유",
      },
      {
        phase: "Regression Review",
        description: "기능 추가 후 기존 화면 흐름이 깨지지 않는지 재확인",
      },
    ],
    features: [
      {
        title: "요구사항 기반 검증",
        description:
          "기획서 내용을 구현하는 데서 끝내지 않고 실제 화면 흐름에서 요구사항이 충족되는지 확인했습니다.",
      },
      {
        title: "다국어 QA 관점",
        description:
          "한-영 다국어 환경에서 언어가 바뀌어도 동일한 흐름으로 서비스를 이용할 수 있는지 점검했습니다.",
      },
      {
        title: "어드민 흐름 검증",
        description:
          "관리자가 입력한 데이터가 사용자가 보는 화면에 정확히 반영되는지 연결 흐름을 확인했습니다.",
      },
      {
        title: "이슈 전달력",
        description:
          "문제를 발견했을 때 화면, 조건, 기대 결과, 실제 결과를 나누어 바로 확인할 수 있게 정리했습니다.",
      },
    ],
    tech: [
      "Requirements Review",
      "Manual QA",
      "Regression",
      "Admin QA",
      "i18n",
      "Issue Triage",
    ],
    metrics: [],
    results: [
      "기획서 기반 화면 흐름과 요구사항을 검토하며 기능 누락 가능성 최소화",
      "다국어 번역 누락, 권한별 메뉴 노출, 필수 입력값 검증 등 다양한 엣지 케이스 검증",
    ],
    nextProject: "seomse-reservation-cx",
  },
  "seo-accessibility-quality": {
    title: "웹 접근성 및 SEO 개선",
    subtitle: "검색 노출, 정보 구조, 접근성을 사용자 관점에서 점검",
    year: "2023-2026",
    role: "Quality Improvement",
    client: "Union Contents / SEO Guide",
    duration: "Frontend + Writing",
    team: ["Frontend", "Design", "Content"],
    overview:
      "서비스 화면 리뉴얼과 SEO 가이드 집필 과정에서 접근성, 정보 구조, 검색 친화성을 다뤘습니다. 사용자가 필요한 정보를 찾고 이해하는 데 영향을 주는 요소를 프론트엔드 관점에서 점검했습니다.",
    challenge:
      "색상 대비, 정보 구조, 로딩 속도, 검색 노출 기준이 부족하면 고객은 필요한 정보를 찾기 어렵고 서비스 신뢰도도 낮아질 수 있습니다. 개발팀과 비개발 직군이 같은 기준으로 화면을 보는 것도 중요했습니다.",
    solution:
      "서비스 화면의 UI 리뉴얼 과정에서 색상 대비와 정보 흐름을 함께 확인했습니다. SEO 가이드 공동 집필 때는 복잡한 기술 개념을 비전공자도 읽기 쉬운 순서로 정리했습니다.",
    process: [
      {
        phase: "Audit",
        description:
          "색상 대비, 정보 전달 구조, 화면 흐름에서 사용자가 막힐 수 있는 지점 확인",
      },
      {
        phase: "Improve UI",
        description:
          "기반 디자인 틀을 활용해 서비스 화면 UI 리뉴얼과 흐름 개선 진행",
      },
      {
        phase: "Explain",
        description:
          "SEO의 개념과 등장 배경을 프론트엔드 관점에서 이해하기 쉽게 구조화",
      },
      {
        phase: "Collaborate",
        description:
          "Figma로 표지 디자인 방향과 레이아웃을 검토하며 시각적 완성도 보완",
      },
      {
        phase: "Clarify",
        description: "기술 기준을 사용자가 정보를 찾는 과정과 연결해 설명",
      },
    ],
    features: [
      {
        title: "접근성 관점",
        description:
          "색상 대비와 정보 전달 구조를 고려해 다양한 사용자 환경에서의 사용성을 높였습니다.",
      },
      {
        title: "정보 구조화",
        description:
          "기술 개념을 독자가 이해하기 쉬운 순서와 표현으로 정리했습니다.",
      },
      {
        title: "유관 부서 협업",
        description:
          "디자인, 콘텐츠, 개발 관점을 함께 확인하며 화면과 문서를 다듬었습니다.",
      },
      {
        title: "사용자 관점 설명",
        description:
          "SEO와 접근성을 코드 문제가 아니라 사용자가 정보를 찾는 과정과 연결해 설명했습니다.",
      },
    ],
    tech: [
      "Accessibility",
      "SEO",
      "Figma",
      "UI Renewal",
      "Content Structure",
      "Frontend QA",
    ],
    metrics: [{ value: "1", label: "SEO 가이드 공동 집필" }],
    results: [
      "접근성과 정보 전달 구조를 고려해 서비스 화면을 개선",
      "SEO 개념을 비전공자도 이해할 수 있는 구조로 정리하고 집필",
      "기술 기준을 사용자 정보 탐색 흐름과 연결해 설명",
    ],
    nextProject: "admin-ops-automation",
  },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = id ? projectData[id as keyof typeof projectData] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Case not found</h1>
          <Link to="/" className="underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-black">
        <nav className="fixed top-0 w-full z-50 bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 md:py-6 flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-50 transition-opacity text-sm md:text-base"
            >
              <ArrowLeft size={18} className="md:w-5 md:h-5" />
              <span className="tracking-tight">Back</span>
            </Link>
            <Link
              to={`/project/${project.nextProject}`}
              className="flex items-center gap-2 hover:opacity-50 transition-opacity text-sm md:text-base"
            >
              <span className="tracking-tight hidden md:inline">Next Case</span>
              <span className="tracking-tight md:hidden">Next</span>
              <ArrowRight size={18} className="md:w-5 md:h-5" />
            </Link>
          </div>
        </nav>

        <section className="pt-24 md:pt-32 pb-10 md:pb-16 px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6 md:mb-8 text-xs md:text-sm tracking-widest text-neutral-500">
                {project.client}
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl tracking-tighter mb-4 md:mb-6 leading-tight">
                {project.title}
              </h1>
              <p className="text-base md:text-xl leading-[1.75] text-neutral-600 max-w-3xl">
                {project.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {project.metrics.length > 0 && (
          <section className="px-6 md:px-8 mb-12 md:mb-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-6 md:mb-8">
                IMPACT
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {project.metrics.map((metric, index) => (
                  <motion.div
                    key={`${metric.value}-${metric.label}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-5 md:p-6 border border-neutral-200 rounded-lg bg-white"
                  >
                    <div className="text-2xl md:text-3xl tracking-tight mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm text-neutral-500 leading-relaxed">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 md:px-8 mb-12 md:mb-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[0.7fr_1.3fr] gap-8 md:gap-16">
            <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-6 md:mb-8">
              SUMMARY
            </h2>
            <p className="whitespace-pre-line max-w-3xl text-base md:text-xl leading-[1.85] text-neutral-700">
              {project.overview}
            </p>
          </div>
        </section>

        {id === "seomse-reservation-cx" && (
          <section className="px-6 md:px-8 mb-16 md:mb-24">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-6 md:mb-8">
                LIGHTHOUSE BEFORE / AFTER
              </h2>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {[
                  {
                    label: "BEFORE",
                    score: "77",
                    src: lighthouseBeforeImage,
                    alt: "Lighthouse 개선 전 성능 점수 77점 리포트",
                  },
                  {
                    label: "AFTER",
                    score: "89",
                    src: lighthouseAfterImage,
                    alt: "Lighthouse 개선 후 성능 점수 89점 리포트",
                  },
                ].map((image, index) => (
                  <motion.figure
                    key={image.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-neutral-200 rounded-lg overflow-hidden bg-white"
                  >
                    <div className="flex items-center justify-between px-4 md:px-5 py-3 border-b border-neutral-200">
                      <figcaption className="text-xs md:text-sm tracking-widest text-neutral-400">
                        {image.label}
                      </figcaption>
                      <span className="text-sm md:text-base text-neutral-600">
                        Performance {image.score}
                      </span>
                    </div>
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-contain bg-neutral-50"
                    />
                  </motion.figure>
                ))}
              </div>
              <p className="mt-4 md:mt-5 max-w-3xl text-sm md:text-base text-neutral-500 leading-[1.8]">
                WebP 변환 및 이미지 최적화를 통해 이미지 용량을 13MB에서 1.4MB로
                줄이고 Lighthouse 성능 점수를 77점에서 89점으로 개선
              </p>
            </div>
          </section>
        )}

        <section className="px-6 md:px-8 mb-16 md:mb-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-6 md:mb-8">
              OUTCOMES
            </h2>
            <div className="grid gap-3 md:gap-4">
              {project.results.map((result, index) => (
                <motion.div
                  key={result}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 border-t border-neutral-200 py-5 md:py-6"
                >
                  <span className="text-sm text-neutral-400 mt-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-4xl text-base md:text-xl leading-[1.8]">
                    {result}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Next Case */}
        <section className="px-6 md:px-8 py-16 md:py-32 border-t border-neutral-200">
          <div className="max-w-6xl mx-auto">
            <Link
              to={`/project/${project.nextProject}`}
              className="group flex justify-between items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm tracking-widest text-neutral-400 mb-3 md:mb-4">
                  NEXT CASE
                </p>
                <h2 className="text-xl md:text-3xl lg:text-4xl tracking-tighter group-hover:translate-x-4 transition-transform">
                  {
                    projectData[project.nextProject as keyof typeof projectData]
                      .title
                  }
                </h2>
              </div>
              <ArrowRight
                size={32}
                className="text-neutral-300 group-hover:text-black transition-colors flex-shrink-0 md:w-12 md:h-12"
              />
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
