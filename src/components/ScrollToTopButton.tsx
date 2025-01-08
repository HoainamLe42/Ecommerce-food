import { ArrowUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        setIsVisible(window.scrollY > 300);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 flex items-center justify-center h-10 w-10 rounded-full bg-primary cursor-pointer"
            >
                <ArrowUp color="white" size="20" />
            </button>
        )
    );
};

export default ScrollToTopButton;
