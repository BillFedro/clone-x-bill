import React, { ReactNode } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

interface ButtonProps {
    onClick?: () => void;
    children: ReactNode;
    icon?: "google" | "apple";
    bgColor?: string;
    textColor?: string;
    borderColor?: string;
    hoverColor?: string;
    customClass?: string;
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    icon,
    bgColor = "",
    textColor = "",
    borderColor = "",
    hoverColor = "",
    customClass = "",
    type = "button",
}) => {
    // Menentukan ikon berdasarkan pilihan prop
    const renderIcon = () => {
        if (icon === "google") {
            return <FcGoogle size={18} className="mr-1" />;
        }
        if (icon === "apple") {
            return <FaApple size={18} className="mr-1" />;
        }
        return null;
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${textColor} ${bgColor} ${hoverColor} ${borderColor} font-semibold rounded-full text-sm text-center flex items-center justify-center ${customClass}`}
        >
            {icon && renderIcon()}
            {children}
        </button>
    );
};

export default Button;