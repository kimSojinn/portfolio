import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import HeaderMenu from "../HeaderMenu";

type NavigationProps = {
    mobileMenuOpen: boolean;
    onToggleMobileMenu: () => void;
    onCloseMobileMenu: () => void;
};

export default function Navigation({
    mobileMenuOpen,
    onToggleMobileMenu,
    onCloseMobileMenu,
}: NavigationProps) {
    return (
        <nav className="fixed top-0 w-full z-50 mix-blend-difference">
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 md:py-8 flex justify-end items-center">
                <HeaderMenu variant="desktop" />

                <button
                    onClick={onToggleMobileMenu}
                    className="md:hidden text-white hover:opacity-50 transition-opacity"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden bg-white border-b border-neutral-200"
                >
                    <HeaderMenu
                        variant="mobile"
                        onItemClick={onCloseMobileMenu}
                    />
                </motion.div>
            )}
        </nav>
    );
}
