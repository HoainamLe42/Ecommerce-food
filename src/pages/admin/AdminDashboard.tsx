import { useEffect, useState } from 'react';
import { OrderProps } from '../../api/orderService';
import AdminLayout from '../../layouts/AdminLayout';
import { formatCurrency, formatDate } from '../../utils/CurrencyFormatter';
import OrdersChart from './components/dashboard/OrdersChart';
import RevenueChart from './components/dashboard/RevenueChart';

const AdminDashboard = () => {
    const [orders, setOrders] = useState<OrderProps[]>([]);

    useEffect(() => {
        const fetchOrdered = async () => {
            try {
                const response = await fetch('http://localhost:5001/orders');
                if (!response.ok) {
                    throw new Error(`HTTP lỗi! status: ${response.status}`);
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Lỗi HTTP', error);
            }
        };

        fetchOrdered();
    }, []);

    return (
        <AdminLayout>
            <div>
                {/* Section: Tổng quan */}
                <section>
                    <h1 className="mt-2 mb-4 text-2xl font-semibold">
                        Dashboard
                    </h1>

                    <div className="grid grid-cols-4 gap-3">
                        <div className="flex flex-col justify-center items-center bg-red-400 rounded-md p-3 shadow-lg min-h-[120px]">
                            <h2 className="text-3xl font-bold mb-2">168</h2>
                            <p>Đơn hàng mới</p>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-blue-400 rounded-md p-3 shadow-lg min-h-[120px]">
                            <h2 className="text-3xl font-bold mb-2">500</h2>
                            <p>Sản phẩm</p>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-green-400 rounded-md p-3 shadow-lg min-h-[120px]">
                            <h2 className="text-3xl font-bold mb-2">999</h2>
                            <p>Người dùng</p>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-gray-400 rounded-md p-3 shadow-lg min-h-[120px]">
                            <h2 className="text-3xl font-bold mb-2">
                                {formatCurrency(68000000)}
                            </h2>
                            <p>Doanh thu tháng</p>
                        </div>
                    </div>
                </section>

                {/* Section: Biểu đồ */}
                {/* <section className="mt-3 grid grid-cols-2 gap-4">
                    <RevenueChart />
                    <OrdersChart />
                </section> */}

                {/* Section: Danh sách gần đây */}
                <section className="mt-5">
                    <h3 className="text-xl font-bold mb-4">
                        Đơn hàng mới nhất
                    </h3>
                    <div className="max-h-60 overflow-y-auto border">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="sticky top-0 z-10 bg-white border-b shadow-sm">
                                    <th className="border-b p-2">
                                        Mã đơn hàng
                                    </th>
                                    <th className="border-b p-2">Khách hàng</th>
                                    <th className="border-b p-2">Ngày</th>
                                    <th className="border-b p-2">Trạng thái</th>
                                    <th className="border-b p-2">Tổng cộng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index}>
                                        <td className="border-b p-2">
                                            #{order.id}
                                        </td>
                                        <td className="border-b p-2">
                                            {order.userId}
                                        </td>
                                        <td className="border-b p-2">
                                            {formatDate(order.date)}
                                        </td>
                                        <td className="border-b p-2 text-green-500">
                                            Đã hoàn thành
                                        </td>
                                        <td className="border-b p-2 font-semibold">
                                            {formatCurrency(order.total)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
