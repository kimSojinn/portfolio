import { Download, Mail, Phone } from "lucide-react";
import { motion } from "motion/react";

const contactLinks = [
    {
        icon: Mail,
        label: "Email",
        href: "mailto:ksjinn9545@gmail.com",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        icon: Phone,
        label: "Phone",
        href: "tel:01066579545",
        gradient: "from-neutral-700 to-neutral-900",
    },
    {
        icon: Download,
        label: "Resume",
        href: "/김소진_이력서.pdf",
        gradient: "from-violet-500 to-purple-500",
    },
];

export default function ContactSection() {
    return (
        <section
            id="contact"
            className="min-h-screen flex items-center justify-center px-6 md:px-8 py-16 md:py-0"
        >
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-tighter mb-12 md:mb-16">
                        Contact
                    </h2>
                    <div className="flex justify-center gap-8 md:gap-12 mb-12 md:mb-16">
                        {contactLinks.map((social) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    download={
                                        social.label === "Resume"
                                            ? true
                                            : undefined
                                    }
                                    className="group flex flex-col items-center gap-2 md:gap-3"
                                >
                                    <div
                                        className={`w-10 h-10 md:w-12 md:h-12 border-2 border-neutral-200 rounded-full flex items-center justify-center bg-gradient-to-br ${social.gradient} text-white group-hover:scale-110 transition-all shadow-lg`}
                                    >
                                        <Icon
                                            size={18}
                                            className="md:w-5 md:h-5"
                                        />
                                    </div>
                                    <span className="text-xs md:text-sm text-neutral-500 group-hover:text-black transition-colors">
                                        {social.label}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                    <a
                        href="mailto:ksjinn9545@gmail.com"
                        className="inline-block text-sm md:text-lg tracking-tight border-b-2 border-black pb-1 hover:border-neutral-300 transition-colors"
                    >
                        ksjinn9545@gmail.com
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
