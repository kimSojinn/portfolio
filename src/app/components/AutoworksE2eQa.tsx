import { AlertCircle, ArrowLeft, FileText, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import crcLoginReportImage from "../../assets/img/crc-login-report.png";
import PageTransition from "./PageTransition";

const scenarios = [
  {
    id: "SM-001",
    scenario: "로그인 페이지 렌더링",
    detail:
      "title · form visibility · password input type · 자동로그인 기본 체크",
    auth: false,
  },
  {
    id: "SM-002",
    scenario: "유효 자격증명 로그인",
    detail:
      "POST /auth/login 201 응답 · 메인 페이지 리다이렉트 · Authentication 쿠키 발급",
    auth: true,
  },
  {
    id: "SM-003",
    scenario: "잘못된 자격증명",
    detail: "'로그인에 실패했습니다' alert dialog 노출 · /login 유지",
    auth: false,
  },
  {
    id: "SM-004",
    scenario: "Enter 키 제출",
    detail: "비밀번호 input에서 Enter 키로 로그인 트리거",
    auth: false,
  },
  {
    id: "SM-005",
    scenario: "빈 입력 로그인 시도",
    detail: "빈 값 제출 시 실패 알럿 처리",
    auth: false,
  },
  {
    id: "SM-006",
    scenario: "비로그인 보호 페이지 접근",
    detail:
      "/copyright/dashboard 접근 시 /login 자동 리다이렉트 (비로그인 접근 제어 동작)",
    auth: false,
  },
  {
    id: "SM-007",
    scenario: "로그인 후 보호 페이지 접근",
    detail: "세션 유지 상태에서 보호 페이지 정상 진입",
    auth: true,
  },
];

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

export default function AutoworksE2eQa() {
  const [showExecutionImage, setShowExecutionImage] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!showExecutionImage) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowExecutionImage(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [showExecutionImage]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-black">
        <nav className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
            <Link
              to="/project/operations-e2e-smoke"
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
              운영 서비스 E2E Smoke Test
            </div>
            <h1 className="text-3xl tracking-tight md:text-5xl">
              운영 도메인 Smoke Test QA 문서
            </h1>
            <p className="mt-5 text-base leading-8 text-neutral-600 md:text-lg">
              로그인 화면부터 접근 제어까지 7개 시나리오를 자동화하고, 실행
              결과와 API 문서 불일치를 정리했습니다.
            </p>
          </div>
        </header>

        <Section number="01" title="테스트 결과 요약">
          <dl className="border-t border-neutral-200">
            <div className="grid gap-2 border-b border-neutral-200 py-5 md:grid-cols-[140px_1fr] md:items-baseline md:gap-8">
              <dt className="text-sm font-medium leading-7">실행 결과</dt>
              <dd className="text-sm leading-7 text-neutral-600 md:text-base">
                운영 환경의 로그인 기능 테스트 7건을 실행하고 모두 통과
              </dd>
            </div>
            <div className="grid gap-2 border-b border-neutral-200 py-5 md:grid-cols-[140px_1fr] md:items-baseline md:gap-8">
              <dt className="text-sm font-medium leading-7">주요 확인 사항</dt>
              <dd className="text-sm leading-7 text-neutral-600 md:text-base">
                POST /auth/login 실제 응답 코드와 API 문서 간 불일치 1건 확인
              </dd>
            </div>
          </dl>
        </Section>

        <Section number="02" title="자동화 테스트 시나리오">
          <Table>
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-neutral-50 text-xs text-neutral-500">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">시나리오</th>
                  <th className="p-4">검증 포인트</th>
                  <th className="p-4">테스트 계정</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((s) => (
                  <tr key={s.id} className="border-t">
                    <td className="p-4 font-medium">{s.id}</td>
                    <td className="p-4">{s.scenario}</td>
                    <td className="p-4 leading-6 text-neutral-600">
                      {s.detail}
                    </td>
                    <td className="p-4">
                      {s.auth ? (
                        <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs text-violet-700">
                          필요
                        </span>
                      ) : (
                        <span className="text-xs text-neutral-300">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Table>
          <p className="mt-4 text-xs leading-6 text-neutral-400">
            운영 계정 보호를 위해 반복 실패·계정 잠금 시나리오는 제외했습니다.
          </p>
          <div className="mt-6 flex flex-col gap-3 border-y border-neutral-200 py-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium">Playwright 실행 결과</p>
              <p className="mt-1 text-sm leading-6 text-neutral-500">
                로그인 기능 자동화 테스트 7건 통과 화면
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowExecutionImage(true)}
              className="w-fit shrink-0 cursor-pointer text-sm underline underline-offset-4 transition-opacity hover:opacity-50"
            >
              실행 결과 이미지 보기
            </button>
          </div>
        </Section>

        <Section number="03" title="주요 확인 사항">
          <div className="space-y-4">
            <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-5 md:p-6">
              <div className="flex items-start gap-3">
                <AlertCircle
                  size={17}
                  className="mt-0.5 shrink-0 text-amber-600"
                />
                <div>
                  <p className="font-medium">
                    POST /auth/login 응답 코드 불일치 발견
                  </p>
                  <p className="mt-2 text-sm leading-7 text-neutral-700">
                    API 문서와 달리 실제 로그인 API가 201 응답을 반환하고 있음을
                    확인했습니다. 문서와 구현 중 기준 확인이 필요한 불일치로
                    기록했습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {showExecutionImage && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Playwright 실행 결과"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 md:p-8"
            onClick={() => setShowExecutionImage(false)}
          >
            <div
              className="relative max-h-full w-full max-w-6xl overflow-auto rounded-lg bg-white"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white px-5 py-4">
                <div>
                  <p className="text-sm font-medium">Playwright 실행 결과</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    로그인 기능 자동화 테스트 7건 통과
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowExecutionImage(false)}
                  aria-label="이미지 닫기"
                  className="cursor-pointer rounded-full p-2 transition-colors hover:bg-neutral-100"
                >
                  <XCircle size={22} />
                </button>
              </div>
              <img
                src={crcLoginReportImage}
                alt="Playwright 로그인 기능 자동화 테스트 7건 통과 결과 화면"
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
