import { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { formatCurrency } from '../utils/CurrencyFormatter';
import Button from './Button';
import { Product } from '../types/ProductTypes';
import { useShoppingCart } from '../context/StoreContext';

const FoodItem = ({ id, name, image, price, type }: Product) => {
    const { foods, increaseCartQuantity } = useShoppingCart();
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const navigate = useNavigate();

    // Lấy chi tiết sản phẩm từ id
    const food = foods?.find((food) => Number(food.id) === Number(id));

    const handleClick = () => {
        navigate(`/detail/${id}`);
    };

    return (
        <div className="p-3 shadow-lg rounded-lg cursor-pointer transition-all duration-150 hover:scale-105 group relative">
            <div className="relative w-full h-56 rounded-md overflow-hidden">
                {!isImageLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-gray-300 rounded-md"></div>
                )}
                <img
                    onClick={handleClick}
                    src={image}
                    alt=""
                    className={`h-full w-full mx-auto object-cover transition-opacity duration-300 ${
                        isImageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setIsImageLoaded(true)}
                />
            </div>

            <h3 className="text-xl capitalize font-bold mt-3">{name}</h3>
            <p className="text-secondary-text text-sm">{type}</p>
            <p>
                Giá:{' '}
                <span className="text-lg font-semibold text-red-600">
                    {formatCurrency(price)}
                </span>
            </p>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">4.6</span>
                <Star size="18" color="red" />
            </div>
            <Button
                onClick={() => increaseCartQuantity(Number(food?.id))}
                className="hidden group-hover:block transition-all duration-100 absolute right-5 bottom-5 p-2"
            >
                <ShoppingCart color="white" size="20" />
            </Button>
        </div>
    );
};

export default FoodItem;
