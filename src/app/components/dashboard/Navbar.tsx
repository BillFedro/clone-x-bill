"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar({ children }: { children: React.ReactNode }) {
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={`sticky border-b border-gray-800 h-auto top-0 w-full z-10 transition-all duration-300 ${isScrolled ? "bg-black bg-opacity-70 backdrop-filter backdrop-blur-sm" : "bg-black"}`}>
            {children}
        </div>
    );
}
