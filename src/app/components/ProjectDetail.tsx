import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { Link, useParams } from "react-router";
import lighthouseAfterImage from "../../assets/img/after.png";
import lighthouseBeforeImage from "../../assets/img/before.png";
import seomseAdminReservationImage from "../../assets/img/seomse-admin-reservation.png";
import seomseMyReservationsImage from "../../assets/img/seomse-my-reservations.png";
import seomseNormalReservationImage from "../../assets/img/seomse-normal-reservation.png";
import seomseRequestImage from "../../assets/img/seomse-request-image.png";
import seomseRequestImage2 from "../../assets/img/seomse-request-image2.png";
import seomseScheduleImage from "../../assets/img/seomse-schedule.png";
import seomseShopDetailImage from "../../assets/img/seomse-shop-detail.png";
import seomseShopListImage from "../../assets/img/seomse-shop-list.png";
import seomseSpecialFilterImage from "../../assets/img/seomse-special-filter.png";
import seomseSpecialFilterImage2 from "../../assets/img/seomse-special-filter2.png";
import PageTransition from "./PageTransition";

const projectData = {
  "admin-ops-automation": {
    title: "관리자 데이터 반영 흐름 QA 및 누락 리스크 개선",
    subtitle:
      "수동 반영 과정에서 발생 가능한 누락 조건을 확인하고 데이터 기반 구조 전환 후 기존 흐름을 다시 검증한 사례",
    year: "2023-2026",
    role: "Admin Flow QA",
    client: "Union Contents",
    duration: "Frontend Developer",
    team: ["Service Operation", "Planning", "Development"],
    overview:
      "서비스에서는 국가별 항목을 관리하고 있었으며, 신규 국가가 추가될 때마다 여러 위치를 함께 수정해야 했습니다. 이 과정에서 일부 화면의 항목이 누락되거나 최신 데이터가 사용자에게 늦게 노출될 가능성이 있었습니다.\n\n변경 지점과 영향 범위를 확인한 뒤 데이터 기반 렌더링 구조로 전환했습니다. 신규 항목 추가, 기존 선택값 유지, 빈 값 노출 여부를 기준으로 화면을 다시 검증했으며, 관리 포인트를 줄여 누락 가능성과 반영 시간을 함께 낮췄습니다.",
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
      "신규 항목 추가 시 반영 대상 화면과 기존 선택 흐름을 기준으로 회귀 검증",
      "관리 포인트를 80개에서 10개로 줄여 누락 및 오류 가능성 감소",
      "신규 항목 반영 시간을 90% 이상 단축",
    ],
    nextProject: "seomse-reservation-cx",
  },
  "onboarding-qa-system": {
    title: "검증 기준을 문서화한 온보딩 QA 체계",
    subtitle:
      "반복되는 리뷰 항목을 체크리스트로 정리하고 일관된 기준으로 결과를 확인할 수 있게 만든 사례",
    year: "2023-2026",
    role: "Internal Ops / SOP",
    client: "Union Contents",
    duration: "Frontend Developer",
    team: ["Development", "New Joiners", "Reviewers"],
    overview:
      "신규 입사자의 과제 결과를 검토할 때 코드 스타일, 화면 구현, 협업 방식에 대한 기준이 구두로 전달되는 경우가 많았습니다. 검토 항목이 사람마다 달라지면 확인 누락과 반복 설명이 발생할 수 있었습니다.\n\n사내 홈페이지 개발 과제와 PR 리뷰 흐름을 만들고, 반복되는 확인 항목을 문서화했습니다. 과제 수행 → 리뷰 → 피드백 반영 순서로 결과를 확인해 신규 구성원이 동일한 기준을 이해하고 적용할 수 있도록 운영했습니다.",
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
      "Review Standard",
      "Code Quality",
      "Feedback",
    ],
    metrics: [],
    results: [
      "코드 스타일, 화면 구현, 협업 방식에 대한 반복 검증 항목 문서화",
      "과제 수행 → 리뷰 → 피드백 반영으로 이어지는 확인 프로세스 정립",
      "검토 기준을 일관되게 운영해 확인 누락과 반복 안내 감소",
    ],
    nextProject: "service-flow-qa",
  },
  "seomse-reservation-cx": {
    title: "SEOMSE 예약 기능 QA 및 성능 검증",
    subtitle:
      "일반 예약과 섬세 예약의 핵심 흐름을 테스트 케이스로 검증하고 사용자 경험에 영향을 주는 결함을 정리한 사례",
    year: "2025",
    role: "Product QA / Frontend",
    client: "SEOMSE",
    duration: "Side Project",
        team: ["Frontend", "Planning", "Beauty Domain", "QA"],
        overview:
            "SEOMSE는 기존 미용실 예약 서비스가 시술명과 일정 위주로 예약을 진행해 상담에 필요한 정보가 충분히 전달되지 않는 문제를 개선하고자 기획된 미용실 예약 서비스입니다. 사용자는 예약 과정에서 두피 타입, 모발 상태, 시술 이력, 요청사항, 참고 이미지를 함께 전달할 수 있으며, 관리자는 이를 바탕으로 고객 정보를 보다 상세하게 확인하고 상담 및 예약을 관리할 수 있습니다.\n\n본 QA는 예약 생성부터 예약 조회까지 이어지는 핵심 사용자 플로우를 대상으로 진행했습니다. 매장 목록 조회, 매장 상세, 일반 예약, 섬세 예약, 일정 선택, 예약 완료, 마이페이지 예약 조회, 관리자 예약 조회 기능을 중심으로 정상·예외 시나리오를 검증했습니다.\n\n총 32개의 테스트 케이스를 작성하고 5개의 주요 버그를 도출했으며, API 연동 결과와 데이터 반영 여부를 함께 확인하여 기능 동작과 사용자 흐름을 검증했습니다.",
    challenge:
      "예약 서비스는 화면 이동이 정상이어도 날짜, 시간, 매장, 디자이너, 사용자 정보가 함께 맞물리지 않으면 실제 예약 경험이 깨질 수 있습니다. 특히 미래 날짜 시간 슬롯, 디자이너 표시, 실패 피드백, 필수값 처리처럼 사용자가 예약 가능 여부를 판단하는 조건은 오픈 전 우선 검증이 필요했습니다.",
    solution:
      "사용자 예약 흐름을 일반 예약과 섬세 예약으로 나누고, 정상 시나리오와 필수값 누락, 서버 오류, 새로고침, 중복 클릭, 빈 데이터 같은 예외 조건을 함께 점검했습니다. 발견한 이슈는 재현 절차, 실제 결과, 기대 결과, 사용자 영향, 개선 방향으로 정리해 개발자가 바로 확인할 수 있는 형태로 문서화했습니다.",
    process: [
      {
        phase: "Analyze Flow",
        description:
          "매장 선택부터 예약 완료, 마이페이지, 관리자 조회까지 사용자 행동 순서로 분해",
      },
      {
        phase: "Define Scope",
        description:
          "일반 예약, 섬세 예약, 날짜/시간 선택, 예외 처리, 예약 조회를 In Scope로 정의",
      },
      {
        phase: "Design Cases",
        description:
          "정상 흐름, 입력값 검증, 비즈니스 규칙, 권한, 예외 상황, 동시성 리스크로 테스트 분류",
      },
      {
        phase: "Report Issues",
        description:
          "P1/P2/P3 우선순위로 결함을 나누고 재현 조건과 개선 방향 작성",
      },
      {
        phase: "Optimize",
        description:
          "WebP 전환, Lazy Loading, 이미지 정리로 Lighthouse 성능 점수 개선",
      },
    ],
    features: [
      {
        title: "예약 시나리오 QA",
        description:
          "매장 목록, 매장 상세, 일반 예약, 섬세 예약, 예약 완료, 마이페이지 조회를 사용자 흐름 기준으로 검증했습니다.",
      },
      {
        title: "섬세 예약 정보 검증",
        description:
          "두피 타입, 모발 유형, 모발 길이, 시술 이력, 요청사항, 참고 이미지가 예약 상세에 표시되는지 확인했습니다.",
      },
      {
        title: "결함 우선순위화",
        description:
          "미래 날짜 시간 슬롯 오류와 디자이너 필드 불일치를 P1으로 분류하고 사용자 영향을 함께 정리했습니다.",
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
      "Manual QA",
      "Test Case",
      "Bug Report",
      "API Response Check",
      "Google Analytics",
      "Lazy Loading",
      "WebP",
    ],
    metrics: [
      { value: "13MB → 1.4MB", label: "이미지 리소스 최적화" },
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
      "예약 생성부터 관리자 조회까지 이어지는 핵심 플로우를 UI 기반 시나리오로 검증",
      "미래 날짜 시간 슬롯, 디자이너 정보 표시, 실패 피드백 부재 등 주요 결함 도출",
      "Lazy Loading과 WebP 적용으로 이미지 리소스와 Lighthouse 성능 지표 개선",
    ],
    nextProject: "service-flow-qa",
  },
  "service-flow-qa": {
    title: "다국어·권한별 서비스 플로우 회귀 검증",
    subtitle:
      "B2B 관리자 페이지를 대상으로 권한, 다국어, CRUD 흐름을 회귀 검증한 사례",
    year: "2023-2026",
    role: "QA / Issue Triage",
    client: "Union Contents",
    duration: "Frontend Developer",
    team: ["Planning", "Development", "Client Communication"],
    overview:
      "B2B 관리자 페이지 개발 과정에서 다국어 환경(i18n)과 권한 기반 접근 제어 기능을 대상으로 회귀 검증을 수행했습니다.\n\n신규 기능 추가 및 화면 개선 이후에도 기존 기능이 정상적으로 동작하는지 확인하기 위해 관리자 계정 유형별 접근 권한, 메뉴 노출 조건, 데이터 등록·수정·삭제 기능을 중심으로 검증했습니다. 또한 한·영 언어 전환 시 번역 누락, UI 깨짐, 데이터 표시 오류가 발생하지 않는지 점검했습니다.\n\n기획서와 실제 구현 결과를 비교하며 테스트를 진행했고, 정상 시나리오뿐 아니라 권한이 없는 사용자의 접근, 필수 입력값 누락, 빈 데이터 상태, 최대 입력 길이 초과, API 예외 응답 상황 등을 함께 검증했습니다.\n\n특히 기능 수정 이후 등록·수정·삭제 기능이 기존과 동일하게 동작하는지, 언어 변경 및 권한 변경에 따라 화면 노출 조건이 의도한 대로 유지되는지 확인하며 회귀 테스트를 수행했습니다.",
    challenge:
      "기획서에는 기능 단위 요구사항이 정리되어 있어도 실제 사용자는 로그인, 메뉴 접근, 데이터 입력, 저장, 조회, 언어 전환을 연속된 흐름으로 사용합니다. 관리자 페이지와 다국어 페이지는 권한, 데이터 상태, 언어 상태가 함께 바뀌기 때문에 단일 화면만 확인하면 기존 기능 영향도를 놓칠 수 있습니다.",
    solution:
      "관리자 계정 유형, 메뉴 노출 조건, 등록·수정·삭제 흐름, 한·영 언어 전환을 테스트 축으로 나누고 기능 변경 후 기존 동작이 유지되는지 반복 확인했습니다. 발견한 차이는 조건, 기대 결과, 실제 결과, 영향 범위로 정리해 수정 범위와 회귀 확인 대상을 명확히 했습니다.",
    process: [
      {
        phase: "Read Requirements",
        description: "기획서와 요청사항을 기능, 화면, 데이터 조건으로 분해",
      },
      {
        phase: "Map User Flow",
        description:
          "관리자 로그인, 권한별 메뉴 접근, CRUD, 언어 전환 흐름을 사용자 행동 순서로 정리",
      },
      {
        phase: "Check Conditions",
        description:
          "권한 없음, 필수값 누락, 빈 데이터, 최대 입력 길이, API 예외 응답 조건 확인",
      },
      {
        phase: "Report Gap",
        description: "요구사항과 실제 화면 사이의 차이를 재현 조건과 함께 공유",
      },
      {
        phase: "Regression Review",
        description:
          "기능 수정 이후 등록·수정·삭제, 권한 변경, 언어 전환 동작이 유지되는지 재확인",
      },
    ],
    features: [
      {
        title: "권한별 접근 검증",
        description:
          "관리자 계정 유형에 따라 접근 가능한 메뉴와 제한되어야 하는 화면이 의도대로 분리되는지 확인했습니다.",
      },
      {
        title: "다국어 회귀 검증",
        description:
          "한·영 전환 후 번역 누락, UI 깨짐, 데이터 표시 오류가 발생하지 않는지 반복 확인했습니다.",
      },
      {
        title: "CRUD 흐름 검증",
        description:
          "관리자 데이터 등록, 수정, 삭제 후 목록과 상세 화면에 변경 결과가 정상 반영되는지 확인했습니다.",
      },
      {
        title: "예외 조건 확인",
        description:
          "필수값 누락, 빈 데이터 상태, 최대 입력 길이 초과, API 예외 응답 상황을 함께 검증했습니다.",
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
    metrics: [
      { value: "18", label: "회귀 테스트 케이스" },
      { value: "3", label: "검증 영역" },
      { value: "2", label: "언어 전환 범위" },
    ],
    results: [
      "관리자 계정 유형별 메뉴 노출과 접근 제한 조건을 기준으로 권한 기반 회귀 검증 수행",
      "게시물 등록·수정·삭제 이후 목록, 상세, 사용자 노출 화면에 데이터가 정상 반영되는지 확인",
      "한·영 언어 전환 시 번역 누락, 레이아웃 깨짐, 데이터 표시 오류가 없는지 검증",
      "필수 입력값 누락, 빈 데이터 상태, 최대 입력 길이 초과, API 예외 응답 등 예외 조건 확인",
      "기능 수정 이후 권한 변경과 언어 변경 상태에서도 기존 CRUD 흐름이 유지되는지 재검증",
    ],
    nextProject: "seomse-reservation-cx",
  },
  "seo-accessibility-quality": {
    title: "웹 접근성 및 SEO 품질 점검",
    subtitle:
      "검색 노출, 정보 구조, 색상 대비를 기준으로 사용자가 정보를 탐색하는 흐름을 확인한 사례",
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

const seomseKeyIssues = [
  {
    priority: "P1",
    title: "미래 날짜 시간 슬롯 오류",
    impact:
      "내일 또는 미래 날짜를 선택해도 현재 시각 기준으로 시간이 필터링되어 예약 가능한 시간이 사라질 수 있음",
  },
  {
    priority: "P1",
    title: "디자이너 닉네임 필드 불일치",
    impact:
      "API 타입은 nickName, 화면 참조는 nickname으로 달라 실제 이름 대신 기본 문구가 표시될 수 있음",
  },
  {
    priority: "P2",
    title: "예약 실패 피드백 부재",
    impact:
      "서버 오류나 네트워크 오류 발생 시 사용자에게 실패 사유가 보이지 않아 예약 성공 여부를 판단하기 어려움",
  },
  {
    priority: "P2",
    title: "필수값 미선택 상태 표현 부족",
    impact:
      "서비스 미선택 시 이동은 막히지만 버튼이 활성처럼 보여 사용자가 화면 오류로 오해할 수 있음",
  },
  {
    priority: "P2",
    title: "매장 정렬/필터 탭 미동작",
    impact:
      "리뷰순, 평점순, 가격 낮은순 탭을 눌러도 목록 결과가 바뀌지 않아 탐색 편의성이 낮아짐",
  },
];

const seomseArtifacts = [
  {
    title: "Test Case (32건)",
    description:
      "예약 생성·조회·관리 플로우에 대한 정상 및 예외 시나리오 검증",
  },
  {
    title: "Bug Report (5건)",
    description:
      "재현 절차, 기대 결과, 실제 결과, 영향도 및 개선 방향 정리",
  },
  {
    title: "API 확인 근거",
    description:
      "필드명 불일치와 실패 응답 등 버그 원인 분석에 활용한 API 응답 확인",
  },
  {
    title: "QA Summary",
    description: "검증 범위, 테스트 결과, 주요 결함 및 개선 사항 요약",
  },
];

const seomseResultSummary = [
  { label: "PASS", value: 23, color: "bg-emerald-500" },
  { label: "FAIL", value: 8, color: "bg-rose-500" },
  { label: "BLOCKED", value: 1, color: "bg-amber-500" },
];

const seomseIssueSummary = [
  { label: "P1", value: 2, width: "40%", color: "bg-rose-500" },
  { label: "P2", value: 3, width: "60%", color: "bg-amber-500" },
  { label: "P3", value: 3, width: "60%", color: "bg-neutral-400" },
];

const seomseScreenshots = [
  {
    step: "01",
    title: "예약 화면 진입",
    description: "API 기반 매장 카드 노출",
    qaPoint: "RES-01",
    status: "PASS",
    src: seomseShopListImage,
    alt: "SEOMSE 매장 목록 화면",
  },
  {
    step: "02",
    title: "매장 상세 확인",
    description: "상세 API 조회 후 BottomSheet 표시",
    qaPoint: "RES-03",
    status: "PASS",
    src: seomseShopDetailImage,
    alt: "SEOMSE 매장 상세 BottomSheet 화면",
  },
  {
    step: "03",
    title: "일반 예약 진입",
    description: "서비스/디자이너 선택 화면 이동",
    qaPoint: "RES-07 / RES-09",
    status: "FAIL",
    src: seomseNormalReservationImage,
    alt: "SEOMSE 일반 예약 서비스 선택 화면",
  },
  {
    step: "04",
    title: "일정 선택",
    description: "날짜 선택과 시간 슬롯 조건 확인",
    qaPoint: "RES-16",
    status: "FAIL",
    src: seomseScheduleImage,
    alt: "SEOMSE 일정 선택 화면",
  },
  {
    step: "05",
    title: "섬세 예약 필터 1",
    description: "두피 타입과 모발 유형 필수 선택",
    qaPoint: "RES-20 / RES-21",
    status: "PASS",
    src: seomseSpecialFilterImage,
    alt: "SEOMSE 섬세 예약 필터 첫 번째 화면",
  },
  {
    step: "06",
    title: "섬세 예약 필터 2",
    description: "모발 길이와 시술 이력 전달",
    qaPoint: "RES-22 / RES-23",
    status: "PASS",
    src: seomseSpecialFilterImage2,
    alt: "SEOMSE 섬세 예약 필터 두 번째 화면",
  },
  {
    step: "07",
    title: "요청사항 입력",
    description: "고객 요청사항 텍스트 입력",
    qaPoint: "Special flow",
    status: "PASS",
    src: seomseRequestImage,
    alt: "SEOMSE 요청사항 입력 화면",
  },
  {
    step: "08",
    title: "참고 이미지 첨부",
    description: "첨부 이미지 미리보기 표시",
    qaPoint: "RES-24",
    status: "PASS",
    src: seomseRequestImage2,
    alt: "SEOMSE 이미지 첨부 화면",
  },
  {
    step: "09",
    title: "사용자 예약 조회",
    description: "예약 목록과 예약 분류 표시",
    qaPoint: "RES-28 / RES-29",
    status: "PASS",
    src: seomseMyReservationsImage,
    alt: "SEOMSE 마이페이지 예약 조회 화면",
  },
  {
    step: "10",
    title: "관리자 예약 확인",
    description: "고객 입력 정보의 관리자 상세 전달",
    qaPoint: "RES-30 / RES-31",
    status: "PASS",
    src: seomseAdminReservationImage,
    alt: "SEOMSE 관리자 예약 상세 화면",
  },
];

const serviceFlowRegressionCases = [
  {
    id: "REG-001",
    area: "관리자 로그인",
    target: "관리자 계정 로그인",
    viewpoint: "권한별 초기 진입",
    expected: "계정 유형에 맞는 관리자 홈과 기본 메뉴가 표시됨",
    result: "PASS",
  },
  {
    id: "REG-002",
    area: "권한",
    target: "권한별 메뉴 노출",
    viewpoint: "메뉴 접근 제어",
    expected: "권한 없는 메뉴는 숨김 또는 접근 제한 처리됨",
    result: "PASS",
  },
  {
    id: "REG-003",
    area: "권한",
    target: "직접 URL 접근",
    viewpoint: "비정상 접근",
    expected: "권한 없는 사용자가 직접 URL 접근 시 차단됨",
    result: "PASS",
  },
  {
    id: "REG-004",
    area: "게시물",
    target: "게시물 등록",
    viewpoint: "신규 데이터 생성",
    expected: "필수값 입력 후 저장 시 목록과 상세에 신규 데이터가 표시됨",
    result: "PASS",
  },
  {
    id: "REG-005",
    area: "게시물",
    target: "게시물 수정",
    viewpoint: "기존 데이터 변경",
    expected: "수정 저장 후 목록, 상세, 사용자 화면에 변경 내용이 반영됨",
    result: "PASS",
  },
  {
    id: "REG-006",
    area: "게시물",
    target: "게시물 삭제",
    viewpoint: "데이터 제거",
    expected: "삭제 후 목록에서 제거되고 상세 URL 접근 시 예외 화면이 표시됨",
    result: "PASS",
  },
  {
    id: "REG-007",
    area: "입력값",
    target: "필수값 누락",
    viewpoint: "Validation",
    expected: "저장 요청 전 필수 입력 안내가 표시되고 저장이 차단됨",
    result: "PASS",
  },
  {
    id: "REG-008",
    area: "입력값",
    target: "최대 입력 길이 초과",
    viewpoint: "Boundary",
    expected: "정책 기준을 초과한 입력은 제한되거나 안내 문구가 표시됨",
    result: "PASS",
  },
  {
    id: "REG-009",
    area: "빈 데이터",
    target: "목록 데이터 없음",
    viewpoint: "Empty State",
    expected: "빈 목록 상태에서 안내 문구와 기본 액션이 표시됨",
    result: "PASS",
  },
  {
    id: "REG-010",
    area: "다국어",
    target: "한국어에서 영어 전환",
    viewpoint: "i18n 전환",
    expected: "메뉴, 버튼, 안내 문구가 영어로 전환되고 레이아웃이 깨지지 않음",
    result: "PASS",
  },
  {
    id: "REG-011",
    area: "다국어",
    target: "영어에서 한국어 전환",
    viewpoint: "i18n 복귀",
    expected: "언어 복귀 후 기존 화면 상태와 데이터 표시가 유지됨",
    result: "PASS",
  },
  {
    id: "REG-012",
    area: "다국어",
    target: "긴 영어 문구 표시",
    viewpoint: "UI 깨짐",
    expected: "긴 번역 문구가 버튼, 테이블, 카드 영역을 침범하지 않음",
    result: "PASS",
  },
  {
    id: "REG-013",
    area: "사용자 화면",
    target: "관리자 등록 데이터 노출",
    viewpoint: "Admin to User",
    expected: "관리자에서 등록한 데이터가 사용자 서비스 소개 페이지에 표시됨",
    result: "PASS",
  },
  {
    id: "REG-014",
    area: "사용자 화면",
    target: "관리자 수정 데이터 반영",
    viewpoint: "Data Sync",
    expected:
      "관리자 수정 후 사용자 화면의 텍스트와 이미지가 최신 상태로 표시됨",
    result: "PASS",
  },
  {
    id: "REG-015",
    area: "API 예외",
    target: "목록 조회 실패",
    viewpoint: "Exception",
    expected: "API 실패 시 빈 화면이 아닌 오류 안내 또는 재시도 상태가 표시됨",
    result: "CHECK",
  },
  {
    id: "REG-016",
    area: "API 예외",
    target: "저장 실패",
    viewpoint: "Exception",
    expected: "저장 실패 시 사용자가 실패 여부를 알 수 있는 안내가 표시됨",
    result: "CHECK",
  },
  {
    id: "REG-017",
    area: "회귀",
    target: "신규 기능 추가 후 기존 등록 흐름",
    viewpoint: "Regression",
    expected: "기능 추가 이후에도 기존 등록, 수정, 삭제 흐름이 유지됨",
    result: "PASS",
  },
  {
    id: "REG-018",
    area: "회귀",
    target: "권한·언어 변경 조합",
    viewpoint: "Regression",
    expected:
      "권한 변경과 언어 전환을 반복해도 메뉴 노출과 화면 상태가 의도대로 유지됨",
    result: "PASS",
  },
];

const adminDataQaCases = [
  {
    id: "ADM-001",
    area: "데이터 소스",
    target: "국가 항목 데이터 로딩",
    expected: "관리자 화면의 선택 항목이 단일 데이터 기준으로 렌더링됨",
    result: "PASS",
  },
  {
    id: "ADM-002",
    area: "신규 항목",
    target: "국가 추가 후 목록 반영",
    expected: "신규 국가 추가 시 관리자 선택 목록에 누락 없이 표시됨",
    result: "PASS",
  },
  {
    id: "ADM-003",
    area: "사용자 화면",
    target: "신규 항목 사용자 노출",
    expected: "관리자에서 추가된 항목이 사용자 화면의 선택지에도 동일하게 반영됨",
    result: "PASS",
  },
  {
    id: "ADM-004",
    area: "기존 데이터",
    target: "기존 선택값 유지",
    expected: "데이터 구조 전환 후에도 기존 저장값이 초기화되거나 다른 값으로 변경되지 않음",
    result: "PASS",
  },
  {
    id: "ADM-005",
    area: "빈 데이터",
    target: "항목 없음 상태",
    expected: "데이터가 비어 있을 때 깨진 UI 대신 빈 상태 또는 기본 안내가 표시됨",
    result: "PASS",
  },
  {
    id: "ADM-006",
    area: "정렬",
    target: "선택 항목 표시 순서",
    expected: "관리자와 사용자 화면에서 동일한 기준으로 항목 순서가 유지됨",
    result: "PASS",
  },
  {
    id: "ADM-007",
    area: "중복",
    target: "중복 항목 표시",
    expected: "동일 항목이 여러 관리 지점에서 중복 노출되지 않음",
    result: "PASS",
  },
  {
    id: "ADM-008",
    area: "회귀",
    target: "기존 등록/수정 흐름",
    expected: "데이터 기반 구조 전환 후 기존 등록, 수정, 저장 흐름이 유지됨",
    result: "PASS",
  },
  {
    id: "ADM-009",
    area: "운영 리스크",
    target: "관리 포인트 감소",
    expected: "항목 수정 시 여러 파일을 반복 수정하지 않고 단일 관리 지점에서 반영됨",
    result: "PASS",
  },
  {
    id: "ADM-010",
    area: "예외",
    target: "알 수 없는 항목 코드",
    expected: "정의되지 않은 코드가 들어와도 화면이 깨지지 않고 대체 표시됨",
    result: "CHECK",
  },
];

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
              <p className="text-base md:text-xl leading-[1.75] text-neutral-600 max-w-5xl">
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
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
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
            <p className="whitespace-pre-line max-w-5xl text-base md:text-xl leading-[1.85] text-neutral-700">
              {project.overview}
            </p>
          </div>
        </section>

        {id === "seomse-reservation-cx" && (
          <section className="px-6 md:px-8 mb-16 md:mb-24">
            <div className="max-w-6xl mx-auto">
              <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 md:p-6">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="mb-2 text-xs tracking-[0.18em] text-neutral-400">
                      FULL QA DOCUMENT
                    </p>
                    <h2 className="text-xl tracking-tight md:text-2xl">
                      테스트 케이스와 버그 리포트를 문서로 정리했습니다.
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-[1.8] text-neutral-600">
                      32개 테스트 케이스, 5개 주요 버그, 원인 분석 근거와 QA
                      회고를 한 페이지에서 확인할 수 있습니다.
                    </p>
                  </div>
                  <Link
                    to="/qa/seomse-reservation"
                    className="inline-flex shrink-0 justify-center rounded-full bg-neutral-900 px-5 py-2.5 text-sm text-white transition-opacity hover:opacity-80"
                  >
                    QA 문서 보기
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {id === "admin-ops-automation" && (
          <section className="px-6 md:px-8 mb-16 md:mb-24">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-6 md:mb-8">
                ADMIN DATA QA SCOPE
              </h2>
              <div className="mb-8 grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "반영 누락 검증",
                    value: "Data Sync",
                    note: "신규 항목이 관리자와 사용자 화면에 동일하게 반영되는지 확인",
                  },
                  {
                    title: "기존 흐름 회귀",
                    value: "Regression",
                    note: "데이터 구조 전환 후 기존 등록, 수정, 저장 흐름이 유지되는지 확인",
                  },
                  {
                    title: "운영 리스크 감소",
                    value: "Admin Ops",
                    note: "수동 수정 지점 축소로 누락 가능성과 반복 작업을 줄였는지 확인",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-neutral-200 p-5 md:p-6"
                  >
                    <p className="text-xs tracking-[0.18em] text-neutral-400">
                      {item.title}
                    </p>
                    <h3 className="mt-4 text-xl tracking-tight">
                      {item.value}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.7] text-neutral-500">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
              <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
                <table className="w-full min-w-[980px] text-left text-sm">
                  <thead className="bg-neutral-50 text-xs text-neutral-500">
                    <tr>
                      {[
                        "TC ID",
                        "영역",
                        "대상",
                        "기대 결과",
                        "판정",
                      ].map((head) => (
                        <th key={head} className="p-4">
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {adminDataQaCases.map((tc) => (
                      <tr key={tc.id} className="border-t">
                        <td className="p-4 font-medium">{tc.id}</td>
                        <td className="p-4">{tc.area}</td>
                        <td className="p-4">{tc.target}</td>
                        <td className="max-w-[420px] p-4 leading-[1.7] text-neutral-600">
                          {tc.expected}
                        </td>
                        <td className="p-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs ${
                              tc.result === "PASS"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {tc.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {id === "service-flow-qa" && (
          <section className="px-6 md:px-8 mb-16 md:mb-24">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-6 md:mb-8">
                REGRESSION TEST SCOPE
              </h2>
              <div className="mb-8 grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "권한 기반 접근",
                    value: "Admin Role",
                    note: "계정 유형별 메뉴 노출, 직접 URL 접근, 접근 제한 상태 확인",
                  },
                  {
                    title: "CRUD 흐름",
                    value: "Create / Update / Delete",
                    note: "관리자 데이터 변경 후 목록, 상세, 사용자 화면 반영 확인",
                  },
                  {
                    title: "다국어 회귀",
                    value: "KO / EN",
                    note: "언어 전환 후 번역 누락, UI 깨짐, 데이터 표시 오류 확인",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-neutral-200 p-5 md:p-6"
                  >
                    <p className="text-xs tracking-[0.18em] text-neutral-400">
                      {item.title}
                    </p>
                    <h3 className="mt-4 text-xl tracking-tight">
                      {item.value}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.7] text-neutral-500">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
              <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
                <table className="w-full min-w-[1080px] text-left text-sm">
                  <thead className="bg-neutral-50 text-xs text-neutral-500">
                    <tr>
                      {[
                        "TC ID",
                                                "영역",
                                                "대상 기능",
                                                "검증 관점",
                                                "기대 결과",
                                                "판정",
                                            ].map((head) => (
                        <th key={head} className="p-4">
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {serviceFlowRegressionCases.map((tc) => (
                      <tr key={tc.id} className="border-t">
                        <td className="p-4 font-medium">{tc.id}</td>
                        <td className="p-4">{tc.area}</td>
                        <td className="p-4">{tc.target}</td>
                        <td className="p-4 text-neutral-600">{tc.viewpoint}</td>
                        <td className="max-w-[360px] p-4 leading-[1.7] text-neutral-600">
                          {tc.expected}
                        </td>
                        <td className="p-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs ${
                              tc.result === "PASS"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {tc.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {id === "seomse-reservation-cx" && (
          <section className="px-6 md:px-8 mb-16 md:mb-24">
            <div className="max-w-6xl mx-auto">
              <div className="mb-6 md:mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <h2 className="text-xs md:text-sm tracking-widest text-neutral-400">
                  FLOW-BASED QA EVIDENCE
                </h2>
                <p className="max-w-2xl text-sm leading-[1.7] text-neutral-500">
                  예약 생성부터 관리자 확인까지의 주요 흐름을 화면 단위로
                  나누고, 단계별 검증 포인트와 테스트 결과를 정리했습니다.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {seomseScreenshots.map((screen, index) => (
                  <motion.figure
                    key={screen.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.06,
                    }}
                    className="overflow-hidden rounded-lg border border-neutral-200 bg-white"
                  >
                    <div className="flex h-[330px] items-center justify-center bg-neutral-50 p-3">
                      <img
                        src={screen.src}
                        alt={screen.alt}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <figcaption className="border-t border-neutral-200 p-4">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span className="text-xs tracking-[0.2em] text-neutral-400">
                          {screen.step}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] ${
                            screen.status === "PASS"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {screen.status}
                        </span>
                      </div>
                      <h3 className="text-base tracking-tight">
                        {screen.title}
                      </h3>
                      <p className="mt-2 min-h-12 text-sm leading-[1.6] text-neutral-500">
                        {screen.description}
                      </p>
                      <p className="mt-3 text-xs text-neutral-400">
                        {screen.qaPoint}
                      </p>
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {id === "seomse-reservation-cx" && (
          <section className="px-6 md:px-8 mb-16 md:mb-24">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-6 md:mb-8">
                QA RESULT SUMMARY
              </h2>
              <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="flex rounded-lg border border-neutral-200 p-5 md:p-6">
                  <div className="flex w-full items-center justify-center gap-6">
                    <div
                      className="relative h-32 w-32 shrink-0 rounded-full"
                      style={{
                        background:
                          "conic-gradient(#10b981 0 71.875%, #f43f5e 71.875% 96.875%, #f59e0b 96.875% 100%)",
                      }}
                    >
                      <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white">
                        <span className="text-2xl tracking-tight">32</span>
                        <span className="text-xs text-neutral-400">TC</span>
                      </div>
                    </div>
                    <div className="w-full space-y-3">
                      {seomseResultSummary.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between gap-4 text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${item.color}`}
                            />
                            <span>{item.label}</span>
                          </div>
                          <span className="text-neutral-500">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-neutral-200 p-5 md:p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-base tracking-tight">결함 우선순위</h3>
                    <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs text-white">
                      부분 통과
                    </span>
                  </div>
                  <div className="space-y-4">
                    {seomseIssueSummary.map((item) => (
                      <div key={item.label}>
                        <div className="mb-2 flex justify-between text-sm text-neutral-500">
                          <span>{item.label}</span>
                          <span>{item.value}건</span>
                        </div>
                        <div className="h-2 rounded-full bg-neutral-100">
                          <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{
                              width: item.width,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {id === "seomse-reservation-cx" && (
          <section className="px-6 md:px-8 mb-16 md:mb-24">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12">
              <div>
                <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-6 md:mb-8">
                  KEY ISSUES
                </h2>
                <div className="border-t border-neutral-200">
                  {seomseKeyIssues.map((issue) => (
                    <div
                      key={issue.title}
                      className="grid md:grid-cols-[72px_1fr] gap-3 md:gap-5 border-b border-neutral-200 py-5 md:py-6"
                    >
                      <span className="w-fit h-fit px-3 py-1 rounded-full bg-neutral-900 text-white text-xs tracking-widest">
                        {issue.priority}
                      </span>
                      <div>
                        <h3 className="text-base md:text-lg tracking-tight mb-2">
                          {issue.title}
                        </h3>
                        <p className="text-sm md:text-base leading-[1.8] text-neutral-600">
                          {issue.impact}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-6 md:mb-8">
                  ARTIFACTS
                </h2>
                <div className="border border-neutral-200 rounded-lg p-5 md:p-6">
                  <div className="text-3xl md:text-4xl tracking-tight mb-2">
                    조건부 통과
                  </div>
                  <p className="text-sm md:text-base leading-[1.8] text-neutral-500 mb-6">
                    예약 생성 및 조회 플로우는 정상 동작했으나, 일부 시간 선택
                    로직과 관리자 상태 표시 영역에서 예외 처리 및 UX 개선이
                    필요한 항목을 확인했습니다.
                  </p>
                  <div className="space-y-4">
                    {seomseArtifacts.map((artifact) => (
                      <div key={artifact.title}>
                        <h3 className="text-sm md:text-base tracking-tight">
                          {artifact.title}
                        </h3>
                        <p className="mt-1 text-sm leading-[1.7] text-neutral-500">
                          {artifact.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/qa/seomse-reservation"
                    className="mt-6 inline-flex rounded-full bg-neutral-900 px-5 py-2.5 text-sm text-white transition-opacity hover:opacity-80"
                  >
                    QA 문서 보기
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

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
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
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
              <p className="mt-4 md:mt-5 text-sm md:text-base text-neutral-500 leading-[1.8]">
                WebP 변환 및 이미지 최적화를 통해 이미지 용량을 13MB에서 1.4MB로
                줄이고 Lighthouse 성능 점수를
                <span className="whitespace-nowrap">
                  77점에서 89점으로 개선
                </span>
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
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
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
