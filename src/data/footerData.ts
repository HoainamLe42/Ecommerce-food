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
        { icon: '/images/social/fb.png', url: '#!', color: '#572AF8' },
        { icon: '/images/social/in.png', url: '#!', color: '#191720' },
        { icon: '/images/social/insta.png', url: '#1', color: '#191720' },
        { icon: '/images/social/tw.png', url: '#1', color: '#191720' },
    ],
    footerLinks: [
        { label: 'Về Cửa Hàng', url: '#!' },
        { label: 'Tuyển Dụng', url: '#!' },
        { label: 'Điều Khoản', url: '#!' },
        { label: 'Flash Sale', url: '#!' },
        { label: 'Chính Sách Bảo Mật', url: '#!' },
    ],
    servicesLinks: [
        { label: 'Trung Tâm Trợ Giúp', url: '#!' },
        { label: 'Đơn Hàng', url: '#!' },
        { label: 'Trả Hàng/Hoàn Tiền', url: '#!' },
        { label: 'Liên Hệ', url: '#!' },
        { label: 'Chính Sách Bảo Hành', url: '#!' },
    ],
    copyright: '© 2024 Company Name. All rights reserved.',
};
