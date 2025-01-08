import config from '../config';
import AdminLayout from '../layouts/AdminLayout';
import Blog from '../pages/Blog';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Contact from '../pages/Contact';
import Detail from '../pages/Detail';
import Home from '../pages/Home';
import Shopping from '../pages/Shopping';
import UserProfile from '../pages/User/UserProfile';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminOrderDetail from '../pages/admin/AdminOrderDetail';
import AdminOrdersManager from '../pages/admin/AdminOrdersManager';
import AdminProducts from '../pages/admin/AdminProductsManager';
import AdminUsers from '../pages/admin/AdminUsers';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';

interface Route {
    path: string;
    component: React.ComponentType<any>;
    layout?: React.ComponentType<any> | null;
}

const publicRoutes: Route[] = [
    { path: config.routes.home, component: Home },
    { path: config.routes.shopping, component: Shopping },
    { path: config.routes.detail, component: Detail },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.signIn, component: SignIn },
    { path: config.routes.signUp, component: SignUp },
    { path: config.routes.checkout, component: Checkout, layout: null },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.blog, component: Blog },
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
        path: config.routes.userProfile,
        component: UserProfile,
        layout: null,
    },
];

// const privateRoutes = [];

export { publicRoutes };
