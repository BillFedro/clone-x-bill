import Link from "next/link";

export default function Footer() {
    const links = [
        { href: "#", label: "About" },
        { href: "#", label: "Download the X app" },
        { href: "#", label: "Help Center" },
        { href: "#", label: "Terms of Service" },
        { href: "#", label: "Privacy Policy" },
        { href: "#", label: "Cookie Policy" },
        { href: "#", label: "Accessibility" },
        { href: "#", label: "Ads info" },
        { href: "#", label: "Blog" },
        { href: "#", label: "Careers" },
        { href: "#", label: "Brand Resources" },
        { href: "#", label: "Advertising" },
        { href: "#", label: "Marketing" },
        { href: "#", label: "X for Business" },
        { href: "#", label: "Developers" },
        { href: "#", label: "Directory" }
    ];

    return (
        <footer id="footer" className="text-gray-500 text-sm mt-16 mb-4">
            <div className="flex flex-wrap px-5 justify-center gap-3 text-xs">
                {links.map((link, index) => (
                    <Link key={index} href={link.href} className="hover:underline">
                        {link.label}
                    </Link>
                ))}
                <span className="text-center w-full">
                    &copy; {new Date().getFullYear()} X Corp.
                </span>
            </div>
        </footer>
    );
}
