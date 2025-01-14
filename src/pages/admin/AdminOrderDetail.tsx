import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AdminLayout from '../../layouts/AdminLayout';
import { formatCurrency, formatDate } from '../../utils/CurrencyFormatter';
import { OrderDetails } from '../../types/admin/OrderTypes';
import { API_BASE_URL } from '../../context/StoreContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminOrderDetail = () => {
    const { id } = useParams();
    const [orders, setOrders] = useState<OrderDetails[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/orders?id=${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP lỗi! status: ${response.status}`);
                }
                const data = await response.json();
                if (data.length === 0) {
                    console.error('Không tìm thấy đơn hàng');
                    return;
                }

                setOrders(data);
            } catch (error) {
                console.error('Lỗi HTTP', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, []);

    return (
        <AdminLayout>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div>
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold bg-white my-4">
                            ID:{' '}
                            <span className="text-secondary-text">{id}</span>
                        </h2>

                        <p className="font-semibold">
                            {orders?.map((item) => formatDate(item.date))}
                        </p>
                    </div>

                    <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">
                                    #
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Tên sản phẩm
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Giá
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Số lượng
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Tổng tiền
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((data) =>
                                data.items?.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="text-center border border-gray-300 px-4 py-2">
                                            {index + 1}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={item.image}
                                                    alt=""
                                                    className="h-10 w-10 object-cover"
                                                />
                                                <p>{item.name}</p>
                                            </div>
                                        </td>
                                        <td className="text-center border border-gray-300 px-4 py-2">
                                            {formatCurrency(item.price)}
                                        </td>
                                        <td className="text-center border border-gray-300 px-4 py-2">
                                            {item.quantity}
                                        </td>
                                        <td className="border border-gray-300 text-center py-2 font-semibold">
                                            {formatCurrency(
                                                item.quantity * item.price,
                                            )}
                                        </td>
                                    </tr>
                                )),
                            )}
                        </tbody>
                    </table>

                    {/* Bottom */}
                    <div className="flex items-center justify-end my-4 mr-3 font-bold">
                        <p>
                            Tổng tiền:{' '}
                            <span className="text-2xl">
                                {orders?.map((item) =>
                                    formatCurrency(item.total),
                                )}
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminOrderDetail;
