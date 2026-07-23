import { ChevronDown } from "lucide-react";
import { motion, type MotionValue } from "motion/react";
import type { RefObject } from "react";

type HeroSectionProps = {
  heroRef: RefObject<HTMLElement>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
};

export default function HeroSection({
  heroRef,
  opacity,
  scale,
}: HeroSectionProps) {
  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 opacity-60"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"></div>

      <motion.div
        style={{ opacity, scale }}
        className="text-center w-full relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight mb-7 md:mb-9"
        >
          <span className="bg-gradient-to-br from-black via-neutral-800 to-neutral-600 bg-clip-text text-transparent">
            QA Engineer
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-sm md:text-lg text-neutral-600 mb-2 max-w-2xl mx-auto px-4 leading-relaxed"
        >
          개발 경험을 바탕으로, 결함의 재현 조건과 영향 범위를 구체화합니다.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs md:text-sm text-neutral-500 mb-4 max-w-2xl mx-auto px-4 leading-relaxed"
        >
          <span>Test Case</span>
          <span className="text-neutral-300">·</span>
          <span>Bug Report</span>
          <span className="text-neutral-300">·</span>
          <span>API Test</span>
          <span className="text-neutral-300">·</span>
          <span>E2E</span>
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
  );
}
