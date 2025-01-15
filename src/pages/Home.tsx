import config from '../config';
import Button from '../components/Button';
import Container from '../components/Container';
import NewsletterForm from '../components/NewsletterForm';
import FeaturedProductsSlider from '../components/FeaturedProductsSlider';
import { useShoppingCart } from '../context/StoreContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Banner from '../components/Home/Banner';

const Home = () => {
    const { loading } = useShoppingCart();

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
                                <section className="md:pr-10 flex flex-col gap-4 transform">
                                    <p className="text-lg text-primary tracking-wide leading-5 slide-in-top">
                                        #The Best in Town
                                    </p>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase slide-in-left">
                                        Đặt food ngay, giao ngay tới nhà
                                    </h1>

                                    <p className="text-secondary-text slide-in-right">
                                        Bạn muốn nó. Chúng tôi hiểu rồi. Thực
                                        phẩm, đồ uống, hàng tạp hóa và nhiều thứ
                                        khác có sẵn để giao hàng và nhận hàng.
                                    </p>

                                    <div className="sm:max-w-[300px] w-full slide-in-top">
                                        <Button
                                            to={config.routes.shopping}
                                            className="uppercase w-full font-semibold py-4 flex justify-center"
                                        >
                                            Đặt hàng ngay
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-3 slide-in-top">
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
                                <div className="relative fade-in">
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
                    <Banner />
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
