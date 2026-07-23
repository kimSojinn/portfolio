import { ArrowLeft, FileText, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import reservationTestImage from "../../assets/img/reservation-test.png";
import PageTransition from "./PageTransition";

type Status = "PASS" | "FAIL" | "BLOCKED";
type Severity = "High" | "Medium";

type BugReport = {
  id: string;
  title: string;
  severity: Severity;
  relatedTestCases: string[];
  status: "회귀 검증 완료" | "수정 필요" | "요구사항 확인";
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
    "코드 검토 결과, 빈 응답을 안내 화면으로 분기하는 처리가 확인되지 않음",
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
    "코드 검토 결과, API 타입은 nickName이고 화면은 nickname을 참조함",
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
    "코드 검토 결과, 선택 날짜 분기 없이 현재 시각을 기준으로 시간 슬롯을 필터링함",
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

const linkedBugByTestCase: Record<string, string> = {
  "RES-05": "BUG-004",
  "RES-08": "BUG-002",
  "RES-15": "BUG-001",
  "RES-18": "BUG-003",
  "RES-24": "BUG-003",
};

const representativeTestCaseIds = new Set([
  "RES-01",
  "RES-08",
  "RES-15",
  "RES-17",
  "RES-18",
  "RES-23",
  "RES-31",
]);

const bugs: BugReport[] = [
  {
    id: "BUG-001",
    title: "미래 날짜 선택 시 예약 가능 시간이 현재 시각 기준으로 제한됨",
    severity: "High",
    relatedTestCases: ["RES-15"],
    status: "회귀 검증 완료",
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
    title: "API 응답과 화면의 디자이너 닉네임 필드명이 일치하지 않음",
    severity: "High",
    relatedTestCases: ["RES-08"],
    status: "수정 필요",
    steps: "매장 선택 -> 서비스/디자이너 선택 화면 진입",
    actual: "API 타입은 nickName이고 화면 렌더링은 nickname을 참조함",
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
    relatedTestCases: ["RES-18", "RES-24"],
    status: "수정 필요",
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
    relatedTestCases: ["RES-05"],
    status: "요구사항 확인",
    steps: "예약 화면 진입 -> 리뷰순/평점순/가격 낮은순 탭 클릭",
    actual: "탭 UI만 변경되고 목록 정렬 변화 없음",
    expected: "선택한 탭 기준으로 매장 목록이 정렬 또는 필터링되어야 함",
    impact: "탐색 편의성 저하",
    cause:
      "탭 선택 상태와 매장 목록 정렬/필터링 로직이 연결되지 않은 것으로 추정",
  },
];

const followUpActions = [
  {
    label: "회귀 유지",
    description:
      "BUG-001 수정 동작을 AUTO-R07로 고정해 미래 날짜 시간 슬롯을 반복 검증",
  },
  {
    label: "API 계약 정리",
    description:
      "BUG-002의 디자이너 필드명을 API 타입과 화면 모델에서 하나의 규칙으로 통일",
  },
  {
    label: "오류 UX 보완",
    description:
      "BUG-003의 일반·섬세 예약 실패 응답을 공통 사용자 피드백으로 연결",
  },
  {
    label: "요구사항 확정",
    description:
      "BUG-004 정렬·필터의 기대 동작과 우선순위를 확인한 뒤 회귀 범위에 반영",
  },
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
    "알려진 결함 재현 · 오류 피드백 부재",
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
  [
    "AUTO-R07",
    "수정 후 회귀 · 미래 날짜 시간 슬롯",
    "고정 시각 + 미래 날짜",
    "미래 날짜에서는 현재 시각 이전의 예약 가능 슬롯도 표시됨",
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
  const [showAllTestCases, setShowAllTestCases] = useState(false);
  const [showAutomationReport, setShowAutomationReport] = useState(false);
  const passCount = testCases.filter((tc) => tc[5] === "PASS").length;
  const failCount = testCases.filter((tc) => tc[5] === "FAIL").length;
  const blockedCount = testCases.filter((tc) => tc[5] === "BLOCKED").length;
  const highSeverityBugCount = bugs.filter(
    (bug) => bug.severity === "High",
  ).length;
  const mediumSeverityBugCount = bugs.filter(
    (bug) => bug.severity === "Medium",
  ).length;
  const automationPassCount = automationCases.filter(
    (tc) => tc[4] === "PASS",
  ).length;
  const visibleTestCases = showAllTestCases
    ? testCases
    : testCases.filter((tc) => representativeTestCaseIds.has(tc[0]));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!showAutomationReport) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowAutomationReport(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [showAutomationReport]);

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
              프로젝트로 돌아가기
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
            <h1 className="text-3xl tracking-tight md:text-5xl">
              예약 기능 QA 문서
            </h1>
            <p className="mt-5 text-base leading-8 text-neutral-600 md:text-lg">
              예약 생성부터 관리자 조회까지 31개 테스트 케이스를 작성하고,
              주요 결함과 자동화 결과를 정리했습니다.
            </p>
          </div>
        </header>

        <Section number="01" title="테스트 결과 요약">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-medium">테스트 케이스 결과</h3>
              <Table>
                <table className="w-full text-left text-sm">
                  <thead className="bg-neutral-50 text-xs text-neutral-500">
                    <tr>
                      {["전체", "PASS", "FAIL", "BLOCKED"].map((head) => (
                        <th key={head} className="p-4">
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      {[
                        testCases.length,
                        passCount,
                        failCount,
                        blockedCount,
                      ].map((value, index) => (
                        <td key={index} className="p-4 text-lg">
                          {value}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </Table>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium">결함 현황</h3>
              <Table>
                <table className="w-full text-left text-sm">
                  <thead className="bg-neutral-50 text-xs text-neutral-500">
                    <tr>
                      {["전체", "High", "Medium"].map((head) => (
                        <th key={head} className="p-4">
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      {[
                        bugs.length,
                        highSeverityBugCount,
                        mediumSeverityBugCount,
                      ].map((value, index) => (
                        <td key={index} className="p-4 text-lg">
                          {value}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </Table>
            </div>
          </div>

          <div className="mt-6 border-y border-neutral-200 py-4 text-sm leading-7 text-neutral-600">
            <p>
              FAIL {failCount}건은 동일 원인을 통합해 주요 결함 {bugs.length}
              건으로 관리했습니다.
            </p>
            <p>
              Playwright 자동화 {automationCases.length}건은{" "}
              {automationPassCount}건 모두 통과했습니다.
            </p>
          </div>

          <div className="mt-10">
            <h3 className="mb-3 text-sm font-medium">테스트 정보</h3>
            <dl className="grid border-y border-neutral-200 md:grid-cols-2">
              {[
                ["대상", "SEOMSE 예약 사용자·관리자 화면"],
                ["범위", "매장 조회 → 일반·섬세 예약 → 예약 조회"],
                ["검증 기준", "정상·예외 흐름 · 경계값 · API 응답"],
                ["자동화 환경", "API Network Mocking · 고정 시각"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[96px_1fr] gap-3 border-b border-neutral-200 py-4 md:px-4 md:odd:pl-0"
                >
                  <dt className="text-sm text-neutral-400">{label}</dt>
                  <dd className="text-sm leading-6">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        <Section
          number="02"
          title={showAllTestCases ? "전체 테스트 케이스" : "대표 테스트 케이스"}
        >
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <p className="text-sm leading-7 text-neutral-500">
              전체 31건 중 정상 흐름, 데이터 불일치, 경계값, 오류 응답을 포함한
              대표 7건을 먼저 표시합니다.
            </p>
            <button
              type="button"
              onClick={() => setShowAllTestCases((current) => !current)}
              aria-expanded={showAllTestCases}
              className="w-fit shrink-0 cursor-pointer text-sm underline underline-offset-4 transition-opacity hover:opacity-50"
            >
              {showAllTestCases
                ? "대표 테스트 케이스만 보기"
                : "전체 테스트 케이스 31건 보기"}
            </button>
          </div>
          <Table>
            <table className="w-full min-w-[1180px] text-left text-xs">
              <thead className="bg-neutral-50 text-neutral-500">
                <tr>
                  {[
                    "TC ID",
                    "구분",
                    "테스트 케이스",
                    "기대 결과",
                    "실제 결과",
                    "연결 결함",
                    "판정",
                  ].map((head) => (
                    <th key={head} className="p-4">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleTestCases.map((tc) => (
                  <tr key={tc[0]} className="border-t">
                    <td className="p-4 font-medium">{tc[0]}</td>
                    <td className="p-4">{tc[1]}</td>
                    <td className="p-4 leading-6">{tc[2]}</td>
                    <td className="p-4 leading-6">{tc[3]}</td>
                    <td className="p-4 leading-6 text-neutral-600">{tc[4]}</td>
                    <td className="p-4 font-medium text-neutral-600">
                      {linkedBugByTestCase[tc[0]] ?? "-"}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={tc[5]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Table>
        </Section>

        <Section number="03" title="Playwright 자동화">
          <p className="mb-6 text-base leading-8 text-neutral-600">
            전체 테스트 중 결과를 자동 판정하고 API 응답을 고정할 수 있는{" "}
            {automationCases.length}건을 자동화 대상으로 선정했습니다. <br />
            정상·실패·지연 응답을 Network Mocking으로 재현해 동일한 조건에서
            확인했습니다.
          </p>

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
                    <td className="p-4 leading-7 text-neutral-600">{tc[3]}</td>
                    <td className="p-4">
                      <StatusBadge status={tc[4]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Table>

          <div className="mt-6 flex flex-col gap-3 border-y border-neutral-200 py-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium">Playwright 실행 결과</p>
              <p className="mt-1 text-sm leading-6 text-neutral-500">
                예약 시나리오 7건을 포함한 전체 자동화 테스트 13건의 결과 화면
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAutomationReport(true)}
              className="w-fit shrink-0 cursor-pointer text-sm underline underline-offset-4 transition-opacity hover:opacity-50"
            >
              실행 결과 이미지 보기
            </button>
          </div>
        </Section>

        <Section number="04" title="주요 버그 리포트">
          <div className="grid gap-4 md:grid-cols-2">
            {bugs.map((bug) => (
              <article
                key={bug.id}
                className={`rounded-lg border p-5 md:p-6 ${
                  bug.severity === "High"
                    ? "border-rose-200 bg-rose-50/30"
                    : "border-neutral-200"
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-neutral-400">
                      {bug.id} · {bug.severity} · {bug.status}
                    </p>
                    <h3 className="mt-2 text-base leading-7">{bug.title}</h3>
                  </div>
                  <XCircle className="shrink-0 text-rose-500" size={18} />
                </div>
                <dl className="space-y-3 text-sm leading-6">
                  <div>
                    <dt className="text-neutral-400">연결 테스트</dt>
                    <dd>{bug.relatedTestCases.join(", ")}</dd>
                  </div>
                  <div>
                    <dt className="text-neutral-400">재현</dt>
                    <dd>{bug.steps}</dd>
                  </div>
                  <div>
                    <dt className="text-neutral-400">실제 / 기대 결과</dt>
                    <dd>
                      {bug.actual} / {bug.expected}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-neutral-400">사용자 영향</dt>
                    <dd>{bug.impact}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </Section>

        <Section number="05" title="결함별 대응 방향">
          <div className="space-y-3">
            {followUpActions.map((item, index) => (
              <div
                key={item.label}
                className="grid grid-cols-[28px_minmax(0,1fr)] gap-x-3 gap-y-1 border-t border-neutral-200 py-5 first:border-0 md:grid-cols-[28px_140px_minmax(0,1fr)] md:gap-x-6"
              >
                <span className="text-sm leading-8 text-neutral-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="whitespace-nowrap text-sm leading-8 text-neutral-500">
                  {item.label}
                </span>
                <p className="col-start-2 text-base leading-8 md:col-start-3">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {showAutomationReport && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Playwright 실행 결과"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 md:p-8"
            onClick={() => setShowAutomationReport(false)}
          >
            <div
              className="relative max-h-full w-full max-w-6xl overflow-auto rounded-lg bg-white"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white px-5 py-4">
                <div>
                  <p className="text-sm font-medium">Playwright 실행 결과</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    예약 시나리오 7건 포함 · 전체 자동화 테스트 13건 통과
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAutomationReport(false)}
                  aria-label="이미지 닫기"
                  className="cursor-pointer rounded-full p-2 transition-colors hover:bg-neutral-100"
                >
                  <XCircle size={22} />
                </button>
              </div>
              <img
                src={reservationTestImage}
                alt="예약 시나리오 7건을 포함한 Playwright 자동화 테스트 13건 통과 결과 화면"
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
