import config from '../config';
import Button from '../components/Button';
import Container from '../components/Container';
import NewsletterForm from '../components/NewsletterForm';
import FeaturedProductsSlider from '../components/FeaturedProductsSlider';
import Popup from '../components/Popup';
import { useState } from 'react';
import { useShoppingCart } from '../context/StoreContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const { loading } = useShoppingCart();

    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        alert('Chúng tôi sẽ gửi phiếu giảm giá trong email.');
        handleClosePopup();
    };
    return (
        <div>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div>
                    <div className="md:h-screen flex items-center py-10 md:pt-[120px] pt-[80px]">
                        <Container>
                            {/* Hero */}
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 items-center justify-center">
                                {/* Content */}
                                <section className="md:pr-10 flex flex-col gap-4">
                                    <p className="text-lg text-primary tracking-wide leading-5">
                                        #The Best in Town
                                    </p>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase">
                                        Đặt food ngay, giao ngay tới nhà
                                    </h1>

                                    <p className="text-secondary-text">
                                        Bạn muốn nó. Chúng tôi hiểu rồi. Thực
                                        phẩm, đồ uống, hàng tạp hóa và nhiều thứ
                                        khác có sẵn để giao hàng và nhận hàng.
                                    </p>

                                    <div className="sm:max-w-[300px] w-full">
                                        <Button
                                            to={config.routes.shopping}
                                            className="uppercase w-full font-semibold py-4 flex justify-center"
                                        >
                                            Đặt hàng ngay
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <p className="text-xl font-bold">
                                            Tải ứng dụng:
                                        </p>

                                        <img
                                            src="/images/home/apple.png"
                                            alt=""
                                            className="h-12 w-12 rounded-full object-cover cursor-pointer"
                                        />
                                        <img
                                            src="/images/home/android.png"
                                            alt=""
                                            className="h-12 w-12 rounded-full object-cover cursor-pointer"
                                        />
                                    </div>
                                </section>

                                {/* Media */}
                                <div className="relative">
                                    <img
                                        src="./images/home/img1.webp"
                                        alt=""
                                        className="relative z-10 md:bg-transparent bg-green-700 md:p-0 p-2 pb-0 rounded-md"
                                    />

                                    <div className="md:flex hidden absolute inset-x-0 top-[-10%] items-center justify-center">
                                        <div className="max-h-[400px] w-[400px] min-h-[300px] rounded-lg bg-[#29B067]"></div>
                                    </div>

                                    <div className="md:flex hidden absolute inset-x-0 bottom-0 items-center justify-center">
                                        <div className="max-h-[430px] min-h-[300px] w-[340px] rounded-lg bg-[#FFCF54]"></div>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                    {/* Banner */}
                    <section className="bg-white py-6">
                        <Container>
                            <div
                                className="grid grid-cols-2 gap-5"
                                onClick={handleOpenPopup}
                            >
                                <div className="">
                                    <img
                                        src="/images/banner/box_1.webp"
                                        alt=""
                                        className="w-full h-full object-cover cursor-pointer"
                                    />
                                </div>
                                <div className="grid grid-rows-2 gap-5">
                                    <div className="">
                                        <img
                                            src="/images/banner/box_2.webp"
                                            alt=""
                                            className="w-full h-full object-cover cursor-pointer"
                                        />
                                    </div>
                                    <div>
                                        <img
                                            src="/images/banner/box_3.webp"
                                            alt=""
                                            className="w-full h-full object-cover cursor-pointer"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <img
                                            src="/images/banner/box_4.webp"
                                            alt=""
                                            className="w-full h-full object-cover cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                            <Popup
                                isOpen={isPopupOpen}
                                onClose={handleClosePopup}
                                sizePopup="570px"
                            >
                                <img
                                    src="/images/banner/bg-flashsale.webp"
                                    alt=""
                                    className="block w-full object-cover"
                                />
                                {/* content */}
                                <div className="my-7 text-center">
                                    <p className="uppercase text-3xl text-orange-600">
                                        Unlock
                                    </p>
                                    <p className="uppercase text-[64px] font-semibold">
                                        20% OFF
                                    </p>
                                    <p className="uppercase text-3xl font-bold text-green-600">
                                        Đơn hàng của bạn
                                    </p>

                                    <form
                                        onSubmit={handleSubmit}
                                        className="px-5 mt-5"
                                    >
                                        <div className="border rounded-md overflow-hidden">
                                            <label htmlFor=""></label>
                                            <input
                                                type="date"
                                                className="w-full p-3 uppercase rounded-md text-lg text-secondary-text text-nowrap placeholder:text-secondary-text"
                                            />
                                        </div>

                                        <div className="border rounded-md overflow-hidden mt-5">
                                            <label htmlFor=""></label>
                                            <input
                                                type="email"
                                                className="w-full p-3 rounded-md text-lg placeholder:text-secondary-text"
                                                placeholder="Nhập email..."
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="uppercase mt-5 w-full p-3"
                                        >
                                            Xác nhận
                                        </Button>
                                    </form>
                                </div>
                            </Popup>
                        </Container>
                    </section>
                    {/* FeaturedProductsSlider */}
                    <FeaturedProductsSlider />

                    {/* Newsletter */}
                    <NewsletterForm />
                </div>
            )}
        </div>
    );
};

export default Home;
