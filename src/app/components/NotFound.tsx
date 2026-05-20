import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 md:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl w-full"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[120px] md:text-[200px] leading-none tracking-tighter mb-6 md:mb-8 text-neutral-200"
        >
          404
        </motion.div>

        <h1 className="text-3xl md:text-5xl tracking-tight mb-4 md:mb-6">Page Not Found</h1>

        <p className="text-base md:text-xl text-neutral-600 mb-10 md:mb-12 px-4">
          죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
        </p>

        <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors text-sm md:text-base"
          >
            <Home size={18} className="md:w-5 md:h-5" />
            홈으로 돌아가기
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 border-neutral-300 rounded-lg hover:border-black transition-colors text-sm md:text-base"
          >
            <ArrowLeft size={18} className="md:w-5 md:h-5" />
            이전 페이지
          </button>
        </div>
      </motion.div>
    </div>
  );
}
