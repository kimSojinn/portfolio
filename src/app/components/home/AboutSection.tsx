import { motion } from "motion/react";
import { strengths } from "./homeData";

export default function AboutSection() {
    return (
        <section
            id="about"
            className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white py-16 md:py-32 px-6 md:px-8 relative overflow-hidden"
        >
            <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
            <div className="max-w-7xl mx-auto relative z-10">

                <div className="mb-16 md:mb-24">
                    <h2 className="text-xs md:text-sm tracking-widest text-neutral-500 mb-6 md:mb-8">
                        ABOUT
                    </h2>
                    <div className="max-w-3xl">
                        <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-tight">
                            화면 앞의 고객을 이해하고, 화면 뒤의 흐름을
                            읽습니다.
                        </p>
                        <p className="mt-5 md:mt-6 text-sm md:text-base leading-relaxed text-neutral-400">
                            프론트엔드 개발자로 근무한 경험을 바탕으로 관리자
                            화면 개선, 온보딩 체계 구축, 예약 플로우 설계, QA
                            검증 경험을 쌓았습니다. 기술적 이해를 바탕으로
                            고객의 목소리를 서비스 개선으로 연결하는 CX 직무를
                            지향합니다.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 border-t border-neutral-800 pt-16 md:pt-24 mb-16 md:mb-32">
                    {strengths.map((strength, index) => (
                        <motion.div
                            key={strength.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="text-sm text-neutral-600 mb-5">
                                0{index + 1}
                            </div>
                            <h3 className="text-lg md:text-xl tracking-tight mb-4">
                                {strength.title}
                            </h3>
                            <p className="text-neutral-400 leading-relaxed">
                                {strength.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
