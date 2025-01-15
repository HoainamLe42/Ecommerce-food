import React, { useState } from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CircleUser } from 'lucide-react';
import { useShoppingCart } from '../context/StoreContext';
import { formatCurrency } from '../utils/CurrencyFormatter';
import InputForm from '../components/InputForm';
import Popup from '../components/Popup';
import { useAuth } from '../context/AuthContext';
import { submitOrder } from '../api/orderService';

const paymentMethods = [
    { id: 'cod', label: 'Thanh toán khi nhận hàng' },
    { id: 'bank', label: 'Chuyển khoản ngân hàng' },
    { id: 'card', label: 'Thẻ tín dụng/ghi nợ' },
    { id: 'momo', label: 'Ví MoMo' },
];

const Checkout = () => {
    const {
        cartItems,
        setCartItems,
        getItemQuantity,
        getItemCartAmount,
        totalItemsInCart,
    } = useShoppingCart();
    const { user } = useAuth();
    const [isOpenItems, setIsOpenItems] = useState<boolean>(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);

    console.log(user);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
        // message: '',
        paymentMethod: 'cod',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const toggleIsOpenItem = () => {
        setIsOpenItems(!isOpenItems);
    };

    const [couponCode, setCouponCode] = useState<string>('');
    const [isCodeUsed, setIsCodeUsed] = useState<boolean>(false);

    const isButtonEnabled = couponCode.trim().length > 5;
    const handleApplyCoupon = () => {
        if (isButtonEnabled) {
            setIsCodeUsed(true);
            setCouponCode('');
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Kiểm tra thông tin form
        if (
            !formData.name ||
            !formData.address ||
            !formData.paymentMethod ||
            !formData.email ||
            !formData.phone
        ) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }
        const orderData = {
            // customerInfo: {
            //     name: formData.name,
            //     address: formData.address,
            //     email: formData.email,
            //     phone: formData.phone,
            //     message: formData.message,
            //     paymentMethods: formData.paymentMethod,
            // },
            // items: cartItems.map((item) => ({
            //     id: item.id,
            //     name: item.name,
            //     quantity: getItemQuantity(Number(item.id)),
            //     price: item.price,
            // })),
            id: Date.now(),
            userId: localStorage.getItem('userId') || 'gust',
            items: cartItems,
            total: getItemCartAmount(),
            paymentMethod: formData.paymentMethod,
            address: formData.address,
            date: new Date().toISOString(),
        };

        submitOrder(orderData);

        setFormData({
            name: '',
            address: '',
            email: '',
            phone: '',
            // message: '',
            paymentMethod: 'cod',
        });

        alert(JSON.stringify(orderData, null, 2));
        handleOpenPopup();

        // Xoá giỏ hàng sau khi đặt thành công
        setCartItems([]);
    };

    console.log('UserID: ', localStorage.getItem('userId'));
    console.log('CartItems: ', cartItems);

    return (
        <div className="bg-white h-screen">
            <div className="h-full">
                <Container>
                    <Link to="/">
                        <img
                            src="./logo.png"
                            alt="Logo"
                            className="lg:hidden py-3 flex mx-auto"
                        />
                    </Link>

                    <form
                        onSubmit={handleSubmit}
                        className="grid lg:grid-cols-[2fr_1fr] grid-cols-1 gap-5 h-screen"
                    >
                        {/* Left */}
                        <div className="lg:pt-7 pt-0">
                            <Link to="/">
                                <img
                                    src="./logo.png"
                                    alt=""
                                    className="lg:block  hidden"
                                />
                            </Link>

                            {/* Form */}
                            <div className="mt-3 flex lg:flex-row flex-col gap-5">
                                <div className="flex flex-col flex-1">
                                    <div className="flex justify-between mb-2">
                                        <h2 className="text-lg font-semibold">
                                            Thông tin nhận hàng
                                        </h2>
                                        {user ? undefined : (
                                            <Link to="/sign-in">
                                                <p className="flex items-center gap-2 text-sm text-primary">
                                                    <CircleUser size="20" />
                                                    Đăng nhập
                                                </p>
                                            </Link>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <InputForm
                                            label="Họ và tên"
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            setValue={handleChange}
                                        />
                                        <InputForm
                                            label="Địa chỉ"
                                            name="address"
                                            type="text"
                                            value={formData.address}
                                            setValue={handleChange}
                                        />
                                        <InputForm
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            setValue={handleChange}
                                        />
                                        <InputForm
                                            label="Số điện thoại"
                                            name="phone"
                                            type="number"
                                            value={formData.phone}
                                            setValue={handleChange}
                                        />
                                        {/* <div className="relative">
                                            <label
                                                htmlFor=""
                                                className={`absolute text-sm text-secondary-text/80 left-4 transition-all duration-300 ${
                                                    formData.message
                                                        ? 'text-xs top-[5px] text-primary'
                                                        : 'top-[13px]'
                                                }`}
                                            >
                                                Ghi chú
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        message: e.target.value,
                                                    })
                                                }
                                                className={`border-[1px] py-3 text-sm px-4 border-gray-300 rounded-md w-full placeholder:text-sm h-[80px] ${
                                                    formData.message
                                                        ? 'pt-4'
                                                        : 'pt-3'
                                                }`}
                                            ></textarea>
                                        </div> */}
                                    </div>
                                </div>

                                <div className="flex flex-col flex-1">
                                    <h2 className="text-lg font-semibold mb-2">
                                        Vận chuyển
                                    </h2>
                                    <p className="flex items-center gap-2 border-[1px] text-sm font-semibold px-4 border-gray-300 h-[44px] rounded-md w-full">
                                        <span className="text-secondary-text font-normal">
                                            Đồng giá:
                                        </span>{' '}
                                        {formatCurrency(30000)}
                                    </p>

                                    <div>
                                        <h2 className="text-lg font-semibold mt-5">
                                            Phương thức thanh toán
                                        </h2>
                                        <ul className="mt-3 flex flex-col gap-2">
                                            {paymentMethods.map((method) => (
                                                <li
                                                    key={method.id}
                                                    className="flex items-center gap-3"
                                                >
                                                    <input
                                                        type="radio"
                                                        id={method.id}
                                                        value={method.id}
                                                        name="paymentMethod"
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                paymentMethod:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        checked={
                                                            formData.paymentMethod ===
                                                            method.id
                                                        }
                                                        className="w-4 h-4 accent-primary"
                                                    />
                                                    <label
                                                        htmlFor={method.id}
                                                        className="text-sm cursor-pointer"
                                                    >
                                                        {method.label}
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="lg:bg-gray-100 bg-white lg:px-7 md:py-5 py-0 lg:border-[1px] border-none border-r-0 border-y-0 border-gray-300 pb-10">
                            <h2
                                onClick={toggleIsOpenItem}
                                className="text-xl font-semibold border-b border-gray-300 pb-3"
                            >
                                Đơn hàng (<span>{totalItemsInCart()}</span> sản
                                phẩm)
                            </h2>

                            {/*  items ordered */}
                            <ul
                                className={`lg:flex ${
                                    isOpenItems ? 'flex' : 'hidden'
                                } flex-col mt-5`}
                            >
                                {cartItems.map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex items-center mb-3"
                                    >
                                        <div className="relative">
                                            <img
                                                src={item.image}
                                                alt=""
                                                className="h-[50px] w-auto object-cover rounded-md border-[1px] border-gray-300"
                                            />
                                            <span className="absolute -top-[10%] -right-[10%] text-white bg-primary/80 h-5 w-5 flex items-center justify-center rounded-full text-xs">
                                                {getItemQuantity(
                                                    Number(item.id),
                                                )}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold ml-3">
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-secondary-text ml-auto">
                                            {formatCurrency(
                                                getItemQuantity(
                                                    Number(item.id),
                                                ) * item.price,
                                            )}
                                        </p>
                                    </li>
                                ))}
                            </ul>

                            {/* Coupon Code input */}
                            <div className="py-4 mt-4 border-y border-gray-300">
                                <div className="flex justify-between gap-4">
                                    <input
                                        type="text"
                                        name="couponCode"
                                        value={couponCode}
                                        onChange={(e) => {
                                            setCouponCode(e.target.value);
                                            setIsCodeUsed(false);
                                        }}
                                        placeholder="Nhập mã giảm giá"
                                        className="text-sm py-2 px-3 border-[1px] border-gray-300 rounded-lg w-full"
                                    />
                                    <Button
                                        onClick={handleApplyCoupon}
                                        disabled={!isButtonEnabled}
                                        className={`px-4 py-3 text-nowrap disabled:bg-primary/70 ${
                                            isButtonEnabled
                                                ? ''
                                                : 'cursor-not-allowed'
                                        }`}
                                    >
                                        Áp dụng
                                    </Button>
                                </div>
                                {isCodeUsed && (
                                    <p className="text-red-500 text-sm mt-2 ml-1">
                                        Mã giảm giá đã được áp dụng!
                                    </p>
                                )}

                                {!isButtonEnabled &&
                                    couponCode.trim() &&
                                    !isCodeUsed && (
                                        <p className="text-red-500 text-sm mt-2 ml-1">
                                            Mã giảm giá phải dài hơn 5 ký tự.
                                        </p>
                                    )}
                            </div>

                            {/* Checkout */}
                            <div className="mt-5">
                                <p className="flex justify-between text-sm text-secondary-text">
                                    Tạm tính{' '}
                                    <span>
                                        {formatCurrency(getItemCartAmount())}
                                    </span>
                                </p>
                                <p className="mt-3 flex justify-between text-sm text-secondary-text">
                                    Phí vận chuyển<span>---</span>
                                </p>

                                <p className="mt-4 pt-4 flex justify-between text-secondary-text border-t border-t-gray-300">
                                    Tổng cộng
                                    <span className="text-red-600 text-xl font-semibold">
                                        {formatCurrency(getItemCartAmount())}
                                    </span>
                                </p>

                                <div className="mt-4 flex justify-between gap-2">
                                    <Link
                                        to="/cart"
                                        className="flex items-center text-sm text-primary"
                                    >
                                        <ChevronLeft size="20" />
                                        Quay về giỏ hàng
                                    </Link>
                                    <Button
                                        type="submit"
                                        className="font-bold py-3 px-5"
                                    >
                                        ĐẶT HÀNG
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Container>
            </div>

            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                <p className="p-8">Đặt hàng thành công.</p>
            </Popup>
        </div>
    );
};

export default Checkout;
