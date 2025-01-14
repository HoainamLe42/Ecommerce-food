import { useEffect, useState } from 'react';
import Button from '../Button';
import Popup from '../Popup';
import Container from '../Container';
import { API_BASE_URL } from '../../context/StoreContext';

type BannerImage = {
    id: number;
    src: string;
    alt: string;
};

const Banner = () => {
    const [bannerImages, setBannerImages] = useState<BannerImage[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Chúng tôi sẽ gửi phiếu giảm giá trong email.');
        handleClosePopup();
    };

    useEffect(() => {
        const isPopupShown = localStorage.getItem('popupShown');
        if (!isPopupShown) {
            setIsPopupOpen(true);
            localStorage.setItem('popupShown', 'true');
        }
    }, []);

    // Get data banner images
    useEffect(() => {
        const fetchBannerImages = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/banner`);
                if (!response.ok) {
                    throw new Error(`HTTP lỗi! status: ${response.status}`);
                }
                const data = await response.json();
                setBannerImages(data);
            } catch (error) {
                console.error('Lỗi khi tải Banner images:', error);
            }
        };
        fetchBannerImages();
    }, []);

    return (
        <section className="bg-white md:py-5 py-3">
            <Container>
                <div
                    className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-1"
                    onClick={handleOpenPopup}
                >
                    {bannerImages.slice(0, 1).map((banner) => (
                        <div
                            key={banner.id}
                            className="md:block hidden md:max-h-[450px] max-h-[160px] max-w-[580px] overflow-hidden"
                        >
                            <img
                                src={banner.src}
                                alt={banner.alt}
                                className="w-full h-full object-cover cursor-pointer"
                            />
                        </div>
                    ))}

                    <div className="md:max-h-[450px] max-h-[160px] md:max-w-[580px] w-full grid grid-rows-2 md:gap-5 gap-2">
                        <div className="md:grid hidden grid-cols-2 md:gap-5 gap-1 max-h-[225px]">
                            {bannerImages.slice(1, 2).map((banner) => (
                                <div key={banner.id}>
                                    <img
                                        src={banner.src}
                                        alt={banner.alt}
                                        className="w-full h-full object-cover cursor-pointer"
                                    />
                                </div>
                            ))}

                            {bannerImages.slice(2, 3).map((banner) => (
                                <div key={banner.id}>
                                    <img
                                        src={banner.src}
                                        alt={banner.alt}
                                        className="w-full h-full object-cover cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>
                        {bannerImages.slice(3, 4).map((banner) => (
                            <div
                                key={banner.id}
                                className="md:h-auto h-[160px] w-full"
                            >
                                <img
                                    src={banner.src}
                                    alt={banner.alt}
                                    className="w-full h-full object-cover cursor-pointer"
                                />
                            </div>
                        ))}
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
                        className="block max-w-[570px] object-cover"
                    />
                    {/* content */}
                    <div className="md:my-7 my-4 text-center">
                        <div className="flex flex-col md:gap-7 gap-1">
                            <p className="uppercase md:text-3xl text-xl text-orange-600">
                                Unlock
                            </p>
                            <p className="uppercase md:text-[64px] text-2xl font-semibold">
                                20% OFF
                            </p>
                            <p className="uppercase md:text-3xl text-xl font-bold text-green-600">
                                Đơn hàng của bạn
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="px-5 mt-5">
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
    );
};

export default Banner;
