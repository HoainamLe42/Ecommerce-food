import config from '../config';
import { NavList } from '../types/NavTypes';

export const listNav: NavList = [
    { id: 1, name: 'Trang chủ', path: config.routes.home, active: true },
    { id: 2, name: 'Cửa hàng', path: config.routes.shopping, active: false },
    { id: 3, name: 'Tin tức', path: config.routes.blog, active: false },
    { id: 4, name: 'Liên Hệ', path: config.routes.contact, active: false },
];
