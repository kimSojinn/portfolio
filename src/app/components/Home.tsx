import {
    ArrowUpRight,
    ChevronDown,
    ClipboardCheck,
    Download,
    Mail,
    Menu,
    MessageSquareText,
    Phone,
    ShieldCheck,
    X,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import HeaderMenu from "./HeaderMenu";
import PageTransition from "./PageTransition";

export default function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const heroRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    const projects = [
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
            description:
                "예약 흐름 설계와 이미지 최적화로 고객 초기 사용 경험 개선",
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
            description:
                "접근성, 정보 구조, 성능을 사용자 관점에서 점검",
            year: "2023-2026",
            role: "Quality Improvement",
            category: "QA",
            tags: ["Accessibility", "SEO", "Performance"],
            gradient: "from-amber-500/10 to-orange-500/10",
        },
    ];

    const stats = [
        {
            icon: MessageSquareText,
            value: "90%+",
            label: "Admin Update Time Saved",
            color: "from-blue-600 to-cyan-500",
        },
        {
            icon: ClipboardCheck,
            value: "80+",
            label: "Dropdown Items Automated",
            color: "from-violet-600 to-purple-500",
        },
        {
            icon: ShieldCheck,
            value: "5",
            label: "CX / QA Cases",
            color: "from-amber-600 to-orange-500",
        },
    ];

    const categories = ["All", "CX Ops", "Operations", "QA"];

    const filteredProjects =
        selectedCategory === "All"
            ? projects
            : projects.filter((p) => p.category === selectedCategory);

    const expertise = [
        "Admin Tool Understanding",
        "VOC Issue Structuring",
        "QA / Issue Triage",
        "Internal Operation Design",
        "Customer Journey Mapping",
        "Accessibility / SEO Quality",
    ];

    const strengths = [
        {
            title: "어드민 구조를 아는 CX",
            description:
                "관리자 페이지를 직접 설계하고 구현해봤기 때문에 상담 툴, 운영 화면, 내부 프로세스의 병목을 빠르게 읽을 수 있습니다.",
        },
        {
            title: "에러 원인을 좁히는 QA 감각",
            description:
                "앱과 웹이 작동하는 로직을 이해해 고객 제보를 단순 불만으로 넘기지 않고 재현 조건, 영향 범위, 우선순위로 정리합니다.",
        },
        {
            title: "VOC를 이슈로 구조화",
            description:
                "고객 문의를 화면, 데이터, 정책, 운영 조건으로 나누어 개발팀과 유관 부서가 확인하기 쉬운 형태로 전달합니다.",
        },
    ];

    return (
        <PageTransition>
            <div className="min-h-screen bg-white text-black">
                {/* Navigation */}
                <nav className="fixed top-0 w-full z-50 mix-blend-difference">
                    <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 md:py-8 flex justify-end items-center">
                        {/* Desktop Menu */}
                        <HeaderMenu variant="desktop" />

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-white hover:opacity-50 transition-opacity"
                        >
                            {mobileMenuOpen ? (
                                <X size={24} />
                            ) : (
                                <Menu size={24} />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="md:hidden bg-white border-b border-neutral-200"
                        >
                            <HeaderMenu
                                variant="mobile"
                                onItemClick={() => setMobileMenuOpen(false)}
                            />
                        </motion.div>
                    )}
                </nav>

                {/* Hero Section */}
                <section
                    ref={heroRef}
                    className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
                >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 opacity-60"></div>
                    <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"></div>

                    <motion.div
                        style={{ opacity, scale }}
                        className="text-center w-full relative z-10"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-xs md:text-sm tracking-widest mb-6 md:mb-8"
                        >
                            <span className="bg-gradient-to-r from-neutral-600 via-neutral-500 to-neutral-600 bg-clip-text text-transparent">
                                PORTFOLIO
                            </span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[1.02] tracking-tight mb-8 md:mb-10"
                        >
                            <span className="bg-gradient-to-br from-black via-neutral-800 to-neutral-600 bg-clip-text text-transparent">
                                Customer
                            </span>
                            <br />
                            <span className="bg-gradient-to-br from-neutral-700 via-black to-neutral-800 bg-clip-text text-transparent">
                                Operations
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="text-base md:text-xl text-neutral-600 mb-4 max-w-2xl mx-auto px-4"
                        >
                            고객과 운영자가 겪는 문제를 서비스 흐름 안에서
                            찾고 정리합니다.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="text-sm md:text-base text-neutral-500 tracking-wide"
                        >
                            Kim Sojin
                        </motion.p>
                    </motion.div>

                    <motion.a
                        href="#work"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="absolute bottom-12 flex flex-col items-center gap-2 text-neutral-400 hover:text-black transition-colors"
                    >
                        <span className="text-xs tracking-widest">SCROLL</span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <ChevronDown size={20} />
                        </motion.div>
                    </motion.a>
                </section>

                {/* Stats Section */}
                <section className="py-16 md:py-32 px-6 md:px-8 border-y border-neutral-200 bg-gradient-to-b from-white to-neutral-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.6,
                                            delay: index * 0.1,
                                        }}
                                        className="text-center group"
                                    >
                                        <div
                                            className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 border-2 border-neutral-200 rounded-full mb-4 md:mb-6 bg-gradient-to-br ${stat.color} group-hover:scale-110 transition-transform`}
                                        >
                                            <Icon
                                                size={20}
                                                className="text-white md:w-6 md:h-6"
                                            />
                                        </div>
                                        <div className="text-4xl md:text-5xl tracking-tight mb-2 md:mb-3 bg-gradient-to-br from-black to-neutral-600 bg-clip-text text-transparent">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs md:text-sm tracking-wide text-neutral-500">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Strength Section */}
                <section className="py-16 md:py-28 px-6 md:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 mb-12 md:mb-16 items-start">
                            <div className="md:col-span-5">
                                <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-3">
                                    CORE STRENGTH
                                </h2>
                                <div className="w-16 h-px bg-black mb-6"></div>
                                <p className="text-2xl md:text-[34px] lg:text-[40px] tracking-tight leading-[1.25] max-w-[560px]">
                                    서비스 구조를 이해하고,
                                    <br className="hidden md:block" />
                                    고객 문제를 운영 개선으로 연결합니다.
                                </p>
                            </div>
                            <p className="md:col-span-7 text-base md:text-lg lg:text-xl leading-relaxed text-neutral-600 md:pt-[58px] max-w-3xl">
                                어드민 화면, 예약 흐름, 성능 테스트, 온보딩
                                프로세스를 직접 다루며 고객과 운영자가 겪는
                                불편을 화면 구조와 업무 흐름 안에서 확인했습니다.
                                발견한 문제는 재현 조건, 영향 범위, 개선 방향으로
                                나누어 전달합니다.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 border-t border-neutral-200">
                            {strengths.map((strength, index) => (
                                <motion.div
                                    key={strength.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    className="pt-8 md:pt-10"
                                >
                                    <div className="text-sm text-neutral-400 mb-5">
                                        0{index + 1}
                                    </div>
                                    <h3 className="text-xl md:text-2xl tracking-tight mb-4">
                                        {strength.title}
                                    </h3>
                                    <p className="text-neutral-600 leading-relaxed">
                                        {strength.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Work Section */}
                <section
                    id="work"
                    className="min-h-screen py-16 md:py-32 px-6 md:px-8"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">
                            <div>
                                <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-2">
                                    SELECTED CASES
                                </h2>
                                <div className="w-16 h-px bg-black"></div>
                            </div>
                            <div className="flex gap-2 md:gap-3 flex-wrap">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() =>
                                            setSelectedCategory(category)
                                        }
                                        className={`px-4 md:px-6 py-1.5 md:py-2 border rounded-full text-xs md:text-sm transition-all ${
                                            selectedCategory === category
                                                ? "bg-gradient-to-r from-neutral-900 to-neutral-700 text-white border-transparent shadow-lg shadow-neutral-900/20"
                                                : "border-neutral-300 hover:border-neutral-500"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <Link
                                        to={`/project/${project.id}`}
                                        className={`group block py-6 md:py-10 border-t border-neutral-200 hover:bg-gradient-to-r hover:${project.gradient} transition-all relative overflow-hidden`}
                                    >
                                        <div
                                            className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity"
                                            style={{
                                                backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                                            }}
                                        ></div>
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-8 relative z-10">
                                            <div className="flex-1">
                                                <div className="hidden md:flex items-center gap-3 mb-4">
                                                    {project.tags.map(
                                                        (tag, i) => (
                                                            <span
                                                                key={i}
                                                                className="text-xs tracking-wide text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                                <h3 className="text-3xl md:text-4xl lg:text-5xl tracking-tight mb-2 md:mb-3 group-hover:translate-x-2 transition-transform">
                                                    {project.title}
                                                </h3>
                                                <p className="text-neutral-500 text-base md:text-lg mb-3 md:mb-4">
                                                    {project.description}
                                                </p>

                                                {/* Mobile Year/Role */}
                                                <div className="flex gap-6 text-xs md:hidden text-neutral-400 mb-3">
                                                    <div>
                                                        <div className="mb-1 text-neutral-300">
                                                            Year
                                                        </div>
                                                        <div>
                                                            {project.year}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="mb-1 text-neutral-300">
                                                            Role
                                                        </div>
                                                        <div>
                                                            {project.role}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 text-sm text-neutral-400">
                                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                        View Case
                                                    </span>
                                                    <ArrowUpRight
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                        size={16}
                                                    />
                                                </div>
                                            </div>

                                            {/* Desktop Year/Role */}
                                            <div className="hidden md:flex items-start gap-16 text-sm text-neutral-400">
                                                <div>
                                                    <div className="mb-1 text-neutral-300">
                                                        Year
                                                    </div>
                                                    <div>{project.year}</div>
                                                </div>
                                                <div>
                                                    <div className="mb-1 text-neutral-300">
                                                        Role
                                                    </div>
                                                    <div className="text-right">
                                                        {project.role}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section
                    id="about"
                    className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white py-16 md:py-32 px-6 md:px-8 relative overflow-hidden"
                >
                    <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid md:grid-cols-5 gap-12 md:gap-24 mb-16 md:mb-32">
                            <div className="md:col-span-3">
                                <h2 className="text-xs md:text-sm tracking-widest text-neutral-500 mb-6 md:mb-8">
                                    ABOUT
                                </h2>
                                <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-tight mb-8 md:mb-12">
                                    어드민을 직접 만들고, 서비스 화면의 로직을
                                    구현해본 경험으로 고객 불편의 원인을 서비스
                                    흐름 안에서 파악합니다.
                                </p>
                                <p className="text-base md:text-xl text-neutral-400 leading-relaxed mb-8 md:mb-12">
                                    하드코딩된 운영 항목을 데이터 기반 자동 반영
                                    구조로 개선하고, 신규 입사자 온보딩과 예약
                                    서비스 흐름을 설계하며 내부 고객과 외부
                                    고객과 운영자가 마주하는 사용 흐름을 함께
                                    다뤄왔습니다.
                                </p>
                                <div className="space-y-3 text-neutral-400">
                                    <p className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                        Based in Seoul, South Korea
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                        Focused on CS/CX, QA, and service
                                        operations
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                        Fluent in developer communication
                                    </p>
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <h3 className="text-sm tracking-widest text-neutral-500 mb-8">
                                    EXPERTISE
                                </h3>
                                <div className="space-y-6">
                                    {expertise.map((skill, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.5,
                                                delay: index * 0.1,
                                            }}
                                            className="flex items-center gap-4 group"
                                        >
                                            <div className="w-1 h-1 bg-gradient-to-r from-blue-400 to-violet-400 rounded-full group-hover:w-8 transition-all"></div>
                                            <span className="text-xl tracking-tight group-hover:bg-gradient-to-r group-hover:from-blue-200 group-hover:to-violet-200 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                                                {skill}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Career Timeline */}
                        <div className="border-t border-neutral-800 pt-16 md:pt-32">
                            <h3 className="text-xs md:text-sm tracking-widest text-neutral-500 mb-12 md:mb-16">
                                EXPERIENCE
                            </h3>
                            <div className="space-y-8 md:space-y-12">
                                {[
                                    {
                                        year: "2023 - Present",
                                        company: "Union Contents",
                                        role: "저작권 모니터링 서비스, B2B 어드민, 다국어 기업 페이지 개발 및 운영 개선",
                                    },
                                    {
                                        year: "2025",
                                        company: "SEOMSE",
                                        role: "미용실 예약 고객 여정과 관리자 확인 흐름을 설계한 MVP 프론트엔드 개발",
                                    },
                                    {
                                        year: "2023",
                                        company: "SEO Guide Book",
                                        role: "프론트엔드 개발자를 위한 SEO 가이드 공동 집필 및 정보 구조화",
                                    },
                                ].map((job, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                        }}
                                        className="grid md:grid-cols-5 gap-4 md:gap-8 group"
                                    >
                                        <div className="md:col-span-1 text-sm md:text-base text-neutral-500">
                                            {job.year}
                                        </div>
                                        <div className="md:col-span-2">
                                            <h4 className="text-xl md:text-2xl tracking-tight mb-1 md:mb-2">
                                                {job.company}
                                            </h4>
                                        </div>
                                        <div className="md:col-span-2 text-neutral-400 text-base md:text-lg">
                                            {job.role}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section
                    id="contact"
                    className="min-h-screen flex items-center justify-center px-6 md:px-8 py-16 md:py-0"
                >
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <h2 className="text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-12 md:mb-16">
                                Contact
                            </h2>
                            <div className="flex justify-center gap-8 md:gap-12 mb-12 md:mb-16">
                                {[
                                    {
                                        icon: Mail,
                                        label: "Email",
                                        href: "mailto:ksjinn9545@gmail.com",
                                        gradient: "from-blue-500 to-cyan-500",
                                    },
                                    {
                                        icon: Phone,
                                        label: "Phone",
                                        href: "tel:01066579545",
                                        gradient:
                                            "from-neutral-700 to-neutral-900",
                                    },
                                    {
                                        icon: Download,
                                        label: "Resume",
                                        href: "/resume-kim-sojin.pdf",
                                        gradient:
                                            "from-violet-500 to-purple-500",
                                    },
                                ].map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.href}
                                            download={
                                                social.label === "Resume"
                                                    ? true
                                                    : undefined
                                            }
                                            className="group flex flex-col items-center gap-2 md:gap-3"
                                        >
                                            <div
                                                className={`w-10 h-10 md:w-12 md:h-12 border-2 border-neutral-200 rounded-full flex items-center justify-center bg-gradient-to-br ${social.gradient} text-white group-hover:scale-110 transition-all shadow-lg`}
                                            >
                                                <Icon
                                                    size={18}
                                                    className="md:w-5 md:h-5"
                                                />
                                            </div>
                                            <span className="text-xs md:text-sm text-neutral-500 group-hover:text-black transition-colors">
                                                {social.label}
                                            </span>
                                        </a>
                                    );
                                })}
                            </div>
                            <a
                                href="mailto:ksjinn9545@gmail.com"
                                className="inline-block text-base md:text-xl tracking-tight border-b-2 border-black pb-1 hover:border-neutral-300 transition-colors"
                            >
                                ksjinn9545@gmail.com
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 md:py-16 px-6 md:px-8 border-t border-neutral-200">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
                            <div className="md:col-span-2">
                                <h3 className="text-xl md:text-2xl tracking-tight mb-3 md:mb-4">
                                    KIM SOJIN
                                </h3>
                                <p className="text-sm md:text-base text-neutral-500 mb-6">
                                    고객 문의와 서비스 이슈를 화면 흐름, 재현 조건,
                                    운영 개선 단위로 정리합니다.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-3 md:mb-4">
                                    NAVIGATION
                                </h4>
                                <div className="space-y-2">
                                    <a
                                        href="#work"
                                        className="block text-sm md:text-base text-neutral-600 hover:text-black transition-colors"
                                    >
                                        Cases
                                    </a>
                                    <a
                                        href="#about"
                                        className="block text-sm md:text-base text-neutral-600 hover:text-black transition-colors"
                                    >
                                        About
                                    </a>
                                    <a
                                        href="#contact"
                                        className="block text-sm md:text-base text-neutral-600 hover:text-black transition-colors"
                                    >
                                        Contact
                                    </a>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-3 md:mb-4">
                                    CONNECT
                                </h4>
                                <div className="space-y-2">
                                    <a
                                        href="mailto:ksjinn9545@gmail.com"
                                        className="block text-sm md:text-base text-neutral-600 hover:text-black transition-colors"
                                    >
                                        Email
                                    </a>
                                    <a
                                        href="tel:01066579545"
                                        className="block text-sm md:text-base text-neutral-600 hover:text-black transition-colors"
                                    >
                                        Phone
                                    </a>
                                    <a
                                        href="/resume-kim-sojin.pdf"
                                        download
                                        className="block text-sm md:text-base text-neutral-600 hover:text-black transition-colors"
                                    >
                                        Resume PDF
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-neutral-400 pt-6 md:pt-8 border-t border-neutral-200">
                            <p>© 2026 Kim Sojin. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </PageTransition>
    );
}
