import { useShoppingCart } from '../context/StoreContext';
import { productCategories } from '../data/dataProducts';

const ProductFilter = () => {
    const { selectedType, setSelectedType, selectedValue, setSelectedValue } =
        useShoppingCart();

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
                        <p className="text-sm text-nowrap">{item.name}</p>
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
            <div className="overflow-y-auto no-scrollbar">
                <ul className="md:hidden flex mx-auto overflow-y-auto items-center gap-9">
                    {productCategories.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => setSelectedType(item.type)}
                            className={`flex flex-col items-center justify-center gap-2 cursor-pointer ${
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
                </ul>
            </div>

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
