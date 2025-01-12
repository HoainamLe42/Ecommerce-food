import { LogOut, User } from 'lucide-react';

import Logo from '../assets/logo.png';
import { listNav } from '../data/navData';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from './Button';
import config from '../config';
import { useAuth } from '../context/AuthContext';

type MobileMenuProps = {
    isOpen: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div
            className={`fixed top-0 left-0 bottom-0 z-10 transition-all duration-300 ${
                isOpen ? 'w-[60vw]' : 'w-0'
            } bg-white`}
        >
            {isOpen && (
                <div className="p-4 bg-[#FFFAE3] shadow-lg h-full">
                    <div>
                        <img src={Logo} alt="" />
                    </div>

                    <ul className="flex flex-col gap-3 mt-3">
                        {listNav.map((nav) => (
                            <li key={nav.id}>
                                <NavLink
                                    to={nav.path}
                                    className={({ isActive }) =>
                                        `py-3 text-sm transition-all duration-150 uppercase cursor-pointer ${
                                            isActive
                                                ? 'underline'
                                                : 'hover:underline'
                                        }`
                                    }
                                >
                                    {nav.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <hr className="my-3" />

                    <div className="flex items-center gap-1">
                        <div className="flex items-center justify-center bg-black rounded-full w-7 h-7">
                            <User size="18" color="white" />
                        </div>

                        {user ? (
                            <p className="text-sm ml-1 px-1 font-semibold border border-primary rounded-md">
                                {user.lastName}
                            </p>
                        ) : (
                            <Button to={config.routes.signIn} variant="ghost">
                                Đăng nhập
                            </Button>
                        )}
                    </div>

                    {user ? (
                        <div className="fixed bottom-[5vh] flex items-center gap-2">
                            <LogOut size="18" />
                            <Button
                                onClick={() => {
                                    navigate(config.routes.home);
                                    logout();
                                    onClose(false);
                                }}
                                variant="ghost"
                                className="p-0"
                            >
                                Đăng xuất
                            </Button>
                        </div>
                    ) : undefined}
                </div>
            )}
        </div>
    );
};

export default MobileMenu;
