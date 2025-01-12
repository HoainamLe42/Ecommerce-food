import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { User } from '../../types/admin/UserTypes';
import { API_BASE_URL } from '../../context/StoreContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Get data from API
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/users`);
                if (!response.ok) {
                    throw new Error(`HTTP lỗi! status: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Lỗi HTTP', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const totalUser = () => {
        return users.filter((user) => user.role === 'user').length;
    };

    return (
        <AdminLayout>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div>
                    <h1 className="text-xl font-bold my-4">
                        Danh sách người dùng
                    </h1>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-5 bg-blue-600 text-white rounded-md">
                            <h3 className="uppercase font-semibold mb-1">
                                Tổng số người dùng
                            </h3>
                            <p>{totalUser()}</p>
                        </div>

                        <div className="text-center p-5 bg-green-600 text-white rounded-md">
                            <h3 className="uppercase font-semibold mb-1">
                                Số người mới tháng này
                            </h3>
                            <p>12</p>
                        </div>
                        <div className="text-center p-5 bg-green-600 text-white rounded-md">
                            <h3 className="uppercase font-semibold mb-1">
                                Title
                            </h3>
                            <p>12</p>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-7">
                        {users.map((user) => {
                            if (user.role === 'user') {
                                return (
                                    <div
                                        key={user.id}
                                        className="relative flex flex-1 gap-3 items-start p-4 bg-gray-200 shadow-lg rounded-md group cursor-pointer"
                                    >
                                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary group-hover:block"></div>
                                        <div>
                                            <p className="text-wrap text-secondary-text">
                                                {user.email}
                                            </p>
                                            <span className="bg-yellow-500 py-[2px] px-4 text-white mt-1 inline-block">
                                                rank
                                            </span>
                                        </div>
                                        <div className="absolute bottom-[5%] right-[5%] px-2 py-1 bg-white rounded-md transition-all duration-300 opacity-0 group-hover:opacity-100">
                                            <p>{user.password}</p>
                                        </div>
                                    </div>
                                );
                            }
                        })}

                        {/* {users.map((user) => (
                        <div
                            key={user.id}
                            className="relative flex gap-3 items-start p-4 bg-gray-200 shadow-lg rounded-md group cursor-pointer"
                        >
                            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary group-hover:block"></div>
                            <div>
                                <p className="text-lg font-semibold">
                                    {user.username}
                                </p>
                                <p className="text-wrap text-secondary-text">
                                    {user.email}
                                </p>
                                <span className="bg-yellow-500 py-[2px] px-4 text-white mt-1 inline-block">
                                    rank
                                </span>
                            </div>
                            <div className="absolute bottom-[5%] right-[5%] px-2 py-1 bg-white rounded-md transition-all duration-300 opacity-0 group-hover:opacity-100">
                                <p>{user.password}</p>
                                <p>{user.phone}</p>
                            </div>
                        </div>
                    ))} */}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminUsers;
