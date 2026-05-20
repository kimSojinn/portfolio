import { motion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, ExternalLink, Play } from "lucide-react";
import { Link, useParams } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRef, useEffect } from "react";
import PageTransition from "./PageTransition";

const projectData = {
  "admin-ops-automation": {
    title: "Admin Ops Automation",
    subtitle: "운영자가 매번 수동으로 반영하던 항목을 데이터 기반 자동 반영 구조로 개선",
    year: "2023-2026",
    role: "CX Ops / QA",
    client: "Union Contents",
    duration: "Frontend Developer",
    team: ["Service Operation", "Planning", "Development"],
    overview: "저작권 모니터링 서비스 운영 중 반복적으로 관리되던 약 80여 개 드롭다운 항목을 데이터 기반으로 자동 반영되도록 개선했습니다. 운영자가 최신 항목을 빠르게 반영하고, 사용자가 별도 요청 없이 정확한 항목을 확인할 수 있게 만든 작업입니다.",
    developerFrame: "하드코딩된 드롭다운 구조를 데이터 기반 동적 렌더링 방식으로 리팩토링했습니다.",
    cxFrame: "신규 항목을 추가할 때마다 운영자가 반복 입력해야 했고, 반영이 늦어지면 사용자에게 오래된 선택지가 노출될 수 있었습니다. 데이터 기반 자동 반영 구조로 바꿔 내부 반영 시간을 90% 이상 줄이고 최신 선택지를 더 안정적으로 제공했습니다.",
    challenge: "신규 항목이 생길 때마다 수동으로 입력하고 배포 흐름을 거쳐야 했기 때문에 운영자의 반복 업무가 커지고, 사용자에게 최신 데이터가 늦게 전달될 위험이 있었습니다. 고객 관점에서는 선택지가 오래되거나 누락되는 순간 서비스 신뢰도가 떨어질 수 있었습니다.",
    solution: "하드코딩된 UI를 데이터 기반 렌더링 구조로 바꿔 운영 항목이 변경될 때 화면에 자동 반영되도록 했습니다. 운영자의 반복 업무를 줄이고, 사용자가 최신 정보를 확인할 수 있게 하는 데 초점을 맞췄습니다.",
    process: [
      { phase: "Find Friction", description: "운영자가 반복 입력하는 항목과 변경 빈도가 높은 화면을 확인" },
      { phase: "Map Impact", description: "수동 반영 지연이 내부 업무와 사용자 정보 정확도에 미치는 영향 정리" },
      { phase: "Redesign Logic", description: "드롭다운 항목을 데이터 기준으로 자동 렌더링하는 구조 설계" },
      { phase: "Verify", description: "신규 항목 추가 시 화면 반영 여부와 기존 선택 흐름을 검증" },
      { phase: "Stabilize", description: "운영 중 요구사항을 반영하며 관리 방식과 화면 사용성을 보완" }
    ],
    features: [
      { title: "내부 고객 문제 정의", description: "운영진의 반복 입력 업무를 단순 불편이 아니라 서비스 최신성 리스크로 해석했습니다." },
      { title: "데이터 기반 자동 반영", description: "항목 변경이 UI에 자동 반영되도록 구조를 바꿔 수동 관리 의존도를 낮췄습니다." },
      { title: "QA 관점 검증", description: "항목 추가, 기존 선택값 유지, 빈 값 노출 등 운영 중 발생 가능한 케이스를 확인했습니다." },
      { title: "개발팀과 공유하기 쉬운 정리", description: "문제 원인과 개선 방향을 UI, 데이터, 렌더링 로직 단위로 나누어 설명했습니다." }
    ],
    tech: ["Admin", "Data-driven UI", "Manual QA", "HTML5", "CSS", "JavaScript", "jQuery", "EJS"],
    metrics: [
      { value: "80+", label: "자동 반영 항목" },
      { value: "90%+", label: "반영 시간 단축" },
      { value: "1", label: "운영 리스크 개선" },
      { value: "CX+QA", label: "문제 해석 관점" }
    ],
    results: [
      "신규 항목 반영 시간을 90% 이상 줄여 운영자의 반복 업무를 크게 감소",
      "사용자가 별도 요청 없이 최신 데이터가 반영된 선택지를 확인하도록 개선",
      "개발 작업을 내부 운영 효율과 고객 정보 정확도 개선 결과로 정리"
    ],
    nextProject: "onboarding-qa-system"
  },
  "onboarding-qa-system": {
    title: "Onboarding Ops System",
    subtitle: "신규 입사자가 업무 흐름과 코드 품질 기준을 빠르게 이해하도록 만든 내부 운영 체계",
    year: "2023-2026",
    role: "Internal Ops / SOP",
    client: "Union Contents",
    duration: "Frontend Developer",
    team: ["Development", "New Joiners", "Reviewers"],
    overview: "신규 입사자의 빠른 실무 적응을 위해 사내 홈페이지 클론코딩 기반 온보딩 과제를 설계하고 운영했습니다. 신규 구성원이 필요한 정보를 빠르게 파악하고 피드백을 받을 수 있도록 과제와 리뷰 흐름을 만들었습니다.",
    developerFrame: "사내 홈페이지 클론코딩 과제를 만들고 PR 기반 코드 리뷰를 진행했습니다.",
    cxFrame: "신규 입사자가 업무 초기에 겪는 정보 탐색 비용과 기준 불명확성을 줄이고 싶었습니다. 과제, 리뷰, 피드백 흐름을 정리해 팀의 작업 기준을 일관되게 전달했습니다.",
    challenge: "신규 구성원이 코드 컨벤션, 기술 스택, 업무 흐름을 개별적으로 파악하면 적응 시간이 길어지고 리뷰 기준도 일관되지 않을 수 있습니다. 이는 팀 생산성과 결과물 품질에 직접 영향을 줍니다.",
    solution: "온보딩 과제와 PR 기반 코드 리뷰를 구성해 신규 입사자가 실제 업무 방식에 가까운 환경에서 학습하도록 했습니다. 반복해서 설명하던 기준은 과제와 리뷰 흐름 안에 녹였습니다.",
    process: [
      { phase: "Define Standard", description: "팀에서 중요하게 보는 코드 컨벤션과 화면 구현 기준 정리" },
      { phase: "Design Task", description: "사내 홈페이지 클론코딩 과제로 실무와 가까운 학습 흐름 설계" },
      { phase: "Review", description: "PR 기반으로 코드 품질, 협업 방식, 업무 흐름에 대한 피드백 제공" },
      { phase: "Improve Fit", description: "신규 입사자가 막히는 지점을 확인하고 안내 방식을 보완" },
      { phase: "Transfer Knowledge", description: "반복되는 질문과 기준을 다음 온보딩에 활용할 수 있게 정리" }
    ],
    features: [
      { title: "온보딩 흐름 설계", description: "신규 입사자가 처음 겪는 정보 탐색, 과제 수행, 피드백 수신 과정을 하나의 흐름으로 정리했습니다." },
      { title: "리뷰 기준 정리", description: "코드 스타일, 화면 구현, 협업 방식에 대한 기대치를 리뷰 기준으로 전달했습니다." },
      { title: "반복 문의 감소", description: "같은 질문이 반복되는 지점을 온보딩 구조 안에서 먼저 안내하도록 개선했습니다." },
      { title: "운영형 커뮤니케이션", description: "상대의 이해 수준에 맞춰 문제를 설명하고 다음에 확인할 작업을 알려줬습니다." }
    ],
    tech: ["Onboarding", "PR Review", "SOP", "Internal CX", "Code Quality", "Feedback"],
    metrics: [
      { value: "1", label: "온보딩 체계" },
      { value: "PR", label: "리뷰 기반 운영" },
      { value: "3", label: "핵심 기준" },
      { value: "SOP", label: "운영 기준화" }
    ],
    results: [
      "신규 입사자가 내부 코드 컨벤션과 기술 스택을 빠르게 이해하도록 지원",
      "코드 품질, 협업 방식, 업무 흐름에 대한 피드백 루프를 구축",
      "반복되는 안내와 피드백을 SOP 형태로 정리하는 경험 확보"
    ],
    nextProject: "seomse-reservation-cx"
  },
  "seomse-reservation-cx": {
    title: "SEOMSE Reservation CX",
    subtitle: "정보 부족으로 생기는 예약 불안을 줄이고 상담-예약-관리 흐름을 설계한 MVP",
    year: "2025",
    role: "Service CX / Product",
    client: "SEOMSE",
    duration: "Side Project",
    team: ["Frontend", "Planning", "Beauty Domain"],
    overview: "미용실 예약 과정에서 고객이 시술 유형, 모발 상태, 참고 이미지를 충분히 전달하지 못하면 상담 품질이 흔들릴 수 있습니다. 뷰티 전공과 미용 서비스 경험을 살려 고객 예약 흐름과 관리자 확인 흐름을 설계했고, 이미지 중심 서비스의 초기 로딩 속도도 성능 테스트로 점검했습니다.",
    developerFrame: "React와 TypeScript로 예약 서비스 MVP의 프론트엔드 대부분을 단독 구현했습니다.",
    cxFrame: "예약 전 정보가 부족해 고객은 원하는 시술을 설명하기 어렵고 매장은 상담 준비가 어려운 문제를 발견했습니다. 시술 유형, 모발 상태, 참고 이미지 입력 흐름을 설계했고, 이미지 용량을 약 12MB에서 1.4MB로 줄여 고객이 첫 화면에서 이탈할 수 있는 성능 리스크까지 개선했습니다.",
    challenge: "예약 전 정보가 부족하면 고객은 원하는 결과를 설명하기 어렵고, 매장은 상담과 일정 조율에 추가 시간을 쓰게 됩니다. 고객과 운영자 모두에게 불확실성이 커지는 구조였습니다.",
    solution: "시술 유형, 모발 상태, 참고 이미지 첨부를 포함한 예약 프로세스를 만들고, 관리자 페이지에서 예약 정보를 확인할 수 있는 구조를 제안했습니다. 이미지 리소스는 WebP 전환과 반복 PNG 정리로 약 88~91% 줄였고, Google Analytics로 유입 경로와 예약 전환 흐름을 확인할 수 있게 했습니다.",
    process: [
      { phase: "Listen", description: "미용 서비스 경험을 살려 예약 전 정보 부족 문제 확인" },
      { phase: "Structure", description: "고객이 입력해야 할 정보와 매장이 확인해야 할 정보를 분리" },
      { phase: "Build MVP", description: "제한된 시간과 인력 안에서 주요 프론트엔드 기능 대부분을 단독 구현" },
      { phase: "Measure", description: "Google Analytics로 유입 경로와 예약 흐름 확인" },
      { phase: "Optimize", description: "약 12MB 이미지 리소스를 WebP 전환과 반복 파일 정리로 약 1.4MB까지 축소" }
    ],
    features: [
      { title: "고객 불안 감소", description: "고객이 원하는 시술 정보를 예약 전에 구체적으로 전달할 수 있도록 입력 흐름을 설계했습니다." },
      { title: "관리자 확인 흐름", description: "매장이 상담과 예약 관리에 필요한 정보를 빠르게 확인하는 방향을 제안했습니다." },
      { title: "유입 흐름 확인", description: "유입 경로와 예약 전환 흐름을 확인할 수 있도록 GA를 연동했습니다." },
      { title: "성능 품질 개선", description: "PNG/JPG 중심의 47개 이미지 리소스를 정리하고 WebP 31개를 적용해 총 이미지 용량을 약 88~91% 절감했습니다." }
    ],
    tech: ["React", "TypeScript", "CSS Module", "Google Analytics", "Lazy Loading", "WebP"],
    metrics: [
      { value: "90%", label: "프론트엔드 단독 담당" },
      { value: "12MB→1.4MB", label: "이미지 용량" },
      { value: "88%↓", label: "리소스 절감" },
      { value: "77→89", label: "Lighthouse 성능" }
    ],
    performanceAudit: {
      before: [
        { label: "Performance", value: "77" },
        { label: "Image Weight", value: "~12MB" },
        { label: "WebP", value: "0 files" }
      ],
      after: [
        { label: "Performance", value: "89" },
        { label: "Accessibility", value: "95" },
        { label: "Best Practices", value: "78" },
        { label: "SEO", value: "100" }
      ],
      vitals: [
        { label: "FCP", value: "0.4s" },
        { label: "LCP", value: "1.3s" },
        { label: "Speed Index", value: "0.6s" },
        { label: "TBT", value: "0ms" },
        { label: "CLS", value: "0.163" }
      ],
      note: "After 측정에서 CLS가 0.163으로 남아 Performance가 90점대까지 올라가지는 않았습니다. 그래도 이미지 용량과 초기 렌더링 지표가 개선되어 첫 화면 진입 속도는 좋아졌습니다."
    },
    results: [
      "고객 예약 정보 부족 문제를 입력 흐름에 반영",
      "예약 전환 흐름을 확인할 수 있도록 GA를 연동",
      "학생창업유망팀 U300 본선에 진출하며 서비스 기획과 구현 가능성을 검증",
      "이미지 용량을 약 10.6MB 절감하고 성능 점수를 77점에서 89점으로 개선해 초기 사용 경험을 향상"
    ],
    nextProject: "service-flow-qa"
  },
  "service-flow-qa": {
    title: "Service Flow QA",
    subtitle: "기획서 기반 화면 흐름, 요구사항 반영, 다국어 어드민 검토",
    year: "2023-2026",
    role: "QA / Issue Triage",
    client: "Union Contents",
    duration: "Frontend Developer",
    team: ["Planning", "Development", "Client Communication"],
    overview: "저작권 모니터링 서비스와 B2B 관리자 페이지를 개발하며 기획서를 기준으로 전체 화면 흐름을 검토했습니다. 운영 중 발생한 요구사항은 기능 추가와 화면 개선으로 반영했고, 실제 화면에서 조건이 빠지지 않았는지도 함께 확인했습니다.",
    developerFrame: "기획서를 기준으로 서비스 화면을 개발하고, 클라이언트 요청에 따라 기능 추가와 화면 개선을 반영했습니다.",
    cxFrame: "요구사항이 화면에 구현될 때 고객과 운영자가 어떤 순서로 기능을 쓰는지 확인했습니다. 다국어 환경, 어드민 입력 흐름, 화면 전환, 정보 노출 조건을 보며 누락되면 문의나 운영 오류로 이어질 수 있는 지점을 점검했습니다.",
    challenge: "기획서에는 기능 단위 요구사항이 정리되어 있어도 실제 사용자는 여러 화면을 이어서 사용합니다. 특히 관리자 페이지와 다국어 페이지는 입력, 저장, 조회, 언어 전환, 권한별 정보 노출처럼 연결된 조건이 많아 단일 화면만 확인하면 문제를 놓칠 수 있습니다.",
    solution: "화면 흐름을 사용자 행동 순서로 다시 보고, 정상 흐름과 예외 조건을 나누어 확인했습니다. 클라이언트 요청 의도를 파악한 뒤 개발팀이 확인해야 할 조건과 영향 범위를 기능 단위로 정리했습니다.",
    process: [
      { phase: "Read Requirements", description: "기획서와 요청사항을 기능, 화면, 데이터 조건으로 분해" },
      { phase: "Map User Flow", description: "어드민 입력, 조회, 수정, 언어 전환 흐름을 사용자 행동 순서로 정리" },
      { phase: "Check Conditions", description: "정상 케이스와 빈 값, 누락 데이터, 언어별 표시 차이를 확인" },
      { phase: "Report Gap", description: "요구사항과 실제 화면 사이의 차이를 재현 조건과 함께 공유" },
      { phase: "Regression Review", description: "기능 추가 후 기존 화면 흐름이 깨지지 않는지 재확인" }
    ],
    features: [
      { title: "요구사항 기반 검증", description: "기획서 내용을 그대로 구현하는 데서 끝내지 않고, 실제 화면 흐름에서 요구사항이 충족되는지 확인했습니다." },
      { title: "다국어 QA 관점", description: "한-영 다국어 환경에서 언어가 바뀌어도 동일한 흐름으로 서비스를 이용할 수 있는지 점검했습니다." },
      { title: "어드민 흐름 검증", description: "관리자가 입력한 데이터가 사용자가 보는 화면에 정확히 반영되는지 연결 흐름을 확인했습니다." },
      { title: "이슈 전달력", description: "문제를 발견했을 때 화면, 조건, 기대 결과, 실제 결과를 나누어 개발팀이 바로 확인할 수 있게 정리했습니다." }
    ],
    tech: ["Requirements Review", "Manual QA", "Regression", "Admin QA", "i18n", "Issue Triage"],
    metrics: [
      { value: "i18n", label: "한-영 다국어 검증" },
      { value: "Admin", label: "관리자 흐름" },
      { value: "Flow", label: "화면 전환 검토" },
      { value: "Triage", label: "이슈 조건 정리" }
    ],
    results: [
      "기획서 기반 기능 개발 과정에서 요구사항과 화면 흐름을 함께 검토",
      "다국어와 어드민 화면에서 사용자 흐름이 끊기지 않도록 조건을 확인",
      "클라이언트 요청사항을 기능 단위로 정리해 개발팀에 전달"
    ],
    nextProject: "seo-accessibility-quality"
  },
  "seo-accessibility-quality": {
    title: "Accessibility & SEO QA",
    subtitle: "검색 노출, 정보 구조, 접근성을 사용자 관점에서 점검",
    year: "2023-2026",
    role: "Quality Improvement",
    client: "Union Contents / SEO Guide",
    duration: "Frontend + Writing",
    team: ["Frontend", "Design", "Content"],
    overview: "서비스 화면 리뉴얼과 SEO 가이드 집필 과정에서 접근성, 정보 전달 구조, 검색 친화성을 다뤘습니다. 사용자가 필요한 정보를 찾고 이해하는 과정에 영향을 주는 요소를 프론트엔드 관점에서 점검했습니다.",
    developerFrame: "접근성과 SEO를 고려해 UI를 개선하고 프론트엔드 개발자를 위한 SEO 가이드를 공동 집필했습니다.",
    cxFrame: "사용자가 필요한 정보를 찾지 못하거나 화면 내용을 이해하기 어려운 지점을 확인했습니다. 색상 대비, 정보 구조, 검색 친화성을 개선 기준으로 보고 더 많은 사용자가 같은 정보를 안정적으로 얻을 수 있게 했습니다.",
    challenge: "색상 대비, 정보 구조, 로딩 속도, 검색 노출 기준이 부족하면 고객은 필요한 정보를 찾기 어렵고 서비스 신뢰도도 낮아질 수 있습니다. 개발팀과 비개발 직군이 같은 기준으로 화면을 보는 것도 중요했습니다.",
    solution: "서비스 화면의 UI 리뉴얼과 사용자 흐름 개선 과정에서 접근성을 고려했습니다. SEO 가이드 공동 집필 때는 복잡한 기술 개념을 읽기 쉬운 순서로 정리했습니다.",
    process: [
      { phase: "Audit", description: "색상 대비, 정보 전달 구조, 화면 흐름에서 사용자가 막힐 수 있는 지점 확인" },
      { phase: "Improve UI", description: "기반 디자인 틀을 활용해 서비스 화면 UI 리뉴얼과 흐름 개선 진행" },
      { phase: "Explain", description: "SEO의 개념과 등장 배경을 프론트엔드 관점에서 이해하기 쉽게 구조화" },
      { phase: "Collaborate", description: "Figma로 표지 디자인 방향과 레이아웃을 검토하며 시각적 완성도 보완" },
      { phase: "Clarify", description: "기술 기준을 사용자가 정보를 찾는 과정과 연결해 설명" }
    ],
    features: [
      { title: "접근성 관점", description: "색상 대비와 정보 전달 구조를 고려해 다양한 사용자 환경에서의 사용성을 높였습니다." },
      { title: "정보 구조화", description: "기술 개념을 독자가 이해하기 쉬운 순서와 표현으로 정리했습니다." },
      { title: "유관 부서 협업", description: "디자인, 콘텐츠, 개발 관점을 함께 확인하며 결과물을 다듬었습니다." },
      { title: "사용자 관점 설명", description: "SEO와 접근성을 코드 문제가 아니라 사용자가 정보를 찾는 과정과 연결해 설명했습니다." }
    ],
    tech: ["Accessibility", "SEO", "Figma", "UI Renewal", "Content Structure", "Frontend QA"],
    metrics: [
      { value: "1", label: "SEO 가이드 공동 집필" },
      { value: "A11y", label: "접근성 고려" },
      { value: "UI", label: "화면 흐름 개선" },
      { value: "UX", label: "정보 탐색 흐름" }
    ],
    results: [
      "접근성과 정보 전달 구조를 고려한 서비스 화면 개선 경험 확보",
      "SEO 개념을 비전공자도 이해할 수 있는 구조로 정리하고 집필",
      "기술 기준을 사용자 정보 탐색 흐름과 연결해 설명"
    ],
    nextProject: "admin-ops-automation"
  }
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = id ? projectData[id as keyof typeof projectData] : null;
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Case not found</h1>
          <Link to="/" className="underline">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 md:py-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 hover:opacity-50 transition-opacity text-sm md:text-base">
            <ArrowLeft size={18} className="md:w-5 md:h-5" />
            <span className="tracking-tight">Back</span>
          </Link>
          <Link to={`/project/${project.nextProject}`} className="flex items-center gap-2 hover:opacity-50 transition-opacity text-sm md:text-base">
            <span className="tracking-tight hidden md:inline">Next Case</span>
            <span className="tracking-tight md:hidden">Next</span>
            <ArrowRight size={18} className="md:w-5 md:h-5" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-24 md:pt-32 pb-12 md:pb-20 px-6 md:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            style={{ opacity: heroOpacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 md:mb-8 flex gap-4 md:gap-8 text-xs md:text-sm text-neutral-500 flex-wrap">
              <span>{project.year}</span>
              <span className="hidden md:inline">{project.role}</span>
              <span>{project.client}</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl tracking-tighter mb-4 md:mb-6 leading-[0.95]">
              {project.title}
            </h1>
            <p className="text-lg md:text-2xl text-neutral-600 max-w-3xl">
              {project.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="px-6 md:px-8 mb-16 md:mb-32"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden group cursor-pointer">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop"
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-white rounded-full flex items-center justify-center">
                <Play className="text-white ml-1" size={24} />
              </div>
            </div>
          </div>
          <p className="text-xs md:text-sm text-neutral-400 mt-3 md:mt-4 text-center">Case evidence and workflow summary</p>
        </div>
      </motion.section>

      {/* Case Info Grid */}
      <section className="px-6 md:px-8 mb-16 md:mb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          <div>
            <h3 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-3 md:mb-4">DURATION</h3>
            <p className="text-lg md:text-xl">{project.duration}</p>
          </div>
          <div>
            <h3 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-3 md:mb-4">DOMAIN</h3>
            <p className="text-lg md:text-xl">{project.client}</p>
          </div>
          <div>
            <h3 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-3 md:mb-4">ARTIFACT</h3>
            <a href="#reframe" className="text-lg md:text-xl flex items-center gap-2 hover:opacity-50 transition-opacity">
              Case Point <ExternalLink size={16} className="md:w-[18px] md:h-[18px]" />
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section id="reframe" className="px-6 md:px-8 mb-16 md:mb-32 scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {project.metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 md:p-8 border border-neutral-200 rounded-lg hover:border-neutral-400 transition-colors"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl tracking-tight mb-2 md:mb-3">{metric.value}</div>
                <div className="text-xs md:text-sm text-neutral-500 tracking-wide">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="px-6 md:px-8 mb-16 md:mb-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-6 md:mb-8">OVERVIEW</h2>
          <p className="text-lg md:text-2xl leading-relaxed text-neutral-700">
            {project.overview}
          </p>
        </div>
      </section>

      {/* Case Point */}
      <section className="px-6 md:px-8 mb-16 md:mb-32">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-8 md:mb-12">CASE POINT</h2>
          <div className="grid md:grid-cols-2 border border-neutral-200 rounded-lg overflow-hidden">
            <div className="p-6 md:p-10 bg-neutral-50 border-b md:border-b-0 md:border-r border-neutral-200">
              <p className="text-xs md:text-sm tracking-widest text-neutral-400 mb-4">DEVELOPMENT VIEW</p>
              <p className="text-base md:text-xl leading-relaxed text-neutral-600">
                {project.developerFrame}
              </p>
            </div>
            <div className="p-6 md:p-10 bg-white">
              <p className="text-xs md:text-sm tracking-widest text-neutral-400 mb-4">CX / QA VIEW</p>
              <p className="text-base md:text-xl leading-relaxed text-neutral-800">
                {project.cxFrame}
              </p>
            </div>
          </div>
        </div>
      </section>

      {"performanceAudit" in project && project.performanceAudit && (
        <section className="px-6 md:px-8 mb-16 md:mb-32">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 md:mb-12">
              <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-4">WEB PERFORMANCE AUDIT</h2>
              <p className="text-lg md:text-2xl leading-relaxed text-neutral-700 max-w-4xl">
                Lighthouse Before/After 캡처를 기준으로 이미지 최적화가
                고객의 첫 화면 진입 경험에 어떤 영향을 주었는지 정리했습니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
              <div className="border border-neutral-200 rounded-lg p-6 md:p-8 bg-neutral-50">
                <p className="text-xs md:text-sm tracking-widest text-neutral-400 mb-6">BEFORE</p>
                <div className="space-y-5">
                  {project.performanceAudit.before.map((item) => (
                    <div key={item.label} className="flex items-end justify-between gap-4 border-b border-neutral-200 pb-4">
                      <span className="text-sm md:text-base text-neutral-500">{item.label}</span>
                      <span className="text-3xl md:text-4xl tracking-tight">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-neutral-200 rounded-lg p-6 md:p-8 bg-white">
                <p className="text-xs md:text-sm tracking-widest text-neutral-400 mb-6">AFTER</p>
                <div className="space-y-5">
                  {project.performanceAudit.after.map((item) => (
                    <div key={item.label} className="flex items-end justify-between gap-4 border-b border-neutral-200 pb-4">
                      <span className="text-sm md:text-base text-neutral-500">{item.label}</span>
                      <span className="text-3xl md:text-4xl tracking-tight">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-neutral-200 rounded-lg p-6 md:p-8 mb-6">
              <p className="text-xs md:text-sm tracking-widest text-neutral-400 mb-6">AFTER CORE METRICS</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                {project.performanceAudit.vitals.map((item) => (
                  <div key={item.label} className="border-t border-neutral-200 pt-4">
                    <div className="text-sm text-neutral-500 mb-2">{item.label}</div>
                    <div className="text-2xl md:text-3xl tracking-tight">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
              {project.performanceAudit.note}
            </p>
          </div>
        </section>
      )}

      {/* Process Timeline */}
      <section className="px-6 md:px-8 mb-16 md:mb-32 bg-neutral-50 py-16 md:py-32">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-12 md:mb-16">PROCESS</h2>
          <div className="space-y-1">
            {project.process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group py-6 md:py-8 border-t border-neutral-200 hover:bg-white transition-colors"
              >
                <div className="flex items-start gap-4 md:gap-8 lg:gap-16">
                  <div className="text-4xl md:text-5xl lg:text-6xl tracking-tighter text-neutral-200 group-hover:text-black transition-colors w-16 md:w-20 lg:w-24 flex-shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl lg:text-3xl tracking-tight mb-2 md:mb-3">{step.phase}</h3>
                    <p className="text-base md:text-lg text-neutral-600">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="px-6 md:px-8 mb-16 md:mb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-24">
          <div>
            <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-6 md:mb-8">CHALLENGE</h2>
            <p className="text-base md:text-xl leading-relaxed text-neutral-700">
              {project.challenge}
            </p>
          </div>
          <div>
            <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-6 md:mb-8">SOLUTION</h2>
            <p className="text-base md:text-xl leading-relaxed text-neutral-700">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="px-6 md:px-8 mb-16 md:mb-32">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-12 md:mb-16">KEY RESPONSIBILITIES</h2>
          <div className="grid md:grid-cols-2 gap-10 md:gap-12">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="mb-3 md:mb-4">
                  <div className="w-10 md:w-12 h-px bg-black group-hover:w-20 md:group-hover:w-24 transition-all"></div>
                </div>
                <h3 className="text-xl md:text-2xl tracking-tight mb-2 md:mb-3">{feature.title}</h3>
                <p className="text-base md:text-lg text-neutral-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="px-6 md:px-8 mb-16 md:mb-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-12 md:mb-16">WORKFLOW SNAPSHOTS</h2>
          <div className="space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="aspect-[21/9] bg-neutral-900 rounded-lg overflow-hidden"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1600&h=686&fit=crop"
                alt="Case workflow wide"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=600&fit=crop"
              ].map((src, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="aspect-square bg-neutral-900 rounded-lg overflow-hidden"
                >
                  <ImageWithFallback
                    src={src}
                    alt={`Case detail ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="aspect-[4/3] bg-neutral-900 rounded-lg overflow-hidden"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=600&fit=crop"
                  alt="Case evidence 1"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="aspect-[4/3] bg-neutral-900 rounded-lg overflow-hidden"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
                  alt="Case evidence 2"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools and Methods */}
      <section className="px-6 md:px-8 mb-16 md:mb-32 bg-neutral-50 py-16 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-6 md:mb-8">TOOLS & METHODS</h2>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {project.tech.map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="px-4 py-2 md:px-6 md:py-3 border border-neutral-300 rounded-full text-sm md:text-lg hover:bg-black hover:text-white hover:border-black transition-all cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-6 md:mb-8">COLLABORATION</h2>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full flex-shrink-0"></div>
                  <span className="text-base md:text-xl">{project.role}</span>
                </div>
                {project.team.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-neutral-300 rounded-full flex-shrink-0"></div>
                    <span className="text-base md:text-xl text-neutral-600">{member}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-6 md:px-8 mb-16 md:mb-32 bg-neutral-950 text-white py-16 md:py-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs md:text-sm tracking-widest text-neutral-500 mb-10 md:mb-12">RESULTS</h2>
          <div className="space-y-6 md:space-y-8">
            {project.results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 md:gap-6"
              >
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full mt-2 md:mt-3 flex-shrink-0"></div>
                <p className="text-lg md:text-2xl leading-relaxed">{result}</p>
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
              <p className="text-xs md:text-sm tracking-widest text-neutral-400 mb-3 md:mb-4">NEXT CASE</p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-tighter group-hover:translate-x-4 transition-transform">
                {projectData[project.nextProject as keyof typeof projectData].title}
              </h2>
            </div>
            <ArrowRight size={32} className="text-neutral-300 group-hover:text-black transition-colors flex-shrink-0 md:w-12 md:h-12" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-6 md:px-8 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-neutral-400">
          <p>© 2026</p>
          <p>Seoul, South Korea</p>
        </div>
      </footer>
    </div>
    </PageTransition>
  );
}
