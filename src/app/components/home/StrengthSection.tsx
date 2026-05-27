import { motion } from "motion/react";
import { strengths } from "./homeData";

export default function StrengthSection() {
    return (
        <section className="py-16 md:py-28 px-6 md:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 md:mb-16">
                    <div>
                        <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-3">
                            PERSPECTIVE
                        </h2>
                        <div className="w-16 h-px bg-black mb-6"></div>
                        <p className="text-2xl md:text-[34px] lg:text-[40px] tracking-tight leading-[1.25] max-w-[560px]">
                            화면 앞의 고객을 공감하고
                            <br className="hidden md:block" />
                            화면 뒤의 흐름을 읽습니다.
                        </p>
                    </div>
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
    );
}
