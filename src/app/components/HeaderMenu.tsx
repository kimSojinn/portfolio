const navItems = [
    { href: "#work", label: "Cases" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
];

interface HeaderMenuProps {
    variant: "desktop" | "mobile";
    onItemClick?: () => void;
}

export default function HeaderMenu({ variant, onItemClick }: HeaderMenuProps) {
    const containerClassName =
        variant === "desktop"
            ? "hidden md:flex gap-12 text-sm text-white"
            : "px-6 py-8 space-y-6";
    const linkClassName =
        variant === "desktop"
            ? "hover:opacity-50 transition-opacity"
            : "block text-lg hover:opacity-50 transition-opacity";

    return (
        <div className={containerClassName}>
            {navItems.map((item) => (
                <a
                    key={item.href}
                    href={item.href}
                    onClick={onItemClick}
                    className={linkClassName}
                >
                    {item.label}
                </a>
            ))}
        </div>
    );
}
