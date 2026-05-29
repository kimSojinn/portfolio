import { useScroll, useTransform } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import PageTransition from "./PageTransition";
import AboutSection from "./home/AboutSection";
import ContactSection from "./home/ContactSection";
import FooterSection from "./home/FooterSection";
import HeroSection from "./home/HeroSection";
import { projects, type ProjectCategory } from "./home/homeData";
import Navigation from "./home/Navigation";
import WorkSection from "./home/WorkSection";

export default function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] =
        useState<ProjectCategory>("All");
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    const filteredProjects = useMemo(
        () =>
            selectedCategory === "All"
                ? projects
                : projects.filter((project) => {
                      return project.category === selectedCategory;
                  }),
        [selectedCategory],
    );

    return (
        <PageTransition>
            <div className="min-h-screen bg-white text-black">
                <Navigation
                    mobileMenuOpen={mobileMenuOpen}
                    onToggleMobileMenu={() =>
                        setMobileMenuOpen((isOpen) => !isOpen)
                    }
                    onCloseMobileMenu={() => setMobileMenuOpen(false)}
                />
                <HeroSection
                    heroRef={heroRef}
                    opacity={opacity}
                    scale={scale}
                />
                <WorkSection
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    projects={filteredProjects}
                />
                <AboutSection />
                <ContactSection />
                <FooterSection />
            </div>
        </PageTransition>
    );
}
