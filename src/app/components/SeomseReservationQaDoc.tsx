import { ArrowLeft, FileText, XCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";
import PageTransition from "./PageTransition";

type Status = "PASS" | "FAIL" | "BLOCKED";
type Severity = "High" | "Medium" | "Low" | "-";

type BugReport = {
  id: string;
  title: string;
  severity: Exclude<Severity, "Low" | "-">;
  steps: string;
  actual: string;
  expected: string;
  impact: string;
  cause: string;
  apiEvidence?: string;
};

type FlowStep = {
  label: string;
  focus?: boolean;
};

type ReservationFlow = {
  title: string;
  steps: FlowStep[];
  points?: string[];
};

const flows: ReservationFlow[] = [
  {
    title: "예약 프로세스 플로우",
    steps: [
      { label: "로그인" },
      { label: "매장 선택" },
      { label: "서비스 선택" },
      { label: "날짜 선택" },
      { label: "시간 선택", focus: true },
      { label: "예약 신청", focus: true },
      { label: "예약 완료" },
      { label: "예약 조회", focus: true },
    ],
  },
  {
    title: "섬세 예약 플로우",
    points: [
      "조건별 입력 필드 노출",
      "필수값 검증",
      "이미지 첨부",
      "예약 데이터 저장",
    ],
    steps: [
      { label: "섬세 예약 선택" },
      { label: "서비스 / 디자이너 선택" },
      { label: "날짜 / 시간 선택" },
      { label: "두피 타입 / 모발 유형 선택", focus: true },
      { label: "모발 길이 / 시술 이력 선택", focus: true },
      { label: "요청사항 및 이미지 첨부", focus: true },
      { label: "예약 완료" },
    ],
  },
];

const requirements = [
  [
    "매장 조회",
    "예약 화면 진입 시 헤어샵 목록이 API 응답 기준으로 렌더링되어야 한다",
  ],
  [
    "매장 상세",
    "매장 카드 선택 시 상세 정보와 예약 진입 버튼이 BottomSheet에 표시되어야 한다",
  ],
  [
    "예약 유형",
    "일반 예약과 섬세 예약 선택에 따라 이후 입력 단계가 분기되어야 한다",
  ],
  [
    "서비스 선택",
    "서비스를 선택하지 않은 상태에서는 다음 단계 이동이 제한되어야 한다",
  ],
  [
    "디자이너 선택",
    "API에서 전달된 디자이너 정보와 닉네임이 화면에 정확히 표시되어야 한다",
  ],
  [
    "날짜 선택",
    "과거 날짜는 선택할 수 없고 예약 가능한 날짜만 선택 가능해야 한다",
  ],
  [
    "시간 선택",
    "선택한 날짜 기준 예약 가능한 시간만 노출되어야 하며 이미 지난 시간은 제외되어야 한다",
  ],
  [
    "섬세 예약 입력",
    "두피 타입, 모발 상태, 시술 이력, 요청사항, 이미지 값이 예약 데이터에 포함되어야 한다",
  ],
  [
    "예약 생성",
    "필수값이 모두 입력된 경우에만 예약 생성 API 요청이 발생해야 한다",
  ],
  [
    "예약 조회",
    "생성된 예약은 마이페이지와 관리자 예약 목록에서 조회 가능해야 한다",
  ],
  [
    "예외 처리",
    "예약 생성 실패 또는 API 오류 발생 시 사용자가 실패 여부를 인지할 수 있어야 한다",
  ],
];

const risks = [
  {
    severity: "High",
    title: "시간 슬롯 오류",
    description:
      "미래 날짜를 선택해도 현재 시각 기준으로 시간이 필터링되어 예약 가능한 시간이 사라질 수 있음",
  },
  {
    severity: "High",
    title: "중복 예약",
    description:
      "동일 시간대에 복수 예약이 생성되어 실제 예약 가능 상태와 충돌할 수 있음",
  },
  {
    severity: "Medium",
    title: "필수값 누락",
    description:
      "매장, 디자이너, 서비스, 시간 값이 누락된 상태로 잘못된 예약이 생성될 수 있음",
  },
  {
    severity: "Medium",
    title: "실패 피드백 부족",
    description:
      "예약 실패 시 사용자가 실패 원인이나 재시도 필요 여부를 알 수 없음",
  },
  {
    severity: "Low",
    title: "예약 정보 유실",
    description:
      "새로고침 또는 직접 URL 접근 시 예약 완료 화면이 정상적으로 표시되지 않을 수 있음",
  },
];

const testCases: [string, string, string, string, string, Status][] = [
  [
    "RES-01",
    "매장 목록",
    "/reservation 진입",
    "헤어샵 목록 API 조회",
    "/shops?type=HAIR_SALON 조회",
    "PASS",
  ],
  [
    "RES-02",
    "매장 목록",
    "매장 API 응답 없음",
    "빈 상태 또는 안내 표시",
    "빈 상태 안내 없이 빈 Swiper 영역만 노출될 가능성 있음",
    "FAIL",
  ],
  [
    "RES-03",
    "매장 상세",
    "매장 카드 클릭",
    "매장 상세 API 조회 후 BottomSheet 표시",
    "/shops/{shopId} 조회, BottomSheet 표시",
    "PASS",
  ],
  [
    "RES-04",
    "매장 상세",
    "BottomSheet 닫기",
    "X/외부 클릭 시 닫힘",
    "구현됨",
    "PASS",
  ],
  [
    "RES-05",
    "매장 필터",
    "정렬/필터 탭 클릭",
    "목록 필터/정렬 반영",
    "탭 UI만 반응하고 목록 정렬/필터 결과는 변경되지 않음",
    "FAIL",
  ],
  [
    "RES-06",
    "일반 예약",
    "그냥 예약하기 클릭",
    "normal 상태로 서비스 선택 이동",
    "/select-service 이동",
    "PASS",
  ],
  [
    "RES-07",
    "섬세 예약",
    "섬세한 예약하기 클릭",
    "special 상태로 서비스 선택 이동",
    "/select-service 이동",
    "PASS",
  ],
  [
    "RES-08",
    "디자이너",
    "상세 API 디자이너 표시",
    "API 닉네임 표시",
    "API 타입은 nickName이나 화면은 nickname을 참조해 기본 문구로 표시될 가능성 있음",
    "FAIL",
  ],
  [
    "RES-09",
    "서비스 선택",
    "서비스 선택 화면 진입",
    "필수값 기본 선택 상태 확인",
    "첫 서비스가 기본 선택되어 미선택 상태 없이 진입",
    "PASS",
  ],
  [
    "RES-10",
    "서비스 선택",
    "서비스 선택 후 다음",
    "일정 선택 화면 이동",
    "/select-schedule 이동",
    "PASS",
  ],
  [
    "RES-11",
    "날짜 선택",
    "일정 화면 진입",
    "오늘 날짜 기본 선택",
    "오늘 자동 선택",
    "PASS",
  ],
  [
    "RES-12",
    "날짜 선택",
    "과거 날짜 클릭",
    "선택 불가",
    "disabled 및 클릭 차단",
    "PASS",
  ],
  ["RES-13", "날짜 선택", "과거 월 이동", "이동 불가", "차단됨", "PASS"],
  [
    "RES-14",
    "시간 선택",
    "오늘 기준 지난 시간",
    "선택 불가",
    "현재 시각 이후 30분 단위만 표시",
    "PASS",
  ],
  [
    "RES-15",
    "시간 선택",
    "미래 날짜 선택 후 시간 표시",
    "영업시간 전체 표시",
    "선택 날짜와 무관하게 현재 시각 기준으로 필터링되어 미래 날짜 시간도 사라질 수 있음",
    "FAIL",
  ],
  [
    "RES-16",
    "일반 예약",
    "날짜/시간 선택 후 다음",
    "normal POST",
    "API 호출 구현, 성공 시 확정 시트 이동",
    "PASS",
  ],
  [
    "RES-17",
    "중복 클릭",
    "POST 중 다음 버튼",
    "중복 요청 방지",
    "isPosting 동안 disabled",
    "PASS",
  ],
  [
    "RES-18",
    "일반 예약",
    "POST 실패",
    "사용자에게 실패 안내",
    "예약 생성 실패 시 화면 안내 없이 오류 처리가 내부 로그 수준에 머무름",
    "FAIL",
  ],
  ["RES-19", "섬세 필터1", "두피/모발 미선택", "다음 비활성", "구현됨", "PASS"],
  [
    "RES-20",
    "섬세 필터1",
    "두피/모발 선택",
    "enum 변환 후 다음 이동",
    "scaleType, hairType 전달",
    "PASS",
  ],
  ["RES-21", "섬세 필터2", "길이/시술 미선택", "다음 비활성", "구현됨", "PASS"],
  [
    "RES-22",
    "섬세 필터2",
    "길이/시술 선택",
    "요청사항 이동",
    "hairLength, hairTreatmentType 전달",
    "PASS",
  ],
  [
    "RES-23",
    "섬세 예약",
    "요청사항/이미지 제출",
    "multipart POST",
    "/interaction/appointments/special 호출 구현",
    "PASS",
  ],
  [
    "RES-24",
    "섬세 예약",
    "special POST 실패",
    "사용자에게 실패 안내",
    "섬세 예약 실패 시 사용자 안내 없이 console error만 출력됨",
    "FAIL",
  ],
  [
    "RES-25",
    "예약 완료",
    "예약 성공 후 이동",
    "매장/서비스/일시 표시",
    "location state 기반 표시",
    "PASS",
  ],
  [
    "RES-26",
    "예약 완료",
    "확정 시트 닫기",
    "시트 닫고 state 제거",
    "replace navigate 처리",
    "PASS",
  ],
  [
    "RES-27",
    "내 예약",
    "/my-page/reservations 조회",
    "예약 API 목록 표시",
    "/interaction/appointments 조회",
    "PASS",
  ],
  [
    "RES-28",
    "내 예약",
    "다가오는/지난 예약 탭",
    "날짜 기준 분리",
    "날짜 기준 분리 구현",
    "PASS",
  ],
  [
    "RES-29",
    "관리자 예약",
    "/admin/reservations 조회",
    "실제 예약 목록 표시",
    "mock 없이 API 목록 표시",
    "PASS",
  ],
  [
    "RES-30",
    "관리자 예약 상세",
    "예약 카드 펼침",
    "상세 API 조회 및 요청사항 표시",
    "/interaction/appointments/{id}/details 조회",
    "PASS",
  ],
  [
    "RES-31",
    "예약 취소",
    "사용자 예약 취소",
    "취소 API 호출 및 목록 갱신",
    "예약 취소 버튼 또는 취소 플로우가 확인되지 않아 검증을 완료할 수 없음",
    "BLOCKED",
  ],
];

const testCaseSeverity: Record<string, Severity> = {
  "RES-02": "Low",
  "RES-05": "Medium",
  "RES-08": "High",
  "RES-15": "High",
  "RES-18": "Medium",
  "RES-24": "Medium",
  "RES-31": "Medium",
};

const bugs: BugReport[] = [
  {
    id: "BUG-001",
    title: "미래 날짜 선택 시 예약 가능 시간이 현재 시각 기준으로 제한됨",
    severity: "High",
    steps:
      "예약 화면 진입 -> 매장 선택 -> 서비스 선택 -> 일정 선택 -> 내일 날짜 선택",
    actual: "미래 날짜임에도 현재 시각 이전 시간 슬롯이 표시되지 않음",
    expected: "미래 날짜는 영업시간 내 전체 예약 가능 시간이 표시되어야 함",
    impact: "사용자가 실제 예약 가능한 시간을 선택하지 못할 수 있음",
    cause:
      "시간 슬롯 생성 로직이 선택 날짜가 아닌 현재 시각을 기준으로 계산되는 것으로 추정",
  },
  {
    id: "BUG-002",
    title: "디자이너 닉네임이 정상 표시되지 않을 수 있음",
    severity: "High",
    steps: "매장 선택 -> 서비스/디자이너 선택 화면 진입",
    actual: "디자이너 이름 대신 '디자이너'로 표시될 수 있음",
    expected: "API에서 전달된 디자이너 닉네임이 표시되어야 함",
    impact: "디자이너 선택 신뢰도가 낮아짐",
    cause: "API 응답 필드명과 화면 바인딩 필드명이 일치하지 않는 것으로 추정",
    apiEvidence:
      "매장 상세 응답의 디자이너 이름 필드와 프론트 화면에서 참조하는 필드명이 일치하지 않아 기본 문구로 표시될 가능성을 확인",
  },
  {
    id: "BUG-003",
    title: "예약 실패 시 사용자에게 오류 메시지가 표시되지 않음",
    severity: "Medium",
    steps: "예약 API 실패 상황 발생 -> 예약 제출",
    actual: "화면상 실패 안내 없이 console에만 오류 출력",
    expected: "사용자에게 예약 실패 사유 또는 재시도 안내 표시",
    impact: "사용자가 예약 성공 여부를 판단하기 어려움",
    cause:
      "예약 생성 API 실패 응답을 사용자 피드백 UI로 연결하는 error handling이 누락된 것으로 추정",
    apiEvidence:
      "예약 생성 실패 상황에서 오류 응답은 발생하지만 화면 toast, modal, inline message로 연결되지 않음을 확인",
  },
  {
    id: "BUG-004",
    title: "매장 정렬/필터 요구사항이 목록 결과에 반영되지 않음",
    severity: "Medium",
    steps: "예약 화면 진입 -> 리뷰순/평점순/가격 낮은순 탭 클릭",
    actual: "탭 UI만 변경되고 목록 정렬 변화 없음",
    expected: "선택한 탭 기준으로 매장 목록이 정렬 또는 필터링되어야 함",
    impact: "탐색 편의성 저하",
    cause:
      "탭 선택 상태와 매장 목록 정렬/필터링 로직이 연결되지 않은 것으로 추정",
  },
];

const improvements = [
  "선택 날짜를 기준으로 예약 가능 시간이 계산되도록 시간 슬롯 로직 보완",
  "예약 실패 시 원인과 재시도 가능 여부를 안내하는 사용자 피드백 제공",
  "디자이너 정보가 정상 표시되도록 API 응답 필드와 화면 매핑 규칙 정리",
  "매장 정렬·필터 선택이 실제 목록 결과에 반영되도록 기능 연결",
];

const automationCases: [string, string, string, string, Status][] = [
  [
    "AUTO-R01",
    "샵 목록 렌더",
    "GET /shops?type=HAIR_SALON",
    "예약 화면 진입 시 Mock 응답 기준으로 샵 카드가 노출됨",
    "PASS",
  ],
  [
    "AUTO-R02",
    "매장 상세 시트 오픈",
    "GET /shops/{shopId}",
    "매장 카드 클릭 후 매장명, 섬세한 예약하기, 그냥 예약하기가 표시됨",
    "PASS",
  ],
  [
    "AUTO-R03",
    "다음 버튼 활성화 규칙",
    "UI 상태 검증",
    "시간 미선택 상태에서는 비활성, 시간 선택 후 다음 단계 이동 가능",
    "PASS",
  ],
  [
    "AUTO-R04",
    "일반 예약 전체 여정",
    "POST /interaction/appointments/normal 201",
    "서비스 선택부터 일정 선택, 예약 완료 화면의 주요 정보 표시까지 검증",
    "PASS",
  ],
  [
    "AUTO-R05",
    "예약 제출 실패",
    "POST /interaction/appointments/normal 500",
    "실패 응답 시 사용자 피드백이 제공되지 않는 현재 동작 검증",
    "PASS",
  ],
  [
    "AUTO-R06",
    "응답 지연 중 중복 제출 방지",
    "POST 1.5s delay",
    "제출 중 다음 버튼 비활성화 후 성공 시 확정 시트 표시",
    "PASS",
  ],
];

function StatusBadge({ status }: { status: Status }) {
  const style = {
    PASS: "border-emerald-200 bg-emerald-50 text-emerald-700",
    FAIL: "border-rose-200 bg-rose-50 text-rose-700",
    BLOCKED: "border-amber-200 bg-amber-50 text-amber-700",
  }[status];

  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs ${style}`}>
      {status}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: Severity }) {
  if (severity === "-") {
    return <span className="text-xs text-neutral-300">-</span>;
  }

  const style = {
    High: "bg-rose-50 text-rose-700",
    Medium: "bg-amber-50 text-amber-700",
    Low: "bg-neutral-100 text-neutral-600",
  }[severity];

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs ${style}`}>
      {severity}
    </span>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-neutral-200 px-6 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs tracking-[0.22em] text-neutral-400">
          {number}
        </p>
        <h2 className="mb-8 text-2xl tracking-tight md:text-3xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
      {children}
    </div>
  );
}

export default function SeomseReservationQaDoc() {
  const passCount = testCases.filter((tc) => tc[5] === "PASS").length;
  const failCount = testCases.filter((tc) => tc[5] === "FAIL").length;
  const blockedCount = testCases.filter((tc) => tc[5] === "BLOCKED").length;
  const automationPassCount = automationCases.filter(
    (tc) => tc[4] === "PASS",
  ).length;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-black">
        <nav className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
            <Link
              to="/project/seomse-reservation-qa"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-50"
            >
              <ArrowLeft size={18} />
              Back to Case
            </Link>
            <span className="text-xs tracking-[0.2em] text-neutral-400">
              QA DOCUMENT
            </span>
          </div>
        </nav>

        <header className="px-6 pb-12 pt-28 md:px-8 md:pb-16 md:pt-36">
          <div className="mx-auto max-w-6xl">
            <div className="mb-5 flex items-center gap-2 text-sm text-neutral-500">
              <FileText size={17} />
              SEOMSE Reservation QA
            </div>
            <h1 className="max-w-4xl text-3xl tracking-tight md:text-5xl">
              예약 기능 QA 문서
            </h1>
            <p className="mt-5 text-base leading-8 text-neutral-600 md:text-lg">
              예약 생성부터 관리자 조회까지의 주요 시나리오를 대상으로 테스트
              케이스를 작성하고, <br /> 기능 검증과 API 응답 확인을 통해 발견한
              버그와 원인 분석 결과를 담았습니다.
            </p>
          </div>
        </header>

        <Section number="01" title="QA Result">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {[
              ["Test Cases", String(testCases.length)],
              ["Bugs Found", String(bugs.length)],
              ["PASS", String(passCount)],
              ["FAIL", String(failCount)],
              ["BLOCKED", String(blockedCount)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-neutral-200 p-5 md:p-6"
              >
                <p className="text-xs text-neutral-400">{label}</p>
                <p className="mt-3 text-3xl tracking-tight">{value}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section number="02" title="예약 플로우 분석 및 검증 범위">
          <p className="mb-8 text-base leading-8 text-neutral-600">
            SEOMSE는 예약 전 상담 정보를 함께 전달할 수 있도록 설계된 헤어 예약
            서비스입니다. <br />본 QA는 일반 예약과 섬세 예약을 대상으로 예약
            생성, 조회, 관리자 확인까지의 핵심 사용자 플로우를 검증했습니다.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {flows.map((flow) => (
              <div
                key={flow.title}
                className="flex flex-col rounded-lg border border-neutral-200 p-5 md:p-6"
              >
                <h3 className="mb-5 text-lg">{flow.title}</h3>
                {Boolean(flow.points?.length) && (
                  <div className="mb-5 rounded-lg bg-neutral-50 p-4">
                    <p className="mb-3 text-xs tracking-[0.18em] text-neutral-400">
                      검증 포인트
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {flow.points?.map((point) => (
                        <span
                          key={point}
                          className="rounded-full bg-white px-3 py-1 text-xs text-neutral-700"
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <ol className="flex flex-1 flex-col justify-between gap-3">
                  {flow.steps.map((step, index) => (
                    <li key={step.label} className="flex items-center gap-3">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
                          step.focus
                            ? "bg-neutral-900 text-white"
                            : "bg-neutral-100 text-neutral-500"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="text-sm text-neutral-700">
                        {step.label}
                      </span>
                      {step.focus && (
                        <span className="ml-auto rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] text-emerald-700">
                          QA Focus
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </Section>

        <Section number="03" title="요구사항 분석 및 리스크 식별">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Table>
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-neutral-50 text-xs text-neutral-500">
                  <tr>
                    <th className="p-4">구분</th>
                    <th className="p-4">검증 가능한 요구사항</th>
                  </tr>
                </thead>
                <tbody>
                  {requirements.map(([label, value]) => (
                    <tr key={label} className="border-t">
                      <td className="p-4">{label}</td>
                      <td className="p-4 leading-7 text-neutral-600">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Table>
            <div className="flex flex-col rounded-lg border border-neutral-200 p-5 md:p-6">
              <h3 className="mb-5 text-lg">검증 우선순위 항목</h3>
              <div className="flex flex-1 flex-col justify-between gap-4">
                {risks.map((risk) => (
                  <div
                    key={risk.title}
                    className="border-t pt-4 first:border-0 first:pt-0"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="text-sm">{risk.title}</p>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] ${
                          risk.severity === "High"
                            ? "bg-rose-50 text-rose-700"
                            : risk.severity === "Medium"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {risk.severity}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-neutral-500">
                      {risk.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section number="04" title="테스트 케이스">
          <Table>
            <table className="w-full min-w-[1220px] text-left text-xs">
              <thead className="bg-neutral-50 text-neutral-500">
                <tr>
                  {[
                    "TC ID",
                    "구분",
                    "테스트 케이스",
                    "기대 결과",
                    "실제 결과",
                    "Severity",
                    "판정",
                  ].map((head) => (
                    <th key={head} className="p-4">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {testCases.map((tc) => (
                  <tr key={tc[0]} className="border-t">
                    <td className="p-4 font-medium">{tc[0]}</td>
                    <td className="p-4">{tc[1]}</td>
                    <td className="max-w-[220px] p-4 leading-6">{tc[2]}</td>
                    <td className="max-w-[260px] p-4 leading-6">{tc[3]}</td>
                    <td className="max-w-[340px] p-4 leading-6 text-neutral-600">
                      {tc[4]}
                    </td>
                    <td className="p-4">
                      <SeverityBadge
                        severity={testCaseSeverity[tc[0]] ?? "-"}
                      />
                    </td>
                    <td className="p-4">
                      <StatusBadge status={tc[5]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Table>
          <div className="mt-5 rounded-lg border border-neutral-200 p-5 md:p-6">
            <p className="mb-3 text-xs tracking-[0.18em] text-neutral-400">
              결과 분석
            </p>
            <p className="text-sm leading-7 text-neutral-600">
              총 31건의 테스트를 수행한 결과, 24건은 PASS, 6건은 FAIL, 1건은
              BLOCKED로 확인되었습니다.
              <br /> 주요 이슈는 예약 가능 시간 계산, 디자이너 정보 표시, 예약
              실패 피드백 영역에서 발견되었습니다. FAIL 6건 중 동일 원인으로
              발생한 케이스는 하나의 결함으로 통합해 관리했으며, 사용자 영향도를
              기준으로 총 4건의 주요 결함을 정리했습니다.
            </p>
          </div>
        </Section>

        <Section number="05" title="Playwright 예약 자동화">
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              ["자동화 시나리오", String(automationCases.length)],
              ["PASS", String(automationPassCount)],
              ["Playwright", "Network Mocking"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-neutral-200 p-5 md:p-6"
              >
                <p className="text-xs text-neutral-400">{label}</p>
                <p className="mt-3 text-2xl tracking-tight">{value}</p>
              </div>
            ))}
          </div>

          <p className="mb-6 text-base leading-8 text-neutral-600">
            전체 수동 검증 케이스 중 배포마다 반복 확인이 필요한 핵심 예약 경로
            6개를 선별해 자동화했습니다.
          </p>

          <div className="mb-8 rounded-lg bg-neutral-50 p-5 md:p-6">
            <p className="text-base leading-8 text-neutral-700">
              예약 플로우는 샵 목록, 샵 상세, 예약 제출이 모두 API 응답에
              의존하기 때문에 Playwright Network Mocking을 적용했습니다.
              <br /> 백엔드 서버 없이도 동일한 조건에서 검증할 수 있도록 API
              응답을 고정했으며, 인증 상태와 테스트 시각을 일정하게 유지해 반복
              실행 시에도 동일한 결과를 확인할 수 있도록 구성했습니다.
            </p>
          </div>

          <div className="mb-8 rounded-lg border border-neutral-200 p-5 md:p-6">
            <h3 className="mb-5 text-lg">자동화 설계 포인트</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                [
                  "화면 구조 분리",
                  "예약, 서비스 선택, 일정 선택 화면별 액션과 선택자를 분리해 유지보수성을 높임",
                ],
                [
                  "응답 고정",
                  "실시간 API 대신 샵 목록·상세·예약 제출 응답을 테스트 데이터로 고정",
                ],
                [
                  "오류 재현",
                  "POST 500 응답과 지연 응답을 자동화해 실패 피드백 부재와 중복 제출 방지 동작 검증",
                ],
              ].map(([title, body]) => (
                <div
                  key={title}
                  className="border-t pt-4 md:border-t-0 md:pt-0"
                >
                  <p className="mb-2 text-sm font-medium">{title}</p>
                  <p className="text-sm leading-7 text-neutral-500">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <Table>
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="bg-neutral-50 text-xs text-neutral-500">
                <tr>
                  {[
                    "TC ID",
                    "테스트 케이스",
                    "Mock",
                    "검증 포인트",
                    "판정",
                  ].map((head) => (
                    <th key={head} className="p-4">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {automationCases.map((tc) => (
                  <tr key={tc[0]} className="border-t">
                    <td className="p-4 font-medium">{tc[0]}</td>
                    <td className="p-4">{tc[1]}</td>
                    <td className="p-4 font-mono text-xs text-neutral-600">
                      {tc[2]}
                    </td>
                    <td className="max-w-[420px] p-4 leading-7 text-neutral-600">
                      {tc[3]}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={tc[4]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Table>
        </Section>

        <Section number="06" title="버그 리포트">
          <p className="mb-8 text-base leading-8 text-neutral-600">
            총 4건의 주요 이슈를 도출했으며, 예약 가능 시간 계산 오류와 사용자
            피드백 부재를 우선 수정이 필요한 항목으로 판단했습니다.
          </p>
          <div className="mb-8">
            <h3 className="mb-4 text-xs tracking-[0.18em] text-neutral-400">
              High Severity
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {bugs
                .filter((bug) => bug.severity === "High")
                .map((bug) => (
                  <article
                    key={bug.id}
                    className="rounded-lg border border-rose-200 bg-rose-50/30 p-5 md:p-6"
                  >
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-rose-500">
                          {bug.id} · {bug.severity}
                        </p>
                        <h3 className="mt-2 text-lg leading-7">{bug.title}</h3>
                      </div>
                      <XCircle className="shrink-0 text-rose-500" size={20} />
                    </div>
                    <dl className="space-y-4 text-sm leading-7">
                      <div>
                        <dt className="text-neutral-400">재현 절차</dt>
                        <dd>{bug.steps}</dd>
                      </div>
                      <div>
                        <dt className="text-neutral-400">실제 결과</dt>
                        <dd>{bug.actual}</dd>
                      </div>
                      <div>
                        <dt className="text-neutral-400">기대 결과</dt>
                        <dd>{bug.expected}</dd>
                      </div>
                      <div>
                        <dt className="text-neutral-400">사용자 영향</dt>
                        <dd>{bug.impact}</dd>
                      </div>
                      <div>
                        <dt className="text-neutral-400">원인 추정</dt>
                        <dd>{bug.cause}</dd>
                      </div>
                      {bug.apiEvidence && (
                        <div>
                          <dt className="text-neutral-400">API 확인 근거</dt>
                          <dd>{bug.apiEvidence}</dd>
                        </div>
                      )}
                    </dl>
                  </article>
                ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs tracking-[0.18em] text-neutral-400">
              Medium Severity
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {bugs
                .filter((bug) => bug.severity === "Medium")
                .map((bug) => (
                  <article
                    key={bug.id}
                    className="rounded-lg border border-neutral-200 p-5 md:p-6"
                  >
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-neutral-400">
                          {bug.id} · {bug.severity}
                        </p>
                        <h3 className="mt-2 text-lg leading-7">{bug.title}</h3>
                      </div>
                      <XCircle className="shrink-0 text-rose-500" size={20} />
                    </div>
                    <dl className="space-y-4 text-sm leading-7">
                      <div>
                        <dt className="text-neutral-400">재현 절차</dt>
                        <dd>{bug.steps}</dd>
                      </div>
                      <div>
                        <dt className="text-neutral-400">실제 결과</dt>
                        <dd>{bug.actual}</dd>
                      </div>
                      <div>
                        <dt className="text-neutral-400">기대 결과</dt>
                        <dd>{bug.expected}</dd>
                      </div>
                      <div>
                        <dt className="text-neutral-400">사용자 영향</dt>
                        <dd>{bug.impact}</dd>
                      </div>
                      <div>
                        <dt className="text-neutral-400">원인 추정</dt>
                        <dd>{bug.cause}</dd>
                      </div>
                      {bug.apiEvidence && (
                        <div>
                          <dt className="text-neutral-400">API 확인 근거</dt>
                          <dd>{bug.apiEvidence}</dd>
                        </div>
                      )}
                    </dl>
                  </article>
                ))}
            </div>
          </div>
        </Section>

        <Section number="07" title="Recommendations">
          <div className="space-y-3">
            {improvements.map((item, index) => (
              <div
                key={item}
                className="flex gap-4 border-t border-neutral-200 py-5 first:border-0"
              >
                <span className="text-sm text-neutral-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-8">{item}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section number="08" title="QA 회고">
          <div className="rounded-lg bg-neutral-50 p-6 md:p-8">
            <p className="text-base leading-8 text-neutral-700">
              이번 QA를 진행하며 예약 기능이 정상적으로 동작하더라도 사용자
              경험에는 문제가 발생할 수 있다는 점을 확인했습니다. 실제로 예약
              생성 자체는 가능했지만, 미래 날짜 시간 계산 오류나 예약 실패
              피드백 부재처럼 사용자의 예약 과정에 직접 영향을 주는 이슈를
              발견할 수 있었습니다.
            </p>
            <p className="mt-5 text-base leading-8 text-neutral-700">
              또한 테스트 케이스를 작성하는 과정에서 정상 시나리오뿐 아니라 예외
              상황과 경계 조건을 함께 검토하는 것이 중요하다는 점을
              경험했습니다. 특히 API 응답 데이터와 화면 표시 정보가 일치하는지,
              실패 상황에서도 사용자가 현재 상태를 명확하게 인지할 수 있는지는
              기능 구현 과정에서 놓치기 쉬운 검증 포인트임을 확인했습니다.
            </p>
            <p className="mt-5 text-base leading-8 text-neutral-700">
              이번 프로젝트를 통해 테스트 케이스 설계, 버그 리포트 작성, API
              검증 과정을 경험하며 기능 단위보다 사용자 흐름과 데이터 흐름을
              기준으로 서비스를 검증하는 관점을 정리할 수 있었습니다.
            </p>
          </div>
        </Section>
      </div>
    </PageTransition>
  );
}
