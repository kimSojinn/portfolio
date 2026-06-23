import { AlertCircle, ArrowLeft, FileText } from "lucide-react";
import { useEffect } from "react";
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              운영 서비스 E2E Smoke Test
            </div>
            <h1 className="max-w-4xl text-3xl tracking-tight md:text-5xl">
              운영 도메인 Smoke Test QA 문서
            </h1>
            <p className="mt-5 text-base leading-8 text-neutral-600 md:text-lg">
              서비스 배포 후 실사용자 진입 전, 로그인·인증 흐름이 운영 환경에서
              정상 동작하는지 검증하기 위해
              <br />
              독립 Playwright 환경을 구축하고 7개 시나리오를 직접 실행한 내용을
              담았습니다.
            </p>
          </div>
        </header>

        <Section number="01" title="QA 요약">
          <div className="mb-6 grid grid-cols-3 gap-3">
            {[
              ["7", "Smoke Test Scenarios"],
              ["7", "PASS"],
              ["1", "Spec Mismatch Found"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-lg border border-neutral-200 p-5 md:p-6"
              >
                <p className="text-2xl tracking-tight md:text-3xl">{value}</p>
                <p className="mt-2 text-xs text-neutral-400">{label}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-neutral-50 p-5 md:p-6">
            <p className="text-base leading-8 text-neutral-700">
              로그인부터 인증 흐름까지 7개 시나리오를 운영 도메인에서 직접
              검증했습니다. <br />
              테스트 작성 과정에서 POST /auth/login 응답 코드가 일반적으로
              예상한 200이 아닌 201을 반환하는 것을 확인했으며, 문서와 실제 동작
              간의 스펙 불일치를 발견했습니다.
            </p>
          </div>
        </Section>

        <Section number="02" title="테스트 범위">
          <p className="mb-6 text-base leading-8 text-neutral-600">
            로그인 진입부터 인증 흐름까지 핵심 경로 7개 시나리오를 검증 대상으로
            삼았으며, 운영 환경에 영향을 줄 수 있는 케이스는 검증 범위에서
            제외했습니다.
          </p>
          <div className="rounded-lg border border-neutral-200 p-5 md:p-6">
            <p className="mb-3 text-xs tracking-[0.18em] text-neutral-400">
              Out of Scope
            </p>
            <p className="text-sm leading-7 text-neutral-600">
              회원가입, 비밀번호 재설정, 다량 로그인 실패 시도 — 운영 환경에서
              계정 잠금이나 Rate Limiting을 유발할 수 있는 시나리오는
              제외했습니다.
            </p>
          </div>
        </Section>

        <Section number="03" title="테스트 시나리오">
          <Table>
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-neutral-50 text-xs text-neutral-500">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">시나리오</th>
                  <th className="p-4">검증 포인트</th>
                  <th className="p-4">인증 필요</th>
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
          <figure className="mt-6 overflow-hidden rounded-lg border border-neutral-200 bg-white">
            <img
              src={crcLoginReportImage}
              alt="Playwright 리포트에서 로그인 smoke test 7개 케이스가 모두 통과한 화면"
              className="w-full"
              loading="lazy"
            />
            <figcaption className="border-t border-neutral-200 px-5 py-4 text-sm leading-7 text-neutral-500">
              Playwright HTML Report 기준 로그인 smoke test 7개 케이스가 모두
              통과한 실행 결과입니다.
            </figcaption>
          </figure>
        </Section>

        <Section number="04" title="발견 사항">
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
                    확인했습니다. 자동화 테스트 작성 과정에서 발견한 스펙
                    불일치로, 개발팀에 공유하고 API 문서와 실제 동작을 다시
                    확인하는 계기가 되었습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section number="05" title="QA 회고">
          <div className="space-y-5 rounded-lg bg-neutral-50 p-5 md:p-6">
            <p className="text-base leading-8 text-neutral-700">
              이번 프로젝트를 진행하며 운영 환경을 대상으로 테스트할 때는 검증
              범위를 넓히는 것보다 서비스에 영향을 주지 않는 범위 안에서 핵심
              시나리오를 선택하는 것이 중요하다는 점을 확인했습니다. 실제로 계정
              잠금이나 Rate Limiting을 유발할 수 있는 시나리오는 제외하고, 로그인과
              인증 흐름에 집중해 운영 환경에서도 안전하게 반복 검증할 수 있는 Smoke
              Test를 구성했습니다.
            </p>
            <p className="text-base leading-8 text-neutral-700">
              또한 자동화 테스트 작성 과정에서 API 문서와 실제 응답 코드가
              일치하지 않는 사례를 발견했습니다. 이를 통해 자동화 테스트는 단순히
              기능 동작 여부를 반복 확인하는 도구를 넘어, 문서화된 요구사항과 실제
              서비스 동작 사이의 차이를 검증하는 수단이 될 수 있다는 점을 확인할 수
              있었습니다.
            </p>
          </div>
        </Section>
      </div>
    </PageTransition>
  );
}
