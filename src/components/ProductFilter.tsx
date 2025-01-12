import { useState } from 'react';

import { useShoppingCart } from '../context/StoreContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';
import { productCategories } from '../data/dataProducts';

const ProductFilter = () => {
    const { selectedType, setSelectedType, selectedValue, setSelectedValue } =
        useShoppingCart();
    const [startIndex, setStartIndex] = useState(0);
    const visibleItems = 3;

    const handleNextBtn = () => {
        if (startIndex + visibleItems < productCategories.length) {
            setStartIndex(startIndex + 1);
        }
    };
    const handlePrevBtn = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };
    const visibleProducts = productCategories.slice(
        startIndex,
        startIndex + visibleItems,
    );

    return (
        <div className="relative overflow-hidden flex justify-between">
            {/* Main */}
            <ul className="md:flex hidden overflow-y-hidden items-center gap-9">
                {productCategories.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => setSelectedType(item.type)}
                        className={`flex flex-col items-center gap-2 cursor-pointer ${
                            selectedType === item.type
                                ? 'text-primary'
                                : 'text-inherit'
                        }`}
                    >
                        <div className="h-16 w-16 flex items-center justify-center rounded-full bg-yellow-100">
                            <img
                                src={item.image}
                                alt=""
                                className="h-7 w-7 object-cover cursor-pointer"
                            />
                        </div>
                        <p className="text-nowrap text-sm">{item.name}</p>
                    </li>
                ))}

                <li
                    className={`font-semibold text-nowrap cursor-pointer underline hover:text-primary hidden md:block ${
                        selectedType === 'All' ? 'text-primary' : 'text-inherit'
                    }`}
                    onClick={() => setSelectedType('All')}
                >
                    Tất cả
                </li>
            </ul>

            {/* Mobile */}
            <ul className="md:hidden flex mx-auto overflow-y-hidden items-center gap-9">
                {visibleProducts.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => setSelectedType(item.type)}
                        className={`flex flex-col items-center gap-2 cursor-pointer ${
                            selectedType === item.type
                                ? 'text-primary'
                                : 'text-inherit'
                        }`}
                    >
                        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-yellow-100">
                            <img
                                src={item.image}
                                alt=""
                                className="h-7 w-7 object-cover cursor-pointer"
                            />
                        </div>
                        <p className="font-semibold text-nowrap text-sm">
                            {item.name}
                        </p>
                    </li>
                ))}

                {/* <li
                    className={`font-semibold text-nowrap cursor-pointer underline hover:text-primary ${
                        selectedType === 'All' ? 'text-primary' : 'text-inherit'
                    }`}
                    onClick={() => setSelectedType('All')}
                >
                    Tất cả
                </li> */}
            </ul>
            {/* Button Next & Prev */}
            <Button
                onClick={handlePrevBtn}
                className="md:hidden absolute left-[2%] top-1/2 transform -translate-y-1/2 p-[2px] disabled:opacity-80"
                disabled={startIndex === 0}
            >
                <ChevronLeft size={16} />
            </Button>
            <Button
                onClick={handleNextBtn}
                className="md:hidden absolute right-[2%] top-1/2 transform -translate-y-1/2 p-[2px] disabled:opacity-80"
                disabled={startIndex + visibleItems >= productCategories.length}
            >
                <ChevronRight size={16} />
            </Button>
            <div className="lg:flex hidden items-end gap-5 pb-3 pr-3">
                <p className="font-semibold">Lọc:</p>{' '}
                <div className="p-1 border-[1px] border-gray-500 rounded-lg">
                    <select
                        value={selectedValue}
                        onChange={(e) => setSelectedValue(e.target.value)}
                    >
                        <option value="all">Tất cả</option>
                        <option value="lowToHigh">Giá cao đến thấp</option>
                        <option value="highToLow">Giá thấp đến cao</option>
                        <option value="favourite">Yêu thích</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;
