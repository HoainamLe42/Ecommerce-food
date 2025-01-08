import { Phone } from 'lucide-react';
import React from 'react';

const HotlineButton: React.FC = () => {
    return (
        <button
            onClick={() => window.open('tel:+1234567890', '_self')}
            className="fixed bottom-8 left-9 h-10 w-10 flex items-center justify-center rounded-full bg-red-500 shadow-lg hover:bg-red-600 transition-all animate-bounce cursor-pointer"
        >
            <Phone color="white" size="20" />
        </button>
    );
};

export default HotlineButton;
