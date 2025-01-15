import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CircleX, MenuIcon, ShoppingCart } from 'lucide-react';

import Logo from '../assets/logo.png';
import { listNav } from '../data/navData';
import Container from '../components/Container';
import Button from '../components/Button';
import DropdownAvatar from '../components/DropdownAvatar';
import { formatCurrency } from '../utils/CurrencyFormatter';
import config from '../config';
import { UserAvatar, useAuth } from '../context/AuthContext';
import { useShoppingCart } from '../context/StoreContext';
import MobileMenu from '../components/MobileMenu';

const Header = () => {
    const { cartItems, totalItemsInCart, removeFromCart, getItemCartAmount } =
        useShoppingCart();
    const { user } = useAuth();
    const [isActiveScroll, setIsActiveScroll] = useState<boolean>(false);
    const [isOpenDropdown, setIsOpenDropDown] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleScroll = () => {
        setIsActiveScroll(window.scrollY > 150);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`py-2 fixed w-full top-0 z-[9999] bg-[#FFFAE3] ${
                isActiveScroll
                    ? 'shadow-lg md:py-3 transition-all duration-200'
                    : 'md:py-7'
            }`}
        >
            <Container>
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to={'/'}>
                        <img src={Logo} alt="Logo" />
                    </Link>

                    {/* Nav */}
                    <nav className="md:block hidden">
                        <ul className="flex gap-1">
                            {listNav.map((nav) => (
                                <li key={nav.id}>
                                    <NavLink
                                        to={nav.path}
                                        className={({ isActive }) =>
                                            `py-3 px-3 transition-all duration-150 uppercase cursor-pointer ${
                                                isActive
                                                    ? 'underline'
                                                    : 'hover:underline'
                                            }`
                                        }
                                    >
                                        {nav.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Sign In & Sign Up */}
                    <div className="flex gap-8 items-center">
                        <div className="text-sm gap-3 md:flex hidden items-center">
                            {user ? (
                                <div className="flex items-center gap-7">
                                    {/* Cart Icon */}
                                    <div className="relative group">
                                        <ShoppingCart
                                            onClick={() =>
                                                setIsOpenDropDown(
                                                    !isOpenDropdown,
                                                )
                                            }
                                            className="cursor-pointer"
                                        />
                                        {totalItemsInCart() > 0 && (
                                            <span className="absolute top-[-10%] right-[-10%] bg-red-500 h-4 w-4 rounded-full flex justify-center items-center text-white text-xs">
                                                {totalItemsInCart()}
                                            </span>
                                        )}
                                        {/* dropdown cart */}
                                        <div
                                            className={`absolute right-0 p-3 pr-0 w-[300px] pointer-events-none group-hover:pointer-events-auto overflow-hidden ${
                                                isOpenDropdown
                                                    ? 'opacity-100 translate-y-0'
                                                    : 'opacity-0'
                                            } group-hover:opacity-100 group-hover:block transition-all duration-200 translate-y-[-10px] group-hover:translate-y-0`}
                                        >
                                            <div className="bg-white shadow-lg p-5 rounded-md w-full custom-dropdown">
                                                {cartItems.length === 0 ? (
                                                    <p className="text-lg text-secondary-text">
                                                        Chưa có sản phẩm
                                                    </p>
                                                ) : (
                                                    <div className="max-h-[270px] overflow-y-auto scrollbar-none">
                                                        <div className="flex flex-col gap-3">
                                                            {cartItems.map(
                                                                (item) => (
                                                                    <div
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        className="flex justify-between gap-3"
                                                                    >
                                                                        <div className="flex gap-3">
                                                                            <div className="h-14 w-14">
                                                                                <img
                                                                                    src={
                                                                                        item.image
                                                                                    }
                                                                                    alt=""
                                                                                    className="h-full w-full object-cover"
                                                                                />
                                                                            </div>
                                                                            <div className="flex flex-col">
                                                                                <p className="text-base text-primary leading-tight">
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </p>
                                                                                <p className="text-sm mt-1">
                                                                                    <span>
                                                                                        {
                                                                                            item.quantity
                                                                                        }
                                                                                    </span>{' '}
                                                                                    x{' '}
                                                                                    <span className="font-semibold">
                                                                                        {formatCurrency(
                                                                                            item.price,
                                                                                        )}
                                                                                    </span>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <button
                                                                            onClick={() =>
                                                                                removeFromCart(
                                                                                    Number(
                                                                                        item.id,
                                                                                    ),
                                                                                )
                                                                            }
                                                                        >
                                                                            <CircleX color="gray" />
                                                                        </button>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                <hr className="my-4" />

                                                <div className="flex justify-between mb-2">
                                                    <p className="text-secondary-text">
                                                        Tổng tiền:
                                                    </p>
                                                    <span className="text-xl font-semibold">
                                                        {formatCurrency(
                                                            getItemCartAmount(),
                                                        )}
                                                    </span>
                                                </div>
                                                {/* Group button */}
                                                <div className="flex flex-col gap-2">
                                                    <Button
                                                        to={config.routes.cart}
                                                    >
                                                        Đến giỏ hàng
                                                    </Button>
                                                    <Button
                                                        to={
                                                            config.routes
                                                                .checkout
                                                        }
                                                        className="bg-red-500"
                                                    >
                                                        Thanh toán
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative group">
                                        {user.avatar ? (
                                            <img
                                                src={user.avatar}
                                                alt=""
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <UserAvatar name={user.lastName} />
                                        )}

                                        <DropdownAvatar />
                                    </div>
                                </div>
                            ) : (
                                <div className="text-sm gap-3 md:flex hidden items-center">
                                    <Button
                                        to="/sign-in"
                                        variant="ghost"
                                        className="text-nowrap"
                                    >
                                        Đăng nhập
                                    </Button>
                                    <Button
                                        to={config.routes.signUp}
                                        className="px-3 hover:underline mr-5 text-nowrap"
                                    >
                                        Đăng ký
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Mobile */}
                        <Link
                            to={config.routes.cart}
                            className="relative group md:hidden block"
                        >
                            <div className="relative group">
                                <ShoppingCart className="cursor-pointer" />
                                {totalItemsInCart() > 0 && (
                                    <span className="absolute top-[-10%] right-[-10%] bg-red-500 h-4 w-4 rounded-full flex justify-center items-center text-white text-xs">
                                        {totalItemsInCart()}
                                    </span>
                                )}
                            </div>
                        </Link>

                        <div className="block md:hidden">
                            <MenuIcon
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            />
                            <MobileMenu
                                isOpen={isMenuOpen}
                                onClose={setIsMenuOpen}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
