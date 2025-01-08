import { LogOut, Settings, User } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import config from '../config';

const DropdownAvatar = () => {
    const { logout } = useAuth();
    return (
        <div className="absolute top-[100%] pointer-events-none group-hover:pointer-events-auto right-0 p-3 opacity-0 group-hover:opacity-100 group-hover:block transition-all duration-200 translate-y-[-10px] group-hover:translate-y-0">
            <div className="bg-white shadow-md px-5 pt-3 rounded-md">
                <ul className="flex flex-col gap-4 text-nowrap text-base">
                    <li>
                        <Link
                            to={config.routes.userProfile}
                            className="flex items-center gap-4 cursor-pointer"
                        >
                            <User />
                            Tài khoản
                        </Link>
                    </li>
                    <li className="flex items-center gap-4 cursor-pointer">
                        <Settings />
                        Cài đặt
                    </li>
                    <li
                        onClick={logout}
                        className="flex items-center gap-4 border-t py-3 cursor-pointer"
                    >
                        <LogOut />
                        Đăng xuất
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DropdownAvatar;
