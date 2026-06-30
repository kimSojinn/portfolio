import { motion } from "motion/react";
import { careers, strengths } from "./homeData";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen md:min-h-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white py-16 md:py-32 px-6 md:px-8 relative overflow-hidden"
    >
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10 md:mb-14">
          <h2 className="text-xs md:text-sm tracking-widest text-neutral-500 mb-6 md:mb-8">
            ABOUT
          </h2>
          <div className="max-w-3xl">
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-tight">
              사용자 흐름을 따라가며 문제를 찾습니다.
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-10 md:pt-14 mb-16 md:mb-24">
          <div className="grid md:grid-cols-3 gap-8">
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

        <div className="border-t border-neutral-800 pt-16 md:pt-24 mb-16 md:mb-0">
          <p className="text-xs md:text-sm tracking-widest text-neutral-500 mb-10 md:mb-12">
            CAREER
          </p>
          <div className="border-t border-neutral-800">
            {careers.map((item, index) => (
              <motion.div
                key={`${item.company}-${item.year}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="grid gap-3 border-b border-neutral-800 py-6 md:grid-cols-[140px_170px_minmax(0,1fr)] md:gap-8 md:py-8"
              >
                <div className="text-sm text-neutral-600">
                  {item.year}
                </div>
                <h3 className="text-lg md:text-xl tracking-tight">
                  {item.company}
                </h3>
                <div className="text-neutral-400 leading-relaxed">
                  <p>{item.summary}</p>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {item.details.map((detail) => (
                      <li key={detail} className="flex gap-2">
                        <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
