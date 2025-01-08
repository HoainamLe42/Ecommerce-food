import React, { ReactNode, createContext, useContext, useState } from 'react';

import { User } from '../types/admin/UserTypes';

type AuthContextType = {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => {},
    logout: () => {},
});

// Tạo avatar fake khi user chưa upload image
const generateDefaultAvatar = (name: string) => {
    const initial = name.charAt(0)?.toLocaleUpperCase() || '?';
    return (
        <div
            title={name || 'Unknown'}
            className="h-10 w-10 bg-primary flex items-center justify-center text-white rounded-full cursor-pointer"
        >
            {initial}
        </div>
    );
};

export const UserAvatar = ({ name }: { name: string }) => {
    return generateDefaultAvatar(name);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        // Lấy data từ localStorage nếu có
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error('Lỗi parsing user data từ localStorage');
            localStorage.removeItem('user');
            return null;
        }
    });

    const login = (user: User) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userId', String(user.id));
        console.log('Đã đăng nhập: ', user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        console.log('Đã đăng xuất: ', user);
    };

    if (user) {
        console.log('User: ', user);
        // console.log('Logged-in User ID:', user.id);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth phải được sử dụng trong AuthProvider');
    }
    return context;
};
