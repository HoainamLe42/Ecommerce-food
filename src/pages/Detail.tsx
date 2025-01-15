import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, CircleDollarSign, Truck } from 'lucide-react';

import Container from '../components/Container';
import Button from '../components/Button';
import { useShoppingCart } from '../context/StoreContext';
import { formatCurrency } from '../utils/CurrencyFormatter';
import { useAuth } from '../context/AuthContext';
import config from '../config';
import Popup from '../components/Popup';

const Detail = () => {
    const {
        foods,
        increaseCartQuantity,
        getItemQuantity,
        decreaseCartQuantity,
    } = useShoppingCart();
    const { id } = useParams<{ id: string }>();
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);

    //  Chuyển id thành dạng number cho dễ thao tác
    const foodId = Number(id);

    // Lấy chi tiết sản phẩm từ id
    const food = foods?.find((food) => Number(food.id) === Number(id));

    const tabs = [
        { key: 'description', label: 'Mô tả' },
        { key: 'info', label: 'Thông tin' },
        { key: 'reviews', label: 'Đánh giá' },
    ];
    // Data fake
    const description =
        'Đây là mô tả chi tiết của sản phẩm. Sản phẩm được làm từ chất liệu cao cấp.';
    const info =
        'Thông tin chi tiết: Sản phẩm nặng 2kg, kích thước 30x20x10 cm.';
    const reviews = [
        { user: 'Nguyen Van A', comment: 'Sản phẩm rất tốt!', rating: 5 },
        {
            user: 'Tran Thi B',
            comment: 'Chất lượng ổn so với giá.',
            rating: 4,
        },
    ];
    const [activeTab, setActiveTab] = useState<string>('description');

    const handleTabChange = (tab: string) => {
        if (tab === 'description' || tab === 'info' || tab === 'reviews') {
            setActiveTab(tab);
        } else {
            console.error('Invalid tab value:', tab);
        }
    };

    return (
        <div className="bg-white">
            <div className="py-10 md:pt-[120px] pt-[80px]">
                <Container>
                    {/* Top */}
                    <div className="flex md:flex-row flex-col gap-10">
                        <div className="relative w-full h-full mx-auto max-w-[300px] max-h-[300px] flex-shrink-0 rounded-lg overflow-hidden">
                            {!isImageLoaded && (
                                <div className="absolute inset-0 animate-pulse bg-gray-300">
                                    <span className="text-secondary-text text-2xl block p-5">
                                        No Image
                                    </span>
                                </div>
                            )}
                            <img
                                src={food?.image}
                                alt=""
                                className={`h-full w-full object-cover mx-auto ${
                                    isImageLoaded ? 'opacity-100' : 'opacity-0'
                                }`}
                                onLoad={() => setIsImageLoaded(true)}
                            />
                        </div>

                        <section>
                            <h2 className="text-3xl font-bold">{food?.name}</h2>
                            <p className="text-xl text-red-500 font-semibold mt-4">
                                {formatCurrency(Number(food?.price))}
                            </p>

                            <hr className="my-4" />
                            <p className="text-secondary-text">
                                Bạn đang băm khoăn không biết phải làm gì với
                                bát cơm còn thừa bữa trước, đổ đi thì quá uổng
                                phí còn giữ lại ăn thì khô khó mà nuốt nổi. Cách
                                hay dưới đây sẽ giúp bạn giải quyết chỗ cơm thừa
                                đó và mang lại cho bạn một bữa sáng đầy dinh
                                dưỡng. Tham khảo công thức làm món cơm rang kim
                                chi dưới đây bạn nhé.
                            </p>

                            <hr className="my-4" />

                            <div className="flex sm:flex-row flex-col sm:items-center items-start gap-3">
                                <p className="font-bold text-nowrap">
                                    Số lượng:
                                </p>
                                <div className="border-[1px] sm:max-w-[130px] w-full justify-between border-gray-300 inline-flex items-center gap-3 rounded-md py-2 px-5">
                                    <span
                                        onClick={() => {
                                            decreaseCartQuantity(
                                                Number(food?.id),
                                            );
                                        }}
                                        className="w-7 h-7 flex items-center justify-center cursor-pointer rounded-md"
                                    >
                                        -
                                    </span>
                                    <span>{getItemQuantity(foodId)}</span>
                                    <span
                                        onClick={() =>
                                            increaseCartQuantity(
                                                Number(food?.id),
                                            )
                                        }
                                        className="w-7 h-7 flex items-center justify-center cursor-pointer rounded-md"
                                    >
                                        +
                                    </span>
                                </div>

                                <Button
                                    onClick={() => {
                                        if (!user) {
                                            alert(
                                                'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng',
                                            );
                                            handleOpenPopup();
                                            return;
                                        } else {
                                            navigate(config.routes.cart);
                                        }
                                    }}
                                    className="py-3 px-5 font-bold w-full"
                                >
                                    Mua ngay
                                </Button>
                            </div>
                        </section>

                        <aside className="hidden lg:block">
                            <div className="p-4 border-[1px] border-gray-300 rounded-xl shadow-sm">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex gap-2 items-center mb-2">
                                        <Truck color="orange" />
                                        <p className="text-sm font-bold uppercase text-nowrap">
                                            Phí vận chuyển siêu rẻ
                                        </p>
                                    </div>
                                    <p className="font-semibold text-sm">
                                        - Dưới 5km: phí ship chỉ với{' '}
                                        <span className="text-red-500 font-bold">
                                            35.000d.
                                        </span>
                                    </p>
                                    <p className="font-semibold text-sm">
                                        - Từ 5km: phí ship chỉ với{' '}
                                        <span className="text-red-500 font-bold">
                                            55.000d.
                                        </span>
                                    </p>
                                    <p className="text-sm italic font-semibold">
                                        <span className="">Đặc biệt:</span> miễn
                                        phí ship cho đơn hàng từ 550.000d.
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 border-[1px] border-gray-300 rounded-xl shadow-sm mt-5">
                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-sm flex items-center gap-4 text-gray-500 italic">
                                        <Box
                                            color="grey"
                                            size="30"
                                            className="flex-shrink-0"
                                        />{' '}
                                        Giao hàng tận nơi nhanh chóng.
                                    </p>

                                    <p className="text-sm flex items-center gap-4 text-gray-500 italic">
                                        <CircleDollarSign
                                            color="grey"
                                            size="30"
                                            className="flex-shrink-0"
                                        />{' '}
                                        Có thể thanh toán online hoặc thanh toán
                                        tại nhà.
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* Bottom */}
                    <div className="mt-10">
                        {/* Tabs header */}
                        <ul className="text-sm h-[50px] text-secondary-text flex sm:justify-start justify-around border-[1px] border-gray-300">
                            {tabs.map((tab, index) => (
                                <li
                                    onClick={() => handleTabChange(tab.key)}
                                    key={index}
                                    className={`py-2 flex items-center px-4 cursor-pointer ${
                                        activeTab === tab.key
                                            ? 'border-t-4 border-t-primary sm:border-x sm:border-x-gray-300 border-x-0'
                                            : undefined
                                    }`}
                                >
                                    {tab.label}
                                </li>
                            ))}
                        </ul>

                        {/* Tabs content */}
                        <div className="border-[1px] border-gray-300 px-4 py-3 border-t-0">
                            {activeTab === 'description' && (
                                <div>{description}</div>
                            )}

                            {activeTab === 'info' && <div>{info}</div>}

                            {activeTab === 'reviews' && (
                                <div>
                                    {reviews.map((review, index) => (
                                        <div
                                            key={index}
                                            className="mb-4 border p-2 rounded-lg"
                                        >
                                            <p className="font-bold">
                                                {review.user}
                                            </p>
                                            <p>{review.comment}</p>
                                            <p>Rating: {review.rating}/5</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                <p className="p-8">Chưa đăng nhập ai cho bạn mua. !!</p>
            </Popup>
            ;
        </div>
    );
};

export default Detail;
