import { IoClose } from 'react-icons/io5';
import React, { useEffect, useState } from 'react';
import Logo from '@/app/components/logox';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 bg-blue-700 bg-opacity-20 backdrop-blur-[2px] flex justify-center items-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`bg-black rounded-lg p-8 relative w-full max-w-full h-full max-h-full md:max-w-lg lg:max-h-lg md:h-5/6 
                            transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} transition-all duration-300`}>
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 text-white hover:bg-gray-900 hover:rounded-full p-2 transition-all"
                >
                    <IoClose size={24} />
                </button>

                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-0">
                    <Logo width={25} height={25} />
                </div>

                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
