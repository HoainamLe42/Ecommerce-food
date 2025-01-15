import React from 'react';
import config from '../config';
import AdminLayout from '../layouts/AdminLayout';
import Contact from '../pages/Contact';
import UserProfile from '../pages/User/UserProfile';
import SignUp from '../pages/auth/SignUp';
import SignIn from '../pages/auth/SignIn';

const HomePage = React.lazy(() => import('../pages/Home'));
const ShoppingPage = React.lazy(() => import('../pages/Shopping'));
const BlogPage = React.lazy(() => import('../pages/Blog'));
const DetailPage = React.lazy(() => import('../pages/Detail'));
const CartPage = React.lazy(() => import('../pages/Cart'));
const CheckoutPage = React.lazy(() => import('../pages/Checkout'));

// admin
const AdminDashboard = React.lazy(
    () => import('../pages/admin/AdminDashboard'),
);
const AdminOrderDetail = React.lazy(
    () => import('../pages/admin/AdminOrderDetail'),
);
const AdminOrdersManager = React.lazy(
    () => import('../pages/admin/AdminOrdersManager'),
);
const AdminProducts = React.lazy(
    () => import('../pages/admin/AdminProductsManager'),
);

const BannerManager = React.lazy(() => import('../pages/admin/BannerManager'));
const AdminUsers = React.lazy(() => import('../pages/admin/AdminUsers'));

type Route = {
    path: string;
    component: React.ComponentType<any>;
    layout?: React.ComponentType<any> | null;
};

const publicRoutes: Route[] = [
    { path: config.routes.home, component: HomePage },
    { path: config.routes.shopping, component: ShoppingPage },
    { path: config.routes.detail, component: DetailPage },
    { path: config.routes.cart, component: CartPage },
    { path: config.routes.signIn, component: SignIn },
    { path: config.routes.signUp, component: SignUp },
    { path: config.routes.checkout, component: CheckoutPage, layout: null },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.blog, component: BlogPage },
    { path: config.routes.admin, component: AdminLayout, layout: null },
    {
        path: config.routes.adminDashboard,
        component: AdminDashboard,
        layout: null,
    },
    {
        path: config.routes.adminProducts,
        component: AdminProducts,
        layout: null,
    },
    {
        path: config.routes.adminOrders,
        component: AdminOrdersManager,
        layout: null,
    },
    {
        path: config.routes.adminOrderDetail,
        component: AdminOrderDetail,
        layout: null,
    },
    {
        path: config.routes.adminUsers,
        component: AdminUsers,
        layout: null,
    },

    {
        path: config.routes.bannerManager,
        component: BannerManager,
        layout: null,
    },
    {
        path: config.routes.userProfile,
        component: UserProfile,
        layout: null,
    },
];

// const privateRoutes = [];

export { publicRoutes };
