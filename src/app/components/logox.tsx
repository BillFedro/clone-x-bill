import Image from "next/image";

interface LogoProps {
    width?: number;
    height?: number;
    className?: string;
}

export default function Logo({ width = 250, height = 42, className = "" }: LogoProps) {
    return (
        <Image
            src="/x-logo.png"
            alt="X logo"
            width={width}
            height={height}
            className={className}
            priority
        />
    );
}
