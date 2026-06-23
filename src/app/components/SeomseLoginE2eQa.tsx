import {
    ArrowLeft,
    CheckCircle2,
    Code,
    ExternalLink,
    FileCode,
    FlaskConical,
    Layers,
    Play,
    Zap,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router";
import PageTransition from "./PageTransition";

type ProjectView = "overview" | "design" | "code";

const GITHUB_URL = "https://github.com/Team-SEOMSE/seomse-web/tree/main/e2e";

const scenarios = [
    { id: "E2E-001", scenario: "로그인 성공 후 메인 페이지 이동", mock: "200 OK", assertion: "URL 검증", duration: "1.4s" },
    { id: "E2E-002", scenario: "401 인증 실패 → 에러 alert 노출", mock: "401 Unauthorized", assertion: "dialog 검증", duration: "0.8s" },
    { id: "E2E-003", scenario: "403 권한 없음 → 에러 alert 노출", mock: "403 Forbidden", assertion: "dialog 검증", duration: "0.9s" },
    { id: "E2E-004", scenario: "500 서버 오류 → 에러 alert 노출", mock: "500 Internal", assertion: "dialog 검증", duration: "1.0s" },
    { id: "E2E-005", scenario: "네트워크 장애 → 에러 alert 노출", mock: "network fail", assertion: "dialog 검증", duration: "2.1s" },
    { id: "E2E-006", scenario: "응답 3초 지연 후 정상 처리", mock: "3s delay + 200", assertion: "URL + timing 검증", duration: "2.4s" },
];

const architecture = [
    { path: "pages/LoginPage.ts", role: "선택자·액션 캡슐화 (Page Object)" },
    { path: "mocks/auth.mock.ts", role: "시나리오별 API 응답 모킹" },
    { path: "fixtures/index.ts", role: "커스텀 fixture · 공유 테스트 데이터" },
    { path: "specs/login.spec.ts", role: "6개 테스트 케이스 구현" },
    { path: "utils/dialog.ts", role: "alert 메시지 검증 헬퍼" },
];

const pomCode = `// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  get emailInput()    { return this.page.locator('[name="email"]'); }
  get passwordInput() { return this.page.locator('[name="password"]'); }
  get submitButton()  { return this.page.locator('button[type="submit"]'); }

  async goto() { await this.page.goto('/login'); }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}`;

const mockCode = `// mocks/auth.mock.ts
export const mockLoginSuccess = async (page: Page) =>
  page.route('**/api/auth/login', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ token: 'mock-token' }),
    }));

export const mockLoginUnauthorized = async (page: Page) =>
  page.route('**/api/auth/login', route =>
    route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({ message: '이메일 또는 비밀번호를 확인해 주세요.' }),
    }));

export const mockLoginSlowResponse = async (page: Page) =>
  page.route('**/api/auth/login', async route => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ token: 'mock-token' }),
    });
  });`;

const specCode = `// specs/login.spec.ts (일부)
test('로그인 성공 후 메인 페이지 이동', async ({ page }) => {
  await mockLoginSuccess(page);
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('test@seomse.com', 'Password1!');
  await expect(page).toHaveURL('/');
});

test('401 인증 실패 시 에러 alert 노출', async ({ page }) => {
  await mockLoginUnauthorized(page);
  const loginPage = new LoginPage(page);
  const dialog = waitForDialog(page);
  await loginPage.goto();
  await loginPage.login('test@seomse.com', 'WrongPass!');
  await expect(await dialog).toContain('이메일 또는 비밀번호');
});

test('응답 3초 지연 후 정상 처리', async ({ page }) => {
  await mockLoginSlowResponse(page);
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('test@seomse.com', 'Password1!');
  await expect(page).toHaveURL('/');
});`;

const projectViews: { id: ProjectView; label: string; description: string }[] = [
    { id: "overview", label: "한눈에 보기", description: "성과와 전략" },
    { id: "design", label: "테스트 설계", description: "구조 · 시나리오" },
    { id: "code", label: "자동화 코드", description: "POM · Mock · Spec" },
];

function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: string }) {
    const tones: Record<string, string> = {
        PASS: "bg-emerald-50 text-emerald-700 border-emerald-200",
        neutral: "bg-neutral-50 text-neutral-600 border-neutral-200",
    };
    return (
        <span className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium ${tones[tone] ?? tones.neutral}`}>
            {children}
        </span>
    );
}

function CodeFile({ filename, children }: { filename: string; children: string }) {
    return (
        <div className="overflow-hidden rounded-lg border border-neutral-200">
            <div className="flex items-center gap-2 border-b border-neutral-800 bg-neutral-900 px-4 py-2.5">
                <FileCode size={13} className="text-neutral-500" />
                <span className="font-mono text-xs text-neutral-400">{filename}</span>
            </div>
            <pre className="overflow-x-auto bg-neutral-950 p-5 text-xs leading-6 text-neutral-200">
                <code>{children}</code>
            </pre>
        </div>
    );
}

export default function SeomseLoginE2eQa() {
    const [activeView, setActiveView] = useState<ProjectView>("overview");

    useEffect(() => window.scrollTo(0, 0), []);

    const changeView = (view: ProjectView) => {
        setActiveView(view);
        requestAnimationFrame(() =>
            document.getElementById("case-content")?.scrollIntoView({ behavior: "smooth", block: "start" })
        );
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-white text-black">
                {/* Top nav */}
                <nav className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur">
                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-8">
                        <Link to="/" className="flex items-center gap-2 text-sm transition-opacity hover:opacity-50">
                            <ArrowLeft size={18} /> Back
                        </Link>
                        <p className="hidden text-xs tracking-[0.18em] text-neutral-400 md:block">SEOMSE LOGIN E2E QA</p>
                        <Badge tone="PASS">QA Case Study</Badge>
                    </div>
                </nav>

                {/* Header */}
                <header className="px-6 pb-10 pt-28 md:px-8 md:pb-12 md:pt-36">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-5 flex flex-wrap gap-2">
                            <Badge>Playwright</Badge>
                            <Badge>TypeScript</Badge>
                            <Badge>POM</Badge>
                            <Badge>Network Mocking</Badge>
                            <Badge>GitHub Actions</Badge>
                        </div>
                        <p className="mb-3 text-xs tracking-[0.24em] text-neutral-400">SEOMSE LOGIN E2E QA PROJECT</p>
                        <h1 className="max-w-4xl text-3xl tracking-tight md:text-5xl">섬세 로그인 기능 E2E 자동화 테스트</h1>
                        <p className="mt-4 max-w-3xl text-base leading-8 text-neutral-600 md:text-lg">
                            백엔드 API 없이{" "}
                            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[0.85em]">page.route()</code>로
                            응답을 모킹하고, POM 패턴으로 6개 로그인 시나리오를 자동화했습니다.
                        </p>
                        <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm transition-colors hover:border-neutral-500"
                        >
                            <ExternalLink size={13} />
                            GitHub 소스 보기
                        </a>
                    </div>
                </header>

                {/* Tab nav */}
                <nav className="sticky top-[57px] z-40 border-y border-neutral-200 bg-white/95 px-6 backdrop-blur md:px-8">
                    <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto py-3">
                        {projectViews.map((view) => (
                            <button
                                key={view.id}
                                onClick={() => changeView(view.id)}
                                className={`min-w-fit rounded-lg px-4 py-3 text-left transition-colors md:px-5 ${activeView === view.id ? "bg-neutral-900 text-white" : "text-neutral-500 hover:bg-neutral-100 hover:text-black"}`}
                            >
                                <span className="block text-sm font-medium">{view.label}</span>
                                <span className={`mt-0.5 hidden text-[11px] md:block ${activeView === view.id ? "text-neutral-300" : "text-neutral-400"}`}>
                                    {view.description}
                                </span>
                            </button>
                        ))}
                    </div>
                </nav>

                <main id="case-content" className="scroll-mt-36">

                    {/* ── OVERVIEW ── */}
                    {activeView === "overview" && (
                        <div className="mx-auto max-w-7xl px-6 md:px-8">

                            {/* Metrics */}
                            <section className="py-12 md:py-16">
                                <p className="mb-6 text-xs tracking-[0.22em] text-neutral-400">01 · PROJECT SUMMARY</p>
                                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                    {[
                                        ["테스트 대상", "로그인 플로우"],
                                        ["시나리오", "6개"],
                                        ["실행 시간", "8.6초"],
                                        ["PASS율", "100%"],
                                    ].map(([label, value]) => (
                                        <div key={label} className="rounded-lg border border-neutral-200 p-5">
                                            <p className="text-xs text-neutral-400">{label}</p>
                                            <p className="mt-2 text-2xl tracking-tight">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Strategy */}
                            <section className="border-t border-neutral-200 py-12 md:py-16">
                                <p className="mb-2 text-xs tracking-[0.22em] text-neutral-400">02 · AUTOMATION STRATEGY</p>
                                <h2 className="mb-8 text-2xl tracking-tight">자동화 핵심 전략</h2>
                                <div className="grid gap-4 md:grid-cols-3">
                                    {[
                                        { icon: Layers, title: "Page Object Model", body: "선택자·액션을 LoginPage 클래스로 분리해 UI 변경 시 수정 범위를 단일화했습니다." },
                                        { icon: Code, title: "Network Mocking", body: "page.route()로 실제 API 경로를 가로채 시나리오별 응답을 주입, 백엔드 의존성을 제거했습니다." },
                                        { icon: Zap, title: "빠른 실행", body: "6개 시나리오를 8.6초 이내에 완료합니다. 3초 지연 시나리오도 실제 대기 시간이 포함된 수치입니다." },
                                    ].map(({ icon: Icon, title, body }) => (
                                        <article key={title} className="rounded-lg border border-neutral-200 p-5">
                                            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100">
                                                <Icon size={17} />
                                            </div>
                                            <h3 className="mb-2 text-sm font-medium">{title}</h3>
                                            <p className="text-sm leading-7 text-neutral-500">{body}</p>
                                        </article>
                                    ))}
                                </div>
                            </section>

                            {/* Results table */}
                            <section className="border-t border-neutral-200 py-12 md:py-16">
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <p className="mb-1 text-xs tracking-[0.22em] text-neutral-400">03 · TEST RESULTS</p>
                                        <h2 className="text-2xl tracking-tight">전체 실행 결과</h2>
                                    </div>
                                    <Badge tone="PASS">6 / 6 PASS</Badge>
                                </div>
                                <div className="overflow-x-auto rounded-lg border border-neutral-200">
                                    <table className="w-full min-w-[600px] text-left text-sm">
                                        <thead className="bg-neutral-50 text-xs text-neutral-500">
                                            <tr>
                                                <th className="p-3 pl-4 font-normal">ID</th>
                                                <th className="p-3 font-normal">시나리오</th>
                                                <th className="p-3 font-normal">Mock 응답</th>
                                                <th className="p-3 font-normal">검증 방법</th>
                                                <th className="p-3 pr-4 text-right font-normal">시간</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {scenarios.map((s) => (
                                                <tr key={s.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                                                    <td className="p-3 pl-4 font-mono text-xs text-neutral-400">{s.id}</td>
                                                    <td className="p-3">{s.scenario}</td>
                                                    <td className="p-3 font-mono text-xs text-neutral-500">{s.mock}</td>
                                                    <td className="p-3 text-neutral-500">{s.assertion}</td>
                                                    <td className="p-3 pr-4 text-right font-mono text-xs text-neutral-400">{s.duration}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* Insights */}
                            <section className="border-t border-neutral-200 py-12 md:py-16">
                                <p className="mb-2 text-xs tracking-[0.22em] text-neutral-400">04 · INSIGHTS</p>
                                <h2 className="mb-8 text-2xl tracking-tight">자동화 관점 회고</h2>
                                <div className="grid gap-4 md:grid-cols-3">
                                    {[
                                        { icon: FlaskConical, title: "모킹 설계의 중요성", body: "실제 API 경로와 DOM 셀렉터를 그대로 사용한 덕분에 백엔드 없이도 실사용에 가까운 검증이 가능했습니다." },
                                        { icon: Play, title: "예외 시나리오 우선", body: "정상 흐름보다 401·403·500·네트워크 오류 케이스가 실제 품질 문제를 더 잘 드러냈습니다." },
                                        { icon: CheckCircle2, title: "POM으로 유지보수 개선", body: "UI 선택자 변경 시 LoginPage만 수정하면 돼 6개 케이스 전체에 영향을 주지 않았습니다." },
                                    ].map(({ icon: Icon, title, body }) => (
                                        <article key={title} className="rounded-lg border border-neutral-200 p-5">
                                            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100">
                                                <Icon size={17} />
                                            </div>
                                            <h3 className="mb-2 text-sm font-medium">{title}</h3>
                                            <p className="text-sm leading-7 text-neutral-500">{body}</p>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )}

                    {/* ── DESIGN ── */}
                    {activeView === "design" && (
                        <div className="mx-auto max-w-7xl px-6 md:px-8">

                            {/* Scope */}
                            <section className="py-12 md:py-16">
                                <p className="mb-2 text-xs tracking-[0.22em] text-neutral-400">02 · TEST SCOPE</p>
                                <h2 className="mb-6 text-2xl tracking-tight">테스트 범위</h2>
                                <div className="grid gap-3 md:grid-cols-2">
                                    <div className="rounded-lg border border-neutral-200 p-5">
                                        <Badge tone="PASS">In Scope</Badge>
                                        <p className="mt-3 text-sm leading-7 text-neutral-500">
                                            로그인 성공/실패, API 오류 처리 (401·403·500), 네트워크 장애, 응답 지연
                                        </p>
                                    </div>
                                    <div className="rounded-lg border border-neutral-200 p-5">
                                        <Badge>Out of Scope</Badge>
                                        <p className="mt-3 text-sm leading-7 text-neutral-500">
                                            회원가입, 비밀번호 재설정, 소셜 로그인, 세션 만료
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Architecture */}
                            <section className="border-t border-neutral-200 py-12 md:py-16">
                                <p className="mb-2 text-xs tracking-[0.22em] text-neutral-400">03 · FILE ARCHITECTURE</p>
                                <h2 className="mb-6 text-2xl tracking-tight">프로젝트 구조</h2>
                                <div className="rounded-lg border border-neutral-200 bg-neutral-950 p-5 font-mono text-sm">
                                    <p className="mb-3 text-neutral-500">e2e/</p>
                                    {architecture.map(({ path, role }, i) => (
                                        <div key={path} className={`flex flex-col gap-0.5 pb-3 md:flex-row md:items-baseline md:gap-6 ${i < architecture.length - 1 ? "mb-3 border-b border-neutral-800" : ""}`}>
                                            <span className="shrink-0 text-violet-400">├─ {path}</span>
                                            <span className="text-xs text-neutral-500">{role}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Scenarios */}
                            <section className="border-t border-neutral-200 py-12 md:py-16">
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <p className="mb-1 text-xs tracking-[0.22em] text-neutral-400">04 · TEST SCENARIOS</p>
                                        <h2 className="text-2xl tracking-tight">6개 테스트 시나리오</h2>
                                    </div>
                                    <span className="text-sm text-neutral-400">각 케이스는 독립된 mock 주입</span>
                                </div>
                                <div className="overflow-hidden rounded-lg border border-neutral-200">
                                    {scenarios.map((s, i) => (
                                        <div
                                            key={s.id}
                                            className={`flex items-start gap-4 p-4 md:items-center ${i < scenarios.length - 1 ? "border-b border-neutral-100" : ""} ${i % 2 === 0 ? "bg-white" : "bg-neutral-50/50"}`}
                                        >
                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs text-white">
                                                {i + 1}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm">{s.scenario}</p>
                                                <p className="mt-0.5 font-mono text-xs text-neutral-400">
                                                    {s.mock} · {s.assertion}
                                                </p>
                                            </div>
                                            <div className="flex shrink-0 items-center gap-3">
                                                <Badge tone="PASS">PASS</Badge>
                                                <span className="font-mono text-xs text-neutral-400">{s.duration}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )}

                    {/* ── CODE ── */}
                    {activeView === "code" && (
                        <div className="mx-auto max-w-7xl px-6 md:px-8">

                            <section className="py-12 md:py-16">
                                <p className="mb-2 text-xs tracking-[0.22em] text-neutral-400">05 · PAGE OBJECT MODEL</p>
                                <h2 className="mb-3 text-2xl tracking-tight">LoginPage.ts</h2>
                                <p className="mb-6 text-sm leading-7 text-neutral-500">
                                    선택자를 한 곳에서 관리해 UI 변경 시 테스트 수정 범위를 최소화했습니다.
                                </p>
                                <CodeFile filename="pages/LoginPage.ts">{pomCode}</CodeFile>
                            </section>

                            <section className="border-t border-neutral-200 py-12 md:py-16">
                                <p className="mb-2 text-xs tracking-[0.22em] text-neutral-400">06 · NETWORK MOCKING</p>
                                <h2 className="mb-3 text-2xl tracking-tight">auth.mock.ts</h2>
                                <p className="mb-6 text-sm leading-7 text-neutral-500">
                                    page.route()로 실제 API 경로를 가로채 시나리오별 응답을 주입합니다.
                                    백엔드 서버 없이 오류 케이스를 안정적으로 재현했습니다.
                                </p>
                                <CodeFile filename="mocks/auth.mock.ts">{mockCode}</CodeFile>
                            </section>

                            <section className="border-t border-neutral-200 py-12 md:py-16">
                                <p className="mb-2 text-xs tracking-[0.22em] text-neutral-400">07 · TEST SPEC</p>
                                <h2 className="mb-3 text-2xl tracking-tight">login.spec.ts</h2>
                                <p className="mb-6 text-sm leading-7 text-neutral-500">
                                    각 테스트는 독립적인 mock을 주입해 서로 영향을 주지 않습니다.
                                </p>
                                <CodeFile filename="specs/login.spec.ts">{specCode}</CodeFile>
                                <div className="mt-6">
                                    <a
                                        href={GITHUB_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm transition-colors hover:border-neutral-500"
                                    >
                                        <ExternalLink size={13} />
                                        전체 소스 코드 보기
                                    </a>
                                </div>
                            </section>
                        </div>
                    )}
                </main>

                <footer className="border-t border-neutral-200 px-6 py-10 text-center text-sm text-neutral-400 md:px-8">
                    SEOMSE Login E2E QA · Playwright + TypeScript + Network Mocking
                </footer>
            </div>
        </PageTransition>
    );
}
