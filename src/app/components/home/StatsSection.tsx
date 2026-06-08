import { ClipboardCheck, MessageSquareText, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

const stats = [
    {
        icon: MessageSquareText,
        value: "90%+",
        label: "검증 후 관리자 데이터 반영 시간 90% 이상 절감",
        color: "from-blue-600 to-cyan-500",
    },
    {
        icon: ClipboardCheck,
        value: "80+",
        label: "80개 이상의 데이터 반영 지점 영향 범위 확인",
        color: "from-violet-600 to-purple-500",
    },
    {
        icon: ShieldCheck,
        value: "5",
        label: "5건의 QA 관점 품질 개선 사례",
        color: "from-amber-600 to-orange-500",
    },
];

export default function StatsSection() {
    return (
        <section className="py-16 md:py-32 px-6 md:px-8 border-y border-neutral-200 bg-gradient-to-b from-white to-neutral-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
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
                                <div className="text-3xl md:text-4xl tracking-tight mb-2 md:mb-3 bg-gradient-to-br from-black to-neutral-600 bg-clip-text text-transparent">
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
    );
}
