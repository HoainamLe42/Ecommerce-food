import React, { useState } from 'react';
import Popup from '../../../../components/Popup';
import Button from '../../../../components/Button';
import {
    AdminProvider,
    useAdminContext,
} from '../../../../context/AdminContext';

type Product = {
    id: number;
    name: string;
    price: number;
};

const ProductForm = ({
    onSubmit,
}: {
    onSubmit: (product: Product) => void;
}) => {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number | undefined>(undefined);
    const { newProduct, setNewProduct, handleAddProduct } = useAdminContext();

    const handleNewProductChange = (
        key: keyof Product,
        value: string | number,
    ) => {
        setNewProduct((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddProduct();

        // const newProduct = {
        //     id: Date.now(),
        //     name,
        //     price: Number(price),
        // };
        // onSubmit(newProduct);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-center text-xl font-semibold mb-2">
                Sửa sản phẩm
            </h2>
            <div className="flex flex-col gap-1 mb-2">
                <label htmlFor="">Tên sản phẩm:</label>
                <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={(e) =>
                        handleNewProductChange('name', e.target.value)
                    }
                    className="px-2 py-1 rounded-sm border border-secondary-border outline-none"
                />
            </div>
            <div className="flex flex-col gap-1 mb-2">
                <label htmlFor="">Ảnh:</label>
                <input
                    type="file"
                    name="image"
                    value={newProduct.image}
                    onChange={(e) =>
                        handleNewProductChange('image', e.target.value)
                    }
                    className="px-2 py-1 rounded-sm border border-secondary-border outline-none"
                    placeholder="add file"
                />
            </div>
            <div className="flex flex-col gap-1 mb-2">
                <label htmlFor="">Giá:</label>
                <input
                    type="number"
                    name="price"
                    value={newProduct.price || ''}
                    onChange={(e) =>
                        handleNewProductChange('price', Number(e.target.value))
                    }
                    className="px-2 py-1 rounded-sm border border-secondary-border outline-none"
                />
            </div>

            <div className="flex flex-col gap-1 mb-2">
                <label htmlFor="">Kho:</label>
                <input
                    type="text"
                    className="px-2 py-1 rounded-sm border border-secondary-border outline-none"
                />
            </div>

            <div className="text-center">
                <Button type="submit" className="w-full mt-2">
                    Lưu
                </Button>
            </div>
        </form>
    );
};

export default ProductForm;
