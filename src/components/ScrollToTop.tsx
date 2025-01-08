import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth', // Cuộn mượt mà
        });
    }, [pathname]);

    // console.log(pathname);
    return null;
};

export default ScrollToTop;
