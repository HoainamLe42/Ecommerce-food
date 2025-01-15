import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminLayout from '../../layouts/AdminLayout';
import { formatCurrency, formatDate } from '../../utils/CurrencyFormatter';
import { Order } from '../../types/admin/OrderTypes';
import { API_BASE_URL } from '../../context/StoreContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminOrdersManager = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleClick = (id: number) => {
        navigate(`/admin/orders/${id}`);
    };

    useEffect(() => {
        const fetchOrdered = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/orders`);
                if (!response.ok) {
                    throw new Error(`HTTP lỗi! status: ${response.status}`);
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Lỗi HTTP', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrdered();
    }, []);

    return (
        <AdminLayout>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div>
                    <h1 className="text-xl font-bold my-4">Quản lý đơn hàng</h1>
                    <div className="grid grid-cols-2 gap-5 mb-4">
                        <div className="p-5 bg-blue-400 text-white rounded-md">
                            <h3 className="uppercase font-semibold mb-1">
                                ĐƠN HÀNG MỚI
                            </h3>
                            <p>
                                Tổng đơn hàng: <span>2</span>
                            </p>
                            <p>
                                Tổng tiền: <span>{formatCurrency(500000)}</span>
                            </p>
                        </div>

                        <div className="p-5 bg-blue-600 text-white rounded-md">
                            <h3 className="uppercase font-semibold mb-1">
                                TỔNG ĐƠN HÀNG
                            </h3>
                            <p>
                                Tổng đơn hàng:{' '}
                                <span>{orders.map((item) => item).length}</span>
                            </p>
                            <p>
                                Tổng tiền:{' '}
                                <span className="font-semibold text-lg">
                                    {formatCurrency(
                                        orders.reduce(
                                            (total, item) =>
                                                (total += item.total),
                                            0,
                                        ),
                                    )}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="overflow-x-auto border rounded">
                        <table className="min-w-full bg-white border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="px-4 py-2 text-left">
                                        Mã đơn
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Ngày đặt
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Khách hàng
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Số sản phẩm
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Tổng tiền
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Thanh toán
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Trạng thái
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map((order) => (
                                    <tr key={order.id} className="border-b">
                                        <td
                                            className="px-4 py-2 cursor-pointer font-semibold"
                                            onClick={() =>
                                                handleClick(order.id)
                                            }
                                        >
                                            #{order.id}
                                        </td>
                                        <td className="px-4 py-2">
                                            {formatDate(order.date)}
                                        </td>
                                        <td className="px-4 py-2">
                                            {order.userId}
                                        </td>
                                        <td className="px-4 py-2">
                                            {order.items.reduce(
                                                (total, item) =>
                                                    (total += item.quantity),
                                                0,
                                            )}
                                        </td>
                                        <td className="px-4 py-2t">
                                            {formatCurrency(order.total)}
                                        </td>
                                        <td className="px-4 py-2">
                                            {order.paymentMethod}
                                        </td>
                                        <td className="px-4 py-2">
                                            <select className="border px-2 py-1 rounded">
                                                <option value="Pending">
                                                    Pending
                                                </option>
                                                <option value="Delivered">
                                                    Delivered
                                                </option>
                                                <option value="Cancelled">
                                                    Cancelled
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminOrdersManager;
