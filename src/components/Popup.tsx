import { SquareX } from 'lucide-react';
import React, { ReactNode } from 'react';

interface PopupProps {
    isOpen: boolean;
    title?: string;
    onClose: () => void;
    children: ReactNode;
}
const Popup: React.FC<PopupProps> = ({
    isOpen,
    onClose,
    title,
    children,
}: PopupProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10000]">
            <div className="relative bg-white rounded-lg shadow-lg p-5 max-w-md w-full mx-2">
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
