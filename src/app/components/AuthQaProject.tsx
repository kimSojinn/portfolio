import {
    ArrowLeft,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Database,
    Download,
    ExternalLink,
    FlaskConical,
    Play,
    ShieldCheck,
    X,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router";
import PageTransition from "./PageTransition";

type Status = "PASS" | "FAIL" | "BLOCKED";
type ProjectView = "overview" | "design" | "defects" | "verification";
type Bug = {
    id: string;
    title: string;
    severity: "Critical" | "High" | "Medium" | "Low";
    priority: "High" | "Medium" | "Low";
    status: string;
    rate: string;
    tc: string;
    environment: string;
    steps: string[];
    actual: string;
    expected: string;
    cause: string;
    evidence: string;
};

const checklist = [
    ["CL-001", "회원가입", "이메일 입력 가능 여부", "PASS", "일반 이메일 입력"],
    ["CL-002", "회원가입", "중복 이메일 검증 여부", "PASS", "가입 이력 계정"],
    ["CL-003", "회원가입", "비밀번호 마스킹 표시", "PASS", "입력 즉시 마스킹"],
    ["CL-004", "회원가입", "필수 약관 미동의 시 가입 제한", "PASS", "필수/선택 분리"],
    ["CL-005", "회원가입", "가입 완료 후 로그인 이동", "PASS", "리다이렉트 확인"],
    ["CL-006", "로그인", "ID 공백 입력 제한", "FAIL", "서버 요청 발생"],
    ["CL-007", "로그인", "잘못된 비밀번호 오류 문구", "PASS", "문구 노출 확인"],
    ["CL-008", "로그인", "비활성 계정 로그인 제한", "PASS", "접근 차단"],
    ["CL-009", "로그인", "새로고침 후 세션 유지", "PASS", "토큰 유지"],
    ["CL-010", "로그인", "로그아웃 후 뒤로가기 제한", "FAIL", "캐시 화면 노출"],
    ["CL-011", "예외 처리", "서버 오류 안내 문구", "PASS", "500 응답 mock"],
    ["CL-012", "보안", "비밀번호 로그 노출 여부", "PASS", "Network 확인"],
];

const testCases = [
    ["TC-001", "회원가입", "Positive", "유효한 정보로 회원가입", "qa01@example.com / Qa1234!!", "가입 완료 후 로그인 페이지 이동", "기대 결과와 동일", "PASS", "P0"],
    ["TC-002", "회원가입", "Negative", "이메일 공백 제출", "email: 공백", "필수 입력 안내 노출", "필수 입력 안내 노출", "PASS", "P1"],
    ["TC-003", "회원가입", "Negative", "이메일 형식 오류", "qa01@", "형식 오류 안내 노출", "형식 오류 안내 노출", "PASS", "P1"],
    ["TC-004", "회원가입", "Boundary", "비밀번호 최소값 미만", "7자: Qa12!!a", "8자 이상 안내 노출", "안내 문구 노출", "PASS", "P1"],
    ["TC-005", "회원가입", "Boundary", "비밀번호 최소값", "8자: Qa12!!ab", "가입 가능", "가입 가능", "PASS", "P1"],
    ["TC-006", "회원가입", "Boundary", "비밀번호 최대값", "20자", "가입 가능", "가입 가능", "PASS", "P2"],
    ["TC-007", "회원가입", "Boundary", "비밀번호 최대값 초과", "21자", "입력 제한 또는 안내", "21자 입력 허용", "FAIL", "P1"],
    ["TC-008", "회원가입", "Negative", "중복 이메일 가입", "qa01@example.com", "중복 안내 노출", "중복 안내 노출", "PASS", "P0"],
    ["TC-009", "회원가입", "E2E", "필수 약관 미동의 가입", "terms: false", "가입 버튼 비활성", "버튼 비활성", "PASS", "P1"],
    ["TC-010", "로그인", "Positive", "정상 로그인", "qa01@example.com / Qa1234!!", "마이페이지 진입", "마이페이지 진입", "PASS", "P0"],
    ["TC-011", "로그인", "Negative", "잘못된 비밀번호 로그인", "Wrong123!!", "오류 문구 노출", "오류 문구 노출", "PASS", "P0"],
    ["TC-012", "로그인", "Negative", "미가입 이메일 로그인", "unknown@example.com", "계정 정보 오류 노출", "계정 정보 오류 노출", "PASS", "P1"],
    ["TC-013", "로그인", "Negative", "비밀번호 공백 제출", "password: 공백", "클라이언트 validation", "validation 노출", "PASS", "P1"],
    ["TC-014", "로그인", "Negative", "ID 공백 제출", "email: 공백", "클라이언트 validation", "API 요청 전송됨", "FAIL", "P0"],
    ["TC-015", "로그인", "Security", "SQL Injection 문자열 입력", "' OR 1=1 --", "로그인 차단 및 일반 오류", "로그인 차단", "PASS", "P0"],
    ["TC-016", "로그인", "Security", "XSS 문자열 입력", "<script>alert(1)</script>", "스크립트 미실행", "문자열 처리", "PASS", "P0"],
    ["TC-017", "로그인", "Negative", "비활성 계정 로그인", "inactive@example.com", "접근 차단 안내", "접근 차단 안내", "PASS", "P0"],
    ["TC-018", "세션", "Regression", "로그인 후 새로고침", "refresh", "로그인 유지", "로그인 유지", "PASS", "P1"],
    ["TC-019", "세션", "Regression", "만료 토큰으로 접근", "expired token", "로그인 페이지 이동", "로그인 페이지 이동", "PASS", "P0"],
    ["TC-020", "세션", "E2E", "로그아웃 후 뒤로가기", "logout → back", "보호 페이지 접근 차단", "캐시 화면 노출", "FAIL", "P0"],
    ["TC-021", "예외 처리", "Negative", "로그인 API 500 응답", "500 mock", "공통 오류 안내", "공통 오류 안내", "PASS", "P1"],
    ["TC-022", "회원가입", "Security", "이메일 XSS 문자열 입력", "<img onerror=alert(1)>", "스크립트 미실행", "스크립트 미실행", "PASS", "P0"],
    ["TC-023", "회원가입", "Regression", "선택 약관 미동의 가입", "marketing: false", "가입 가능", "가입 가능", "PASS", "P2"],
    ["TC-024", "세션", "E2E", "로그아웃 후 재로그인", "logout → login", "정상 재로그인", "정상 재로그인", "PASS", "P1"],
] as const;

const bugs: Bug[] = [
    {
        id: "BUG-001", title: "ID 공백 상태에서 로그인 요청이 서버로 전송됨", severity: "Medium", priority: "High", status: "Open", rate: "100%", tc: "TC-014",
        environment: "Chrome 124 / Windows 11 / Staging",
        steps: ["로그인 페이지 진입", "이메일을 공백으로 두고 비밀번호 입력", "로그인 버튼 클릭", "Network 탭에서 POST /api/login 확인"],
        actual: "빈 이메일 값으로 로그인 API 요청이 전송되고 서버가 400 응답을 반환한다.",
        expected: "클라이언트 validation을 노출하고 API 요청을 보내지 않는다.",
        cause: "이메일 필드의 trim 처리와 submit 전 validation 누락 가능성",
        evidence: "Network 탭 요청 payload와 400 응답 캡처",
    },
    {
        id: "BUG-002", title: "비밀번호 21자 입력 시 길이 제한이 적용되지 않음", severity: "Low", priority: "Medium", status: "Open", rate: "100%", tc: "TC-007",
        environment: "Chrome 124 / Windows 11 / Staging",
        steps: ["회원가입 페이지 진입", "비밀번호에 21자 입력", "나머지 필수값 입력", "가입 요청"],
        actual: "정책 최대값 20자를 초과한 비밀번호로 가입할 수 있다.",
        expected: "20자 초과 입력을 제한하거나 정책 안내를 표시한다.",
        cause: "UI와 API의 최대 길이 validation 규칙 불일치 가능성",
        evidence: "21자 payload와 가입 성공 응답 캡처",
    },
    {
        id: "BUG-003", title: "로그아웃 후 뒤로가기 시 마이페이지 캐시 화면 노출", severity: "High", priority: "High", status: "In Review", rate: "100%", tc: "TC-020",
        environment: "Chrome 124 / Windows 11 / Staging",
        steps: ["로그인 후 마이페이지 진입", "로그아웃 클릭", "로그인 페이지 이동 확인", "브라우저 뒤로가기 클릭"],
        actual: "마이페이지의 이전 화면과 사용자 이름이 잠시 노출된다.",
        expected: "보호 페이지를 노출하지 않고 로그인 페이지를 유지한다.",
        cause: "history 접근 시 인증 상태 재검증 또는 cache-control 설정 누락 가능성",
        evidence: "로그아웃 후 뒤로가기 화면 녹화",
    },
    {
        id: "BUG-004", title: "중복 이메일 오류 문구가 모바일에서 잘림", severity: "Low", priority: "Low", status: "Fixed", rate: "100%", tc: "TC-008",
        environment: "Chrome Mobile 390x844 / Staging",
        steps: ["모바일 viewport 설정", "가입 이력 이메일 입력", "회원가입 요청", "오류 문구 확인"],
        actual: "중복 이메일 오류 문구의 마지막 글자가 영역 밖으로 잘린다.",
        expected: "오류 문구 전체가 줄바꿈되어 표시된다.",
        cause: "오류 영역 고정 높이 적용",
        evidence: "390px viewport 화면 캡처",
    },
];

const apis = [
    ["POST", "/api/signup", '{\n  "email": "qa01@example.com",\n  "password": "Qa1234!!",\n  "termsAgreed": true\n}', '201 Created\n{ "userId": 1042, "email": "qa01@example.com" }', "PASS", "계정 생성 / 중복 이메일 409 / 필수값 400"],
    ["POST", "/api/login", '{\n  "email": "qa01@example.com",\n  "password": "Qa1234!!"\n}', '200 OK\n{ "accessToken": "eyJ...", "expiresIn": 3600 }', "PASS", "토큰 발급 / 오류 문구 / 비활성 계정 403"],
    ["GET", "/api/users/check-email?email=qa01@example.com", "No request body", '200 OK\n{ "available": false }', "PASS", "중복 여부 boolean / URL encoding / 공백값 400"],
    ["POST", "/api/logout", '{ "refreshToken": "eyJ..." }', "204 No Content", "PASS", "토큰 무효화 / 재사용 차단 / 세션 종료"],
];

const sqlChecks = [
    ["회원가입 후 계정 생성 확인", "SELECT id, email, status, created_at\nFROM users\nWHERE email = 'qa01@example.com';", ["1042", "qa01@example.com", "ACTIVE", "2026-05-28 10:04:22"]],
    ["로그인 성공 이력 확인", "SELECT user_id, result, login_at\nFROM login_history\nWHERE user_id = 1042\nORDER BY login_at DESC LIMIT 1;", ["1042", "SUCCESS", "2026-05-28 10:12:03"]],
    ["비활성 계정 상태값 확인", "SELECT email, status\nFROM users\nWHERE email = 'inactive@example.com';", ["inactive@example.com", "INACTIVE"]],
    ["중복 이메일 생성 여부 확인", "SELECT email, COUNT(*) AS count\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;", ["0 rows", "-", "-"]],
];

const playwrightCode = `test('정상 로그인 후 마이페이지 진입', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'qa01@example.com');
  await page.fill('[name="password"]', 'Qa1234!!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/mypage');
  await expect(page.locator('h1')).toBeVisible();
});`;

const projectViews: { id: ProjectView; label: string; description: string }[] = [
    { id: "overview", label: "한눈에 보기", description: "성과와 핵심 인사이트" },
    { id: "design", label: "테스트 설계", description: "범위, 전략, TC" },
    { id: "defects", label: "결함 분석", description: "발견 이슈와 재현 절차" },
    { id: "verification", label: "기술 검증", description: "API, SQL, 자동화" },
];

function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: string }) {
    const tones: Record<string, string> = {
        PASS: "bg-emerald-50 text-emerald-700 border-emerald-200",
        FAIL: "bg-rose-50 text-rose-700 border-rose-200",
        BLOCKED: "bg-amber-50 text-amber-700 border-amber-200",
        High: "bg-rose-50 text-rose-700 border-rose-200",
        Medium: "bg-amber-50 text-amber-700 border-amber-200",
        Low: "bg-sky-50 text-sky-700 border-sky-200",
        P0: "bg-rose-50 text-rose-700 border-rose-200",
        P1: "bg-amber-50 text-amber-700 border-amber-200",
        P2: "bg-neutral-50 text-neutral-600 border-neutral-200",
        neutral: "bg-neutral-50 text-neutral-600 border-neutral-200",
    };
    return <span className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium ${tones[tone] ?? tones.neutral}`}>{children}</span>;
}

function Section({ id, eyebrow, title, description, children }: { id: string; eyebrow: string; title: string; description?: string; children: ReactNode }) {
    return <section id={id} className="scroll-mt-24 border-t border-neutral-200 px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
            <div className="mb-8 md:mb-12">
                <p className="mb-3 text-xs tracking-[0.22em] text-neutral-400">{eyebrow}</p>
                <h2 className="text-2xl tracking-tight md:text-3xl">{title}</h2>
                {description && <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-500 md:text-base">{description}</p>}
            </div>
            {children}
        </div>
    </section>;
}

function CodeBlock({ children }: { children: string }) {
    return <pre className="overflow-x-auto rounded-lg bg-neutral-950 p-5 text-xs leading-6 text-neutral-200"><code>{children}</code></pre>;
}

function TableWrap({ children }: { children: ReactNode }) {
    return <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">{children}</div>;
}

function DonutChart() {
    return <div className="flex items-center gap-8">
        <div className="relative h-36 w-36 rounded-full" style={{ background: "conic-gradient(#10b981 0 87.5%, #f43f5e 87.5% 100%)" }}>
            <div className="absolute inset-5 flex items-center justify-center rounded-full bg-white text-center"><span className="text-2xl font-semibold">87.5<small className="text-sm">%</small></span></div>
        </div>
        <div className="space-y-3 text-sm"><p><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />PASS 21</p><p><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-rose-500" />FAIL 3</p></div>
    </div>;
}

function BarChart({ data }: { data: [string, number, string][] }) {
    const max = Math.max(...data.map(([, value]) => value));
    return <div className="space-y-4">{data.map(([label, value, color]) => <div key={label}>
        <div className="mb-1.5 flex justify-between text-xs text-neutral-500"><span>{label}</span><span>{value}</span></div>
        <div className="h-2 rounded-full bg-neutral-100"><div className={`h-2 rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }} /></div>
    </div>)}</div>;
}

export default function AuthQaProject() {
    const [activeView, setActiveView] = useState<ProjectView>("overview");
    const [openScopes, setOpenScopes] = useState(["회원가입", "로그인"]);
    const [checklistOpen, setChecklistOpen] = useState(true);
    const [clFeature, setClFeature] = useState("전체");
    const [tcStatus, setTcStatus] = useState("전체");
    const [tcType, setTcType] = useState("전체");
    const [expandedTc, setExpandedTc] = useState<string | null>(null);
    const [selectedBug, setSelectedBug] = useState<Bug | null>(null);

    useEffect(() => window.scrollTo(0, 0), []);

    const filteredChecklist = checklist.filter((row) => clFeature === "전체" || row[1] === clFeature);
    const filteredTc = useMemo(() => testCases.filter((row) => (tcStatus === "전체" || row[7] === tcStatus) && (tcType === "전체" || row[2] === tcType)), [tcStatus, tcType]);
    const scopeCards = [
        ["회원가입", "이메일 입력, 비밀번호 입력, 약관 동의, 가입 완료"],
        ["로그인", "정상 로그인, 로그인 실패, 계정 상태별 처리, 세션 유지"],
        ["예외 처리", "공백 입력, 형식 오류, 중복 계정, 서버 오류"],
        ["보안 / 안정성", "SQL Injection, XSS, 토큰 만료, 새로고침 / 뒤로가기"],
    ];
    const changeView = (view: ProjectView) => {
        setActiveView(view);
        requestAnimationFrame(() => document.getElementById("case-content")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    };

    return <PageTransition>
        <div className="min-h-screen bg-white text-black">
            <nav className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-8">
                    <Link to="/" className="flex items-center gap-2 text-sm transition-opacity hover:opacity-50"><ArrowLeft size={18} /> Back</Link>
                    <p className="hidden text-xs tracking-[0.18em] text-neutral-400 md:block">AUTHENTICATION QA</p>
                    <Badge tone="PASS">QA Case Study</Badge>
                </div>
            </nav>

            <header className="px-6 pb-12 pt-28 md:px-8 md:pb-16 md:pt-36">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-6 flex flex-wrap gap-2"><Badge>Manual QA</Badge><Badge>API</Badge><Badge>SQL</Badge><Badge>Playwright</Badge><Badge>CI</Badge></div>
                    <p className="mb-3 text-xs tracking-[0.24em] text-neutral-400">AUTHENTICATION FEATURE QA PROJECT</p>
                    <h1 className="max-w-4xl text-3xl tracking-tight md:text-5xl">회원가입 / 로그인 기능 QA 테스트 프로젝트</h1>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-600 md:text-lg">입력값 검증부터 세션 안정성까지 핵심 인증 흐름을 테스트하고, 발견한 결함을 API·DB 검증과 자동화 테스트로 확장한 실무형 QA 사례입니다.</p>
                </div>
            </header>

            <nav className="sticky top-[57px] z-40 border-y border-neutral-200 bg-white/95 px-6 backdrop-blur md:px-8">
                <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto py-3">
                    {projectViews.map((view) => <button
                        key={view.id}
                        onClick={() => changeView(view.id)}
                        className={`min-w-fit rounded-lg px-4 py-3 text-left transition-colors md:px-5 ${activeView === view.id ? "bg-neutral-900 text-white" : "text-neutral-500 hover:bg-neutral-100 hover:text-black"}`}
                    >
                        <span className="block text-sm font-medium">{view.label}</span>
                        <span className={`mt-1 hidden text-[11px] md:block ${activeView === view.id ? "text-neutral-300" : "text-neutral-400"}`}>{view.description}</span>
                    </button>)}
                </div>
            </nav>

            <main id="case-content" className="scroll-mt-36">
            {activeView === "overview" && <>
            <Section id="summary" eyebrow="01 · PROJECT SUMMARY" title="프로젝트 요약">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                    {[["테스트 대상", "회원가입 / 로그인"], ["테스트 기간", "3일"], ["작성 TC", "42건"], ["발견 Bug", "6건"], ["자동화 TC", "8건"], ["사용 도구", "4개"]].map(([label, value]) => <div key={label} className="rounded-lg border border-neutral-200 p-5"><p className="text-xs text-neutral-400">{label}</p><p className="mt-3 text-xl tracking-tight">{value}</p></div>)}
                </div>
                <div className="mt-4 flex flex-wrap gap-2"><Badge tone="PASS">테스트 완료</Badge><Badge>Postman</Badge><Badge>MySQL</Badge><Badge>Playwright</Badge><Badge>GitHub Actions</Badge></div>
            </Section>
            <Section id="guide" eyebrow="02 · EVIDENCE GUIDE" title="상세 검증 내용은 목적별로 나누었습니다" description="상단 탭을 선택하면 테스트 설계 과정, 발견한 결함, API·DB·자동화 검증 내용을 각각 확인할 수 있습니다.">
                <div className="grid gap-3 md:grid-cols-3">
                    {projectViews.slice(1).map((view, index) => <button key={view.id} onClick={() => changeView(view.id)} className="group rounded-lg border border-neutral-200 p-5 text-left transition-colors hover:border-neutral-500">
                        <p className="text-xs text-neutral-400">0{index + 1}</p>
                        <h3 className="mt-4 flex items-center justify-between text-lg">{view.label}<ChevronRight size={17} className="transition-transform group-hover:translate-x-1" /></h3>
                        <p className="mt-3 text-sm leading-7 text-neutral-500">{view.description}</p>
                    </button>)}
                </div>
            </Section>
            </>}

            {activeView === "design" && <>
            <Section id="scope" eyebrow="02 · TEST SCOPE" title="기능별 테스트 범위" description="사용자가 계정을 만들고 인증 상태를 유지하는 흐름을 중심으로 검증 범위를 정의했습니다.">
                <div className="grid gap-3 md:grid-cols-2">{scopeCards.map(([title, content]) => {
                    const open = openScopes.includes(title);
                    return <button key={title} onClick={() => setOpenScopes(open ? openScopes.filter((item) => item !== title) : [...openScopes, title])} className="rounded-lg border border-neutral-200 p-5 text-left">
                        <span className="flex items-center justify-between"><strong>{title}</strong><ChevronDown size={17} className={`transition-transform ${open ? "rotate-180" : ""}`} /></span>
                        {open && <span className="mt-4 block text-sm leading-7 text-neutral-500">{content}</span>}
                    </button>;
                })}</div>
                <TableWrap><table className="mt-8 w-full min-w-[680px] text-left text-sm"><thead className="bg-neutral-50 text-xs text-neutral-500"><tr><th className="p-4">구분</th><th className="p-4">포함 범위</th><th className="p-4">제외 범위</th><th className="p-4">선정 기준</th></tr></thead><tbody><tr className="border-t"><td className="p-4"><Badge tone="PASS">In Scope</Badge></td><td className="p-4">가입, 로그인, 로그아웃, 세션, 입력 validation</td><td className="p-4 text-neutral-400">-</td><td className="p-4">인증 핵심 플로우와 결함 영향도</td></tr><tr className="border-t"><td className="p-4"><Badge>Out of Scope</Badge></td><td className="p-4 text-neutral-400">-</td><td className="p-4">소셜 로그인, 비밀번호 재설정, 이메일 발송</td><td className="p-4">별도 연동 시스템이 필요한 기능</td></tr></tbody></table></TableWrap>
            </Section>

            <Section id="strategy" eyebrow="03 · TEST STRATEGY" title="테스트 설계 전략" description="정상 동작 확인에 그치지 않고 입력 조건과 사용자 행동에 따라 실패 가능성이 높은 구간을 분리했습니다.">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{[
                    ["Positive", "기본 인증 플로우 확인", "유효한 정보로 가입 후 로그인"],
                    ["Negative", "오류 처리와 안내 확인", "공백, 중복 계정, 비활성 계정"],
                    ["BVA", "최소·최대 허용값 경계 검증", "비밀번호 7자, 8자, 20자, 21자"],
                    ["EP", "입력 유형별 대표값 검증", "유효 이메일 / test / test@ / 공백"],
                    ["Security", "악성 입력과 토큰 처리 확인", "SQL Injection, XSS, 만료 토큰"],
                    ["E2E", "연결된 사용자 흐름 검증", "가입 → 로그인 → 로그아웃 → 재접근"],
                ].map(([title, reason, example]) => <article key={title} className="rounded-lg border border-neutral-200 p-5"><Badge>{title}</Badge><p className="mt-5 text-xs text-neutral-400">적용 이유</p><p className="mt-2 text-sm leading-6">{reason}</p><p className="mt-5 text-xs text-neutral-400">예시 TC</p><p className="mt-2 text-sm leading-6 text-neutral-600">{example}</p></article>)}</div>
                <TableWrap><table className="mt-8 w-full min-w-[680px] text-left text-sm"><thead className="bg-neutral-50 text-xs text-neutral-500"><tr><th className="p-4">기법</th><th className="p-4">적용 대상</th><th className="p-4">테스트 데이터</th><th className="p-4">목적</th></tr></thead><tbody>{[["BVA", "비밀번호 길이 8~20자", "7자 / 8자 / 20자 / 21자", "최소·최대 경계 검증"], ["EP", "이메일 입력값", "test@example.com / test / test@ / 공백", "유효·무효 그룹별 대표값 검증"]].map((row) => <tr key={row[0]} className="border-t">{row.map((item) => <td key={item} className="p-4">{item}</td>)}</tr>)}</tbody></table></TableWrap>
            </Section>

            <Section id="checklist" eyebrow="04 · CHECKLIST" title="사전 점검 Checklist">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><button onClick={() => setChecklistOpen(!checklistOpen)} className="flex items-center gap-2 text-sm"><ChevronDown size={16} className={`transition-transform ${checklistOpen ? "rotate-180" : ""}`} /> {checklistOpen ? "테이블 접기" : "테이블 펼치기"}</button><select value={clFeature} onChange={(event) => setClFeature(event.target.value)} className="rounded-full border border-neutral-200 px-4 py-2 text-sm"><option>전체</option><option>회원가입</option><option>로그인</option><option>예외 처리</option><option>보안</option></select></div>
                {checklistOpen && <TableWrap><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-neutral-50 text-xs text-neutral-500"><tr>{["CL ID", "기능", "점검 항목", "결과", "비고"].map((head) => <th key={head} className="p-4">{head}</th>)}</tr></thead><tbody>{filteredChecklist.map((row) => <tr key={row[0]} className="border-t">{row.map((item, index) => <td key={index} className="p-4">{index === 3 ? <Badge tone={item}>{item}</Badge> : item}</td>)}</tr>)}</tbody></table></TableWrap>}
            </Section>

            <Section id="testcase" eyebrow="05 · TEST CASE" title="테스트 케이스" description="대표 TC 24건을 표시합니다. 전체 산출물은 42건이며, 실패 케이스는 버그 리포트와 연결됩니다.">
                <div className="mb-4 flex flex-wrap gap-2">{["전체", "PASS", "FAIL", "BLOCKED"].map((item) => <button key={item} onClick={() => setTcStatus(item)} className={`rounded-full border px-4 py-2 text-xs ${tcStatus === item ? "border-black bg-black text-white" : "border-neutral-200"}`}>{item}</button>)}<select value={tcType} onChange={(event) => setTcType(event.target.value)} className="rounded-full border border-neutral-200 px-4 py-2 text-xs"><option>전체</option>{["Positive", "Negative", "Boundary", "Security", "E2E", "Regression"].map((item) => <option key={item}>{item}</option>)}</select></div>
                <TableWrap><table className="w-full min-w-[1180px] text-left text-xs"><thead className="bg-neutral-50 text-neutral-500"><tr>{["TC ID", "기능", "유형", "시나리오", "테스트 데이터", "기대 결과", "실제 결과", "상태", "우선순위", ""].map((head, index) => <th key={index} className="p-4">{head}</th>)}</tr></thead><tbody>{filteredTc.map((row) => <><tr key={row[0]} className="border-t"><td className="p-4 font-medium">{row[0]}</td>{row.slice(1).map((item, index) => <td key={index} className="max-w-[180px] p-4 leading-5">{index === 6 ? <Badge tone={item}>{item}</Badge> : index === 7 ? <Badge tone={item}>{item}</Badge> : item}</td>)}<td className="p-4"><button onClick={() => setExpandedTc(expandedTc === row[0] ? null : row[0])} aria-label={`${row[0]} 상세 보기`}><ChevronRight size={15} className={`transition-transform ${expandedTc === row[0] ? "rotate-90" : ""}`} /></button></td></tr>{expandedTc === row[0] && <tr className="border-t bg-neutral-50"><td colSpan={10} className="p-4 text-neutral-600"><strong>테스트 절차</strong> · 페이지 진입 → 테스트 데이터 입력 → 제출 → UI 메시지와 Network 응답 확인 → 기대 결과 비교</td></tr>}</>)}</tbody></table></TableWrap>
            </Section>
            </>}

            {activeView === "defects" && <>
            <Section id="bugs" eyebrow="06 · BUG REPORT" title="결함 리포트" description="카드를 선택하면 재현 절차와 추정 원인을 포함한 상세 내용을 확인할 수 있습니다.">
                <div className="grid gap-4 md:grid-cols-2">{bugs.map((bug) => <button key={bug.id} onClick={() => setSelectedBug(bug)} className="rounded-lg border border-neutral-200 p-5 text-left transition-colors hover:border-neutral-500">
                    <div className="flex items-center justify-between gap-3"><span className="text-xs text-neutral-400">{bug.id}</span><ExternalLink size={15} className="text-neutral-400" /></div><h3 className="mt-3 text-base leading-6">{bug.title}</h3><div className="mt-5 flex flex-wrap gap-2"><Badge tone={bug.severity}>{bug.severity}</Badge><Badge tone={bug.priority}>{bug.priority} Priority</Badge><Badge>{bug.status}</Badge><Badge>재현율 {bug.rate}</Badge></div>
                </button>)}</div>
            </Section>
            </>}

            {activeView === "verification" && <>
            <Section id="api" eyebrow="07 · API TESTING" title="Postman API 검증" description="UI 동작만으로 판단하지 않고 status code, payload, token 발급 여부를 직접 확인했습니다.">
                <div className="space-y-4">{apis.map(([method, endpoint, request, response, status, checks]) => <article key={endpoint} className="rounded-lg border border-neutral-200 p-5 md:p-6"><div className="mb-5 flex flex-wrap items-center gap-3"><Badge tone={method === "GET" ? "Low" : "Medium"}>{method}</Badge><code className="text-sm">{endpoint}</code><span className="ml-auto"><Badge tone={status}>{status}</Badge></span></div><div className="grid gap-4 lg:grid-cols-2"><div><p className="mb-2 text-xs text-neutral-400">REQUEST</p><CodeBlock>{request}</CodeBlock></div><div><p className="mb-2 text-xs text-neutral-400">EXPECTED RESPONSE</p><CodeBlock>{response}</CodeBlock></div></div><p className="mt-5 flex items-start gap-2 text-sm text-neutral-600"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />{checks}</p></article>)}</div>
            </Section>

            <Section id="sql" eyebrow="08 · SQL VERIFICATION" title="DB 정합성 검증" description="API 성공 여부와 실제 데이터 반영 결과를 함께 비교해 인증 흐름의 정합성을 확인했습니다.">
                <div className="space-y-4">{sqlChecks.map(([title, code, result]) => <article key={title as string} className="grid gap-4 rounded-lg border border-neutral-200 p-5 md:p-6 lg:grid-cols-[1.4fr_0.8fr]"><div><div className="mb-4 flex items-center gap-2"><Database size={17} /><h3>{title}</h3></div><CodeBlock>{code as string}</CodeBlock></div><div><p className="mb-3 text-xs text-neutral-400">ACTUAL RESULT</p><div className="overflow-x-auto rounded-lg border border-neutral-200"><table className="w-full text-left text-xs"><tbody>{(result as string[]).map((item, index) => <tr key={index} className="border-t first:border-0"><td className="p-3 text-neutral-400">COL {index + 1}</td><td className="p-3">{item}</td></tr>)}</tbody></table></div><p className="mt-4"><Badge tone="PASS">검증 성공</Badge></p></div></article>)}</div>
            </Section>

            <Section id="automation" eyebrow="09 · E2E AUTOMATION" title="Playwright 자동화" description="반복 실행 가치가 높고 판정 기준이 명확한 로그인 회귀 시나리오를 자동화했습니다.">
                <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]"><CodeBlock>{playwrightCode}</CodeBlock><div className="rounded-lg border border-neutral-200 p-5"><p className="mb-4 text-xs tracking-wider text-neutral-400">AUTOMATION FLOW</p>{["로그인 페이지 진입", "인증 정보 입력", "Submit 클릭", "URL 검증", "핵심 UI 노출 확인"].map((item, index) => <div key={item} className="flex gap-3"><div className="flex flex-col items-center"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs text-white">{index + 1}</span>{index < 4 && <span className="h-6 w-px bg-neutral-200" />}</div><p className="pt-1 text-sm">{item}</p></div>)}</div></div>
                <TableWrap><table className="mt-6 w-full min-w-[640px] text-left text-sm"><thead className="bg-neutral-50 text-xs text-neutral-500"><tr><th className="p-4">자동화 TC ID</th><th className="p-4">시나리오</th><th className="p-4">실행 결과</th><th className="p-4">실행 시간</th></tr></thead><tbody>{[["AUTO-001", "정상 로그인 후 마이페이지 진입", "PASS", "2.1s"], ["AUTO-002", "잘못된 비밀번호 오류 메시지", "PASS", "1.8s"], ["AUTO-003", "공백 입력 validation 노출", "PASS", "1.2s"], ["AUTO-004", "로그아웃 후 로그인 페이지 이동", "PASS", "2.4s"]].map((row) => <tr key={row[0]} className="border-t">{row.map((item, index) => <td key={item} className="p-4">{index === 2 ? <Badge tone={item}>{item}</Badge> : item}</td>)}</tr>)}</tbody></table></TableWrap>
            </Section>

            <Section id="actions" eyebrow="10 · CONTINUOUS TESTING" title="GitHub Actions 실행 결과">
                <div className="grid gap-4 lg:grid-cols-[1fr_0.55fr]"><div className="rounded-lg border border-neutral-200 p-5 md:p-6"><p className="mb-5 text-xs tracking-wider text-neutral-400">WORKFLOW FLOW</p><div className="flex flex-col gap-3 md:flex-row md:items-center">{["Push or Schedule", "Install Dependencies", "Install Browsers", "Run Playwright Tests", "Upload Report"].map((item, index) => <div key={item} className="flex items-center gap-3 md:flex-1"><div className="rounded-lg border border-neutral-200 p-3 text-xs leading-5 md:min-h-16 md:w-full">{item}</div>{index < 4 && <ChevronRight size={15} className="shrink-0 rotate-90 text-neutral-300 md:rotate-0" />}</div>)}</div></div><div className="rounded-lg border border-neutral-200 p-5"><div className="flex items-center justify-between"><span className="text-xs text-neutral-400">LAST RUN</span><Badge tone="PASS">SUCCESS</Badge></div><p className="mt-5 text-2xl">8 / 8 passed</p><div className="mt-5 space-y-2 text-sm text-neutral-500"><p>Trigger · Schedule / Manual</p><p>Schedule · 매일 오전 9시</p><p>Environment · ubuntu-latest</p></div><button className="mt-5 flex items-center gap-2 text-sm underline underline-offset-4"><Download size={15} /> Playwright Report</button></div></div>
            </Section>
            </>}

            {activeView === "overview" && <>
            <Section id="dashboard" eyebrow="11 · TEST SUMMARY" title="결과 분석 Dashboard">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-5">{[["Total TC", "42"], ["PASS", "36"], ["FAIL", "6"], ["Bug Count", "6"], ["Automation", "19%"]].map(([label, value]) => <div key={label} className="rounded-lg border border-neutral-200 p-5"><p className="text-xs text-neutral-400">{label}</p><p className="mt-2 text-3xl tracking-tight">{value}</p></div>)}</div>
                <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4"><div className="rounded-lg border border-neutral-200 p-5"><p className="mb-6 text-sm">PASS / FAIL 비율</p><DonutChart /></div><div className="rounded-lg border border-neutral-200 p-5"><p className="mb-6 text-sm">Severity별 Bug</p><BarChart data={[["High", 1, "bg-rose-500"], ["Medium", 2, "bg-amber-500"], ["Low", 3, "bg-sky-500"]]} /></div><div className="rounded-lg border border-neutral-200 p-5"><p className="mb-6 text-sm">기능별 TC 분포</p><BarChart data={[["회원가입", 18, "bg-neutral-800"], ["로그인", 16, "bg-neutral-600"], ["세션", 8, "bg-neutral-400"]]} /></div><div className="rounded-lg border border-neutral-200 p-5"><p className="mb-6 text-sm">테스트 유형별 분포</p><BarChart data={[["Negative", 15, "bg-violet-500"], ["Positive", 9, "bg-violet-400"], ["Security", 8, "bg-violet-300"], ["E2E", 6, "bg-violet-200"]]} /></div></div>
                <div className="mt-6 grid gap-3 md:grid-cols-3">{["입력값 검증 영역에서 결함 비율이 가장 높았습니다.", "로그인 핵심 플로우는 정상 동작했지만 공백·예외 처리에서 개선점을 발견했습니다.", "반복 검증이 필요한 로그인 시나리오는 Playwright로 자동화했습니다."].map((item) => <p key={item} className="rounded-lg bg-neutral-50 p-5 text-sm leading-7 text-neutral-600">{item}</p>)}</div>
            </Section>

            <Section id="lessons" eyebrow="12 · LESSONS LEARNED" title="QA 관점의 회고">
                <div className="grid gap-4 md:grid-cols-3">{[["테스트 설계", "단순 정상 케이스보다 예외·경계값 설계가 결함 발견에 효과적이었습니다.", FlaskConical], ["자동화 판단", "반복 실행이 많고 결과가 명확한 케이스는 자동화하고, 시각 확인이 필요한 UI는 수동으로 검증했습니다.", Play], ["품질 개선", "API와 DB 검증을 함께 사용해 UI 테스트만으로 확인하기 어려운 데이터 정합성을 보완했습니다.", ShieldCheck]].map(([title, body, Icon]) => { const LessonIcon = Icon as typeof ShieldCheck; return <article key={title as string} className="rounded-lg border border-neutral-200 p-6"><LessonIcon size={21} /><h3 className="mt-5">{title as string}</h3><p className="mt-3 text-sm leading-7 text-neutral-500">{body as string}</p></article>; })}</div>
            </Section>
            </>}
            </main>

            <footer className="border-t border-neutral-200 px-6 py-12 text-center text-sm text-neutral-400 md:px-8">Authentication QA Case Study · Manual Testing to Automation</footer>

            {selectedBug && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4" onMouseDown={() => setSelectedBug(null)}>
                <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl md:p-8" onMouseDown={(event) => event.stopPropagation()}>
                    <div className="flex items-start justify-between gap-4"><div><p className="text-xs text-neutral-400">{selectedBug.id}</p><h2 className="mt-2 text-xl leading-8">{selectedBug.title}</h2></div><button onClick={() => setSelectedBug(null)} aria-label="모달 닫기"><X size={20} /></button></div>
                    <div className="mt-4 flex flex-wrap gap-2"><Badge tone={selectedBug.severity}>{selectedBug.severity}</Badge><Badge tone={selectedBug.priority}>{selectedBug.priority} Priority</Badge><Badge>{selectedBug.status}</Badge><Badge>관련 TC · {selectedBug.tc}</Badge></div>
                    <div className="mt-7 space-y-5 text-sm leading-7"><div><p className="text-xs text-neutral-400">환경</p><p>{selectedBug.environment}</p></div><div><p className="text-xs text-neutral-400">재현 절차</p><ol className="list-inside list-decimal">{selectedBug.steps.map((step) => <li key={step}>{step}</li>)}</ol></div><div className="grid gap-4 md:grid-cols-2"><div><p className="text-xs text-neutral-400">실제 결과</p><p>{selectedBug.actual}</p></div><div><p className="text-xs text-neutral-400">기대 결과</p><p>{selectedBug.expected}</p></div></div><div><p className="text-xs text-neutral-400">원인 추정</p><p>{selectedBug.cause}</p></div><div><p className="text-xs text-neutral-400">첨부 증빙</p><p>{selectedBug.evidence}</p></div></div>
                </div>
            </div>}
        </div>
    </PageTransition>;
}
