import { SquareX } from 'lucide-react';
import React, { ReactNode } from 'react';

interface PopupProps {
    isOpen: boolean;
    title?: string;
    onClose: () => void;
    children: ReactNode;
    sizePopup?: string;
    paddingPopup?: string;
}
const Popup: React.FC<PopupProps> = ({
    isOpen,
    onClose,
    title,
    children,
    sizePopup,
    paddingPopup = '20px',
}: PopupProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10000]">
            <div
                onClick={onClose}
                className="fixed inset-0 bg-black bg-opacity-50 z-[9999] transition-all duration-300 w-full"
            ></div>
            <div
                className={`relative z-[99999] bg-white rounded-xl shadow-lg p-${paddingPopup} max-w-[${sizePopup}] md:mx-4 mx-10 h-auto`}
            >
                {title && (
                    <h2 className="text-xl font-semibold mb-2">{title}</h2>
                )}
                <div>{children}</div>

                <button onClick={onClose} className="absolute top-0 right-0 ">
                    <SquareX className="mt-3 mr-3 text-primary" />
                </button>
            </div>
        </div>
    );
};

export default Popup;
