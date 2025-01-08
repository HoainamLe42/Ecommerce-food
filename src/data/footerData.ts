import { FooterData } from '../types/FooterTypes';

export const footerData: FooterData = {
    companyInfo: {
        logo: 'logo.png',
        description:
            'Thức ăn, đồ uống, hàng tạp hóa và nhiều thứ khác có sẵn để giao hàng và nhận hàng.',
        address: '71 Ba Tri, Bến Tre, Việt Nam.',
        email: 'hoainamle1999@gmail.com',
        phone: '+123 456 7890',
    },
    socialLinks: [
        { name: 'Facebook', url: '#!' },
        { name: 'instagram', url: '#!' },
        { name: 'Zalo', url: '#1' },
    ],
    footerLinks: [
        { label: 'Home', url: '/' },
        { label: 'About Us', url: '/about' },
        { label: 'Services', url: '/services' },
        { label: 'Contact', url: '/contact' },
    ],
    copyright: '© 2024 Company Name. All rights reserved.',
};
