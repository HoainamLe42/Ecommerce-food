import { Trash2 } from 'lucide-react';

import Container from '../components/Container';
import Button from '../components/Button';
import { useShoppingCart } from '../context/StoreContext';
import { formatCurrency } from '../utils/CurrencyFormatter';
import config from '../config';

const headers = [
    'Sản phẩm',
    'Thông tin sản phẩm',
    'Đơn giá',
    'Số lượng',
    'Tổng tiền',
    'Xóa',
];

const Cart = () => {
    const {
        cartItems,
        increaseCartQuantity,
        decreaseCartQuantity,
        getItemQuantity,
        removeFromCart,
        totalItemsInCart,
        getItemCartAmount,
    } = useShoppingCart();

    // Tổng tiền của 1 sản phẩm với số lượng

    return (
        <div>
            <div className="bg-white">
                <div className="py-10 md:pt-[120px] pt-[80px]">
                    <Container>
                        {/* Header */}
                        <ul className="md:grid md:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] justify-between py-2 px-3 border-[1px] border-gray-400 shadow-sm">
                            {headers.map((header, index) => (
                                <li
                                    key={index}
                                    className="hidden md:flex justify-center font-bold"
                                >
                                    {header}
                                </li>
                            ))}
                            <li className="block md:hidden justify-center font-semibold text-secondary-text uppercase">
                                Giỏ hàng của bạn
                            </li>
                        </ul>

                        {/* item ordered */}
                        <div className="md:mt-8 mt-3">
                            {cartItems.length === 0 ? (
                                <p className="text-secondary-text text-lg">
                                    Không có sản phẩm trong giỏ hàng.
                                </p>
                            ) : (
                                <div className="flex flex-col border-[1px] border-gray-400 shadow-sm ">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="hidden md:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center justify-between py-5 px-3 border-b border-gray-300"
                                        >
                                            <div className="flex justify-center">
                                                <img
                                                    src={item.image}
                                                    alt=""
                                                    className="h-[95px] w-[95px] flex flex-shrink-0 object-cover"
                                                />
                                            </div>
                                            <p className="flex justify-center font-bold">
                                                {item.name}
                                            </p>
                                            <p className="flex justify-center font-bold">
                                                {formatCurrency(item.price)}
                                            </p>
                                            <div className="flex justify-center">
                                                <div className="border-[1px] sm:max-w-[130px] w-full justify-between border-gray-300 flex items-center gap-3 rounded-md py-2 px-5">
                                                    <span
                                                        onClick={() =>
                                                            decreaseCartQuantity(
                                                                Number(item.id),
                                                            )
                                                        }
                                                        className="w-7 h-7 flex items-center justify-center cursor-pointer rounded-md"
                                                    >
                                                        -
                                                    </span>
                                                    <span>
                                                        {getItemQuantity(
                                                            Number(item.id),
                                                        )}
                                                    </span>
                                                    <span
                                                        onClick={() =>
                                                            increaseCartQuantity(
                                                                Number(item.id),
                                                            )
                                                        }
                                                        className="w-7 h-7 flex items-center justify-center cursor-pointer rounded-md"
                                                    >
                                                        +
                                                    </span>
                                                </div>
                                            </div>
                                            <li className="flex justify-center font-bold">
                                                {formatCurrency(
                                                    item.price *
                                                        getItemQuantity(
                                                            Number(item.id),
                                                        ),
                                                )}
                                            </li>
                                            <p
                                                onClick={() =>
                                                    removeFromCart(
                                                        Number(item.id),
                                                    )
                                                }
                                                className="flex justify-center cursor-pointer"
                                            >
                                                <Trash2 color="grey" />
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {/* Mobile */}
                            <div className="flex flex-col gap-2">
                                {cartItems.map((item) => (
                                    <div className="flex md:hidden justify-between p-3 border-b border-b-gray-200">
                                        <div className="flex justify-center gap-2 text-sm">
                                            <img
                                                src={item.image}
                                                alt=""
                                                className="h-[80px] w-[80px] flex flex-shrink-0 object-cover"
                                            />
                                            <div>
                                                <h3>{item.name}</h3>
                                                <p>
                                                    Giá:{' '}
                                                    <p className="text-red-500 font-semibold">
                                                        {formatCurrency(
                                                            item.price,
                                                        )}
                                                    </p>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-2">
                                            <div className="border-[1px] sm:max-w-[130px] w-full justify-between border-gray-300 flex items-center">
                                                <button
                                                    onClick={() =>
                                                        decreaseCartQuantity(
                                                            Number(item.id),
                                                        )
                                                    }
                                                    className="w-7 h-7 flex items-center justify-center cursor-pointer rounded-md"
                                                >
                                                    -
                                                </button>
                                                <span className="border-x border-x-gray-300 px-2">
                                                    {getItemQuantity(
                                                        Number(item.id),
                                                    )}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        increaseCartQuantity(
                                                            Number(item.id),
                                                        )
                                                    }
                                                    className="w-7 h-7 flex items-center justify-center cursor-pointer rounded-md"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <Trash2
                                                onClick={() =>
                                                    removeFromCart(
                                                        Number(item.id),
                                                    )
                                                }
                                                color="grey"
                                                size="18"
                                                className="mx-auto"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom */}
                        <ul className="flex flex-col md:items-end gap-2 mt-6">
                            {totalItemsInCart() > 0 && (
                                <li className="flex items-center md:justify-end justify-between text-sm gap-2">
                                    Tổng sản phẩm:{' '}
                                    <span className="font-bold">
                                        x{totalItemsInCart()}
                                    </span>
                                </li>
                            )}
                            <li className="flex items-center md:justify-end justify-between gap-2">
                                Tổng tiền:{' '}
                                <span className="font-bold text-xl">
                                    {formatCurrency(getItemCartAmount())}
                                </span>
                            </li>
                            <li className="flex md:gap-5 gap-3 md:flex-row flex-col">
                                <Button
                                    to={config.routes.shopping}
                                    className="py-3 px-5 bg-gray-100 text-black hover:bg-gray-50 md:order-1 order-2"
                                >
                                    Tiếp tục mua hàng
                                </Button>
                                <Button
                                    to={config.routes.checkout}
                                    className="py-3 px-8 md:order-2 order-1"
                                >
                                    Tiến hành đặt hàng
                                </Button>
                            </li>
                        </ul>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default Cart;
