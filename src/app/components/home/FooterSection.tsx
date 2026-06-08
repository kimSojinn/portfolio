import { downloadResume } from "../../utils/downloadResume";

export default function FooterSection() {
  return (
    <footer className="py-12 md:py-16 px-6 md:px-8 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          <div className="md:col-span-2">
            <h3 className="text-lg md:text-xl tracking-tight mb-3 md:mb-4">
              KIM SOJIN
            </h3>
            <p className="text-sm text-neutral-500">QA Portfolio</p>
          </div>
          <div>
            <h4 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-3 md:mb-4">
              NAVIGATION
            </h4>
            <div className="space-y-2">
              <a
                href="#work"
                className="block text-sm text-neutral-600 hover:text-black transition-colors"
              >
                Cases
              </a>
              <a
                href="#about"
                className="block text-sm text-neutral-600 hover:text-black transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="block text-sm text-neutral-600 hover:text-black transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xs md:text-sm tracking-widest text-neutral-400 mb-3 md:mb-4">
              CONNECT
            </h4>
            <div className="space-y-2">
              <a
                href="mailto:ksjinn9545@gmail.com"
                className="block text-sm text-neutral-600 hover:text-black transition-colors"
              >
                Email
              </a>
              <a
                href="tel:01066579545"
                className="block text-sm text-neutral-600 hover:text-black transition-colors"
              >
                Phone
              </a>
              <a
                href="/resume.pdf"
                onClick={(event) => {
                  event.preventDefault();
                  void downloadResume();
                }}
                className="block text-sm text-neutral-600 hover:text-black transition-colors"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-neutral-400 pt-6 md:pt-8 border-t border-neutral-200">
          <p>© 2026 Kim Sojin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
