import React, { ReactNode, createContext, useContext, useState } from 'react';
import { API_BASE_URL } from './StoreContext';
import { Product } from '../types/ProductTypes';

interface AdminContextProps {
    products: Product[];
    fetchProducts: () => void;
    handleDeleteProduct: (id: number) => void;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [products, setProducts] = useState<Product[]>([]);

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

    console.log(products);

    return (
        <AdminContext.Provider
            value={{
                products,
                fetchProducts,
                handleDeleteProduct,
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
