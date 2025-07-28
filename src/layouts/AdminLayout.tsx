import { ReactNode, useState } from 'react';
import { AlignJustify } from 'lucide-react';

import Logo from '../assets/logo.png';
import { sidebarAdmin } from '../data/sidebarAdmin';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);

    return (
        <div className="h-screen">
            {/* Sidebar */}
            <div className="flex flex-col sm:flex-row">
                <aside
                    className={`${
                        isOpenSidebar ? 'w-64' : 'w-0 overflow-hidden'
                    } top-0 left-0  py-3 border border-r-secondary-border bg-primary/80 transition-all duration-200 h-screen`}
                >
                    <Link to="/">
                        <h1 className="px-5">
                            <img src={Logo} alt="" />
                        </h1>
                    </Link>
                    <nav className="mt-5 w-full">
                        <ul>
                            {sidebarAdmin.map((nav) => (
                                <li key={nav.id}>
                                    <NavLink
                                        to={nav.url}
                                        className={({ isActive }) =>
                                            `mb-1 mx-2 px-3 py-2 flex items-center gap-2 font-semibold rounded-md transition-all duration-100 cursor-pointer hover:bg-secondary hover:text-black ${
                                                isActive
                                                    ? 'text-black bg-secondary'
                                                    : 'text-white'
                                            }`
                                        }
                                    >
                                        <nav.icon />
                                        <span className="text-nowrap">
                                            {nav.title}
                                        </span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <div className="flex flex-grow flex-col">
                    {/* Header */}
                    <header className="sticky top-0 right-0 flex items-center justify-between gap-3 w-full py-3 px-4 shadow-lg">
                        <div className="flex items-center gap-5">
                            <AlignJustify
                                className="cursor-pointer"
                                onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                            />
                            <h1 className="text-xl text-primary font-bold">
                                Admin Panel
                            </h1>
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-secondary-border py-1 px-4 rounded-md outline-none flex-grow max-w-[600px]"
                        />
                        <div className="flex">
                            <div className="flex items-center gap-4">
                                <span className="font-semibold text-secondary-text">
                                    Xin chào, Admin
                                </span>
                                <span className="h-10 w-10 rounded-full bg-primary"></span>
                            </div>
                        </div>
                    </header>

                    {/* Main content */}
                    <main className="px-4 py-3">{children}</main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
