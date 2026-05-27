import { motion } from "motion/react";
import { experience, expertise } from "./homeData";

export default function AboutSection() {
    return (
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
                            어드민을 직접 만들고, 서비스 화면의 로직을 구현해본
                            경험으로 고객 불편의 원인을 서비스 흐름 안에서
                            파악합니다.
                        </p>
                        <p className="text-base md:text-xl text-neutral-400 leading-relaxed mb-8 md:mb-12">
                            하드코딩된 운영 항목을 데이터 기반 자동 반영 구조로
                            개선하고, 신규 입사자 온보딩과 예약 서비스 흐름을
                            설계하며 내부 고객과 외부 고객과 운영자가 마주하는
                            사용 흐름을 함께 다뤄왔습니다.
                        </p>
                        <div className="space-y-3 text-neutral-400">
                            <p className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                Based in Seoul, South Korea
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                Focused on CS/CX, QA, and service operations
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
                                    key={skill}
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

                <div className="border-t border-neutral-800 pt-16 md:pt-32">
                    <h3 className="text-xs md:text-sm tracking-widest text-neutral-500 mb-12 md:mb-16">
                        EXPERIENCE
                    </h3>
                    <div className="space-y-8 md:space-y-12">
                        {experience.map((job, index) => (
                            <motion.div
                                key={`${job.year}-${job.company}`}
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
    );
}
