import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { categories, type Project, type ProjectCategory } from "./homeData";

type WorkSectionProps = {
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  projects: Project[];
};

export default function WorkSection({
  selectedCategory,
  onSelectCategory,
  projects,
}: WorkSectionProps) {
  return (
    <section id="work" className="min-h-screen py-16 md:py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">
          <div>
            <h2 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-2">
              QA CASE
            </h2>
            <div className="w-16 h-px bg-black"></div>
          </div>
          <div className="flex gap-2 md:gap-3 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
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
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
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
                    backgroundImage:
                      "linear-gradient(to right, var(--tw-gradient-stops))",
                  }}
                ></div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-8 relative z-10">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl lg:text-3xl tracking-tight mb-2 md:mb-3 group-hover:translate-x-2 transition-transform">
                      {project.title}
                    </h3>
                    <p className="text-neutral-500 text-sm md:text-base mb-3 md:mb-4">
                      {project.description}
                    </p>

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
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
