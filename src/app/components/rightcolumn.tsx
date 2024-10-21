import React, { ReactNode } from "react";

interface RightColumnProps {
    customClass?: string;
    children?: ReactNode;
}

const RightColumn: React.FC<RightColumnProps> = ({
    customClass = "",
    children,
}) => {
    return (
        <div className={`hidden lg:block ${customClass}`}>
            {children}
        </div>
    );
};

export default RightColumn;
