import React, { ReactNode, createContext, useContext, useState } from 'react';
import { ProductProps } from '../data/dataProducts';
import { API_BASE_URL } from './StoreContext';

interface AdminContextProps {
    products: ProductProps[];
    fetchProducts: () => void;
    handleDeleteProduct: (id: number) => void;
    handleAddProduct: () => void;
    newProduct: ProductProps;
    setNewProduct: React.Dispatch<React.SetStateAction<ProductProps>>;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [newProduct, setNewProduct] = useState<ProductProps>({
        name: '',
        price: 0,
        image: '',
    });

    // Get data from API
    const fetchProducts = async () => {
        fetch(`${API_BASE_URL}/products`)
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
    };

    // Delete product
    const handleDeleteProduct = (id: number) => {
        fetch(`${API_BASE_URL}/products${id}`, { method: 'DELETE' })
            .then(() =>
                setProducts(products.filter((product) => product.id !== id)),
            )
            .catch((error) => console.error('Error deleting product:', error));
    };

    // Add product
    const handleAddProduct = () => {
        fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
            .then((response) => response.json())
            .then((data) => {
                setProducts((prev) => [...prev, data]);
                setNewProduct({ id: 0, name: '', price: 0, image: '' });
            })
            .catch((error) =>
                console.error('Có lỗi khi thêm sản phẩm:', error),
            );
    };

    console.log(products);

    return (
        <AdminContext.Provider
            value={{
                products,
                fetchProducts,
                handleDeleteProduct,
                handleAddProduct,
                newProduct,
                setNewProduct,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => {
    const context = useContext(AdminContext);

    if (!context)
        throw new Error('useAdminContext must be used within an AdminProvider');
    return context;
};
