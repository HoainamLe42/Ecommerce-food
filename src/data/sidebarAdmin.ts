import {
    House,
    NotebookTabs,
    ShoppingCart,
    SquareChartGantt,
    UsersRound,
} from 'lucide-react';

import { SidebarAdmin } from '../types/SidebarAdminTypes';

export const sidebarAdmin: SidebarAdmin[] = [
    { id: 2, title: 'Dashboard', url: '/admin/dashboard', icon: House },
    {
        id: 2,
        title: 'Quản lý sản phẩm',
        url: '/admin/products',
        icon: SquareChartGantt,
    },
    {
        id: 3,
        title: 'Quản lý đơn hàng',
        url: '/admin/orders',
        icon: ShoppingCart,
    },
    {
        id: 4,
        title: 'Quản lý người dùng',
        url: '/admin/users',
        icon: UsersRound,
    },
    {
        id: 5,
        title: 'Quản lý banner',
        url: '/admin/banner-manager',
        icon: NotebookTabs,
    },
];
