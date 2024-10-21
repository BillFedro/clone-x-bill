import React, { ReactNode } from "react";

interface CenterColumnProps {
    customClass?: string;
    children?: ReactNode;
}

const CenterColumn: React.FC<CenterColumnProps> = ({
    customClass = "",
    children,
}) => {
    return (
        <div className={`${customClass}`}>
            {children}
        </div>
    );
};

export default CenterColumn;

