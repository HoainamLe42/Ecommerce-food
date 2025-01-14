import { ChevronLeft, ChevronRight, LoaderCircle } from 'lucide-react';
import { useShoppingCart } from '../context/StoreContext';
import { formatCurrency } from '../utils/CurrencyFormatter';
import Button from './Button';
import Container from './Container';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const FeaturedProductsSlider = () => {
    const { featuredProducts } = useShoppingCart();
    const sliderRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [visibleItems, setVisibleItems] = useState(4);

    const totalSlides = Math.ceil(featuredProducts.length / visibleItems);

    const handleNext = () => {
        if (currentIndex < totalSlides - 1) {
            setCurrentIndex(currentIndex + 1);
            sliderRef.current?.scrollBy({
                left: sliderRef.current.offsetWidth,
                behavior: 'smooth',
            });
        }
    };
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            sliderRef.current?.scrollBy({
                left: -sliderRef.current.offsetWidth,
                behavior: 'smooth',
            });
        }
    };

    const smoothScroll = () => {
        if (sliderRef.current) {
            const distance = sliderRef.current.offsetWidth;
            sliderRef.current.scrollLeft = currentIndex * distance;
        }
    };

    useEffect(() => {
        smoothScroll();
    }, [currentIndex]);

    useEffect(() => {
        const updateVisibleItems = () => {
            if (window.innerWidth >= 1024) {
                setVisibleItems(4);
            }
            if (window.innerWidth >= 768) {
                setVisibleItems(3);
            }
            if (window.innerWidth >= 640) {
                setVisibleItems(2);
            } else {
                setVisibleItems(1);
            }
        };

        updateVisibleItems();
        window.addEventListener('resize', updateVisibleItems);

        return () => {
            window.removeEventListener('resize', updateVisibleItems);
        };
    }, []);

    return (
        <section className="py-7">
            <Container>
                <h2 className="text-2xl font-bold mb-4">Sản phẩm nổi bật</h2>
                {/* Slider Container */}
                <div className="relative">
                    <div
                        ref={sliderRef}
                        className="flex overflow-hidden scroll-smooth w-full"
                    >
                        <div
                            className="flex w-full transition-all duration-500"
                            // style={{
                            //     transform: `translateX(-${
                            //         currentIndex * (100 / visibleItems)
                            //     }%)`,
                            // }}
                        >
                            {featuredProducts.map((food) => (
                                <div
                                    // to={`/detail/${food.id}`}
                                    key={food.id}
                                    className={`flex-none lg:w-1/4 md:w-1/3 w-full p-2`}
                                >
                                    <div className="flex p-2 h-full flex-col bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer pb-2">
                                        <div className="h-[250px]">
                                            <img
                                                src={food.image}
                                                alt=""
                                                className={`w-full h-full object-cover pointer-events-none select-none ${
                                                    isImageLoaded
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                }`}
                                                onLoad={() =>
                                                    setIsImageLoaded(true)
                                                }
                                            />
                                        </div>

                                        <div className="py-1 px-3">
                                            <h3 className="text-lg font-semibold mt-2">
                                                {food.name}
                                            </h3>
                                            <p className="font-bold text-red-500">
                                                {formatCurrency(food.price)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button
                        onClick={handlePrev}
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 disabled:opacity-80 md:p-2 p-1"
                        disabled={currentIndex === 0}
                    >
                        <ChevronLeft />
                    </Button>

                    <Button
                        onClick={handleNext}
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 disabled:opacity-80 md:p-2 p-1"
                        disabled={currentIndex === totalSlides - 1}
                    >
                        <ChevronRight />
                    </Button>

                    {/* <div className="md:flex hidden justify-center gap-3 mt-3">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full white border ${
                                    currentIndex === index
                                        ? 'bg-primary border-primary'
                                        : 'bg-white border-secondary-border'
                                }`}
                            ></button>
                        ))}
                    </div> */}
                </div>
            </Container>
        </section>
    );
};

export default FeaturedProductsSlider;
