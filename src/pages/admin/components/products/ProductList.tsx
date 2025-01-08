import React, { useEffect } from 'react';
import { useAdminContext } from '../../../../context/AdminContext';
import { formatCurrency } from '../../../../utils/CurrencyFormatter';
import Button from '../../../../components/Button';
import { Plus } from 'lucide-react';

interface ProductListProps {
    openPopup: () => void;
}

const ProductList = ({ openPopup }: ProductListProps) => {
    const { products, fetchProducts, handleDeleteProduct } = useAdminContext();

    useEffect(() => {
        fetchProducts();
    }, []);
    console.log(products);

    return (
        <div>
            <div>
                <section className="flex justify-between my-4">
                    <h2 className="text-xl font-bold bg-white">
                        Danh sách sản phẩm
                    </h2>
                    <div className="flex items-center gap-5">
                        <p className="font-bold border-[2px] border-primary px-5 py-2 rounded-md">
                            Tổng sản phẩm: <span>{products.length}</span>
                        </p>
                        <Button
                            onClick={openPopup}
                            className="flex items-center gap-1 mr-4 px-5"
                        >
                            <Plus size="20" />
                            Sản phẩm
                        </Button>
                    </div>
                </section>
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
                                Tồn kho
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td className="text-center border border-gray-300 px-4 py-2">
                                    {index + 1}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={product.image}
                                            alt=""
                                            className="h-10 w-10 object-cover"
                                        />
                                        <p>{product.name}</p>
                                    </div>
                                </td>
                                <td className="text-center border border-gray-300 px-4 py-2">
                                    {formatCurrency(product.price)}
                                </td>
                                <td className="text-center border border-gray-300 px-4 py-2">
                                    0
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex justify-center gap-2">
                                        <Button
                                            onClick={openPopup}
                                            className="p-1 text-sm"
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                handleDeleteProduct(product.id)
                                            }
                                            className="p-1 text-sm"
                                        >
                                            Xoá
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
