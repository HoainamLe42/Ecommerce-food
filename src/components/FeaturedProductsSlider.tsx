import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useShoppingCart } from '../context/StoreContext';
import { formatCurrency } from '../utils/CurrencyFormatter';
import Button from './Button';
import Container from './Container';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FeaturedProductsSlider = () => {
    const { featuredProducts } = useShoppingCart();
    const [startIndex, setStartIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(4);

    const updateVisibleItems = () => {
        const width = window.innerWidth;
        // console.log(width);

        if (width >= 1024) {
            setVisibleItems(4);
        } else if (width >= 768) {
            setVisibleItems(3);
        } else if (width >= 640) {
            setVisibleItems(2);
        } else {
            setVisibleItems(1);
        }
    };

    useEffect(() => {
        updateVisibleItems();

        window.addEventListener('resize', updateVisibleItems);

        return () => {
            window.removeEventListener('resize', updateVisibleItems);
        };
    }, []);

    const handleNextBtn = () => {
        if (startIndex + visibleItems < featuredProducts.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrevBtn = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const productsSlider = featuredProducts.slice(
        startIndex,
        startIndex + visibleItems,
    );

    return (
        <section className="py-7">
            <Container>
                <h2 className="text-2xl font-bold mb-4">Sản phẩm nổi bật</h2>
                <div className="relative">
                    {/* Button x2 */}
                    <Button
                        onClick={handlePrevBtn}
                        className="absolute z-10 left-[2%] top-1/2 transform -translate-y-1/2 p-1 disabled:opacity-80"
                        disabled={startIndex === 0}
                    >
                        <ChevronLeft size={16} />
                    </Button>
                    <Button
                        onClick={handleNextBtn}
                        className="absolute z-10 right-[2%] top-1/2 transform -translate-y-1/2 p-1 disabled:opacity-80"
                        disabled={
                            startIndex + visibleItems >= featuredProducts.length
                        }
                    >
                        <ChevronRight size={16} />
                    </Button>

                    {/* CardItems */}
                    <div
                        className="flex gap-4 justify-between transition-transform duration-700"
                        style={{}}
                    >
                        {productsSlider.map((food) => (
                            // item
                            <Link
                                to={`/detail/${food.id}`}
                                key={food.id}
                                className="w-full "
                            >
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer">
                                    <img
                                        src={food.image}
                                        alt=""
                                        className="w-full max-w-[244px] h-[244px] object-cover mx-auto mt-3"
                                    />
                                    <div className="py-1 px-3">
                                        <h3 className="text-lg font-semibold mt-2">
                                            {food.name}
                                        </h3>
                                        <p className="font-bold text-red-500">
                                            {formatCurrency(food.price)}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default FeaturedProductsSlider;
