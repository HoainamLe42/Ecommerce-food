import { useEffect, useState } from 'react';

// Data
import { useShoppingCart } from '../context/StoreContext';
import Container from '../components/Container';
import FoodItem from '../components/FoodItem';
import ProductFilter from '../components/ProductFilter';

const Shopping = () => {
    const { filteredFoods, selectedType, setSelectedType } = useShoppingCart();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // // Tổng trang
    const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

    // Nếu lọc thì chuyển về trang 1
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredFoods]);

    // // Lấy danh sách của trang hiện tại
    const currentItems = filteredFoods.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    // // Hàm chuyển trang
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="bg-white">
            <div className="py-10 md:pt-[120px] pt-[80px]">
                <Container>
                    <div>
                        <div className="w-full mb-5">
                            <div className="flex justify-between">
                                <h3 className="md:text-2xl text-xl font-semibold mb-2">
                                    Danh sách món ăn
                                </h3>

                                <p
                                    className={`font-semibold text-nowrap cursor-pointer underline hover:text-primary md:hidden ${
                                        selectedType === 'All'
                                            ? 'text-primary'
                                            : 'text-inherit'
                                    }`}
                                    onClick={() => setSelectedType('All')}
                                >
                                    Tất cả
                                </p>
                            </div>
                            <ProductFilter />
                        </div>

                        {/* List item */}
                        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                            {currentItems.map((item) => (
                                <FoodItem {...item} key={item.id} />
                            ))}
                        </div>

                        {filteredFoods.length > itemsPerPage && (
                            <div className="mt-7 flex gap-4">
                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                handlePageChange(index + 1)
                                            }
                                            className={`h-[44px] w-[44px] rounded-lg border-[1px] border-gray-400 ${
                                                currentPage === index + 1
                                                    ? 'bg-primary text-white'
                                                    : ''
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ),
                                )}
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Shopping;
