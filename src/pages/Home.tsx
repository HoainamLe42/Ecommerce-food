import config from '../config';
import Test from '../components/Test';
import Button from '../components/Button';
import Container from '../components/Container';
import NewsletterForm from '../components/NewsletterForm';
import FeaturedProductsSlider from '../components/FeaturedProductsSlider';

const Home = () => {
    return (
        <div>
            <div className="md:h-screen flex items-center py-10 md:pt-[120px] pt-[80px]">
                <Container>
                    {/* Hero */}
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5 items-center justify-center">
                        {/* Content */}
                        <section className="md:pr-10 flex flex-col gap-4">
                            <Test />
                            <p className="text-lg text-primary tracking-wide leading-5">
                                #The Best in Town
                            </p>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase">
                                Đặt food ngay, giao ngay tới nhà
                            </h1>

                            <p className="text-secondary-text">
                                Bạn muốn nó. Chúng tôi hiểu rồi. Thực phẩm, đồ
                                uống, hàng tạp hóa và nhiều thứ khác có sẵn để
                                giao hàng và nhận hàng.
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
                                src="./images/home/img1.png"
                                alt=""
                                className="relative z-10"
                            />

                            <div className="md:flex hidden absolute inset-x-0 top-[-10%] items-center justify-center">
                                <div className="max-h-[400px]  w-[400px] min-h-[300px] rounded-lg bg-[#29B067]"></div>
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
                    <div className="grid grid-cols-2 gap-5">
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
                </Container>
            </section>
            {/* FeaturedProductsSlider */}
            <FeaturedProductsSlider />

            {/* Newsletter */}
            <NewsletterForm />
        </div>
    );
};

export default Home;
