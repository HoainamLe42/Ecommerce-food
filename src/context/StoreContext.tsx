export const API_BASE_URL = 'https://qx6g8d-8080.csb.app';

import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useLocalStorage } from '../hook/useLocalStorage';
import { Product } from '../types/ProductTypes';
import Popup from '../components/Popup';
import config from '../config';

export type CartItem = Product & {
    quantity: number;
};

interface ShoppingCartProviderProps {
    children: ReactNode;
}

interface ShoppingCartContextProps {
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    getItemQuantity: (id: number) => number;
    removeFromCart: (id: number) => void;

    // ======
    fetchProducts: () => void;
    // ====
    foods: Product[];
    featuredProducts: Product[];
    filteredFoods: Product[];
    setFilteredFoods: React.Dispatch<React.SetStateAction<Product[]>>;
    selectedType: string;
    setSelectedType: (type: string) => void;
    selectedValue: string;
    setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    totalItemsInCart: () => number;
    getItemCartAmount: () => number;
    loading: boolean;
}

const ShoppingCartContext = createContext<ShoppingCartContextProps | undefined>(
    undefined,
);

export const useShoppingCart = () => {
    const value = useContext(ShoppingCartContext);
    if (!value)
        throw new Error('useShoppingCart must be used within a FoodProvider');

    return value;
};

export const ShoppingCartProvider = ({
    children,
}: ShoppingCartProviderProps) => {
    const [foods, setFoods] = useState<Product[]>([]);
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        'shopping-cart',
        [],
    );
    const [selectedType, setSelectedType] = useState<string>('All');
    const [filteredFoods, setFilteredFoods] = useState<Product[]>(foods);
    const [selectedValue, setSelectedValue] = useState<string>('all');

    // Get data
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/products`);
                if (!response.ok) {
                    throw new Error(`HTTP lỗi! status: ${response.status}`);
                }
                const data = await response.json();
                setFoods(data);

                // Lọc sản phẩm nổi bật
                const featured = data.slice(0, 15);
                setFeaturedProducts(featured);
            } catch (error) {
                console.error('Lỗi khi tải sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Fetch giỏ hàng khi userId thay đổi
    // const userId = localStorage.getItem('userId');
    // useEffect(() => {
    //     const fetchCart = async () => {
    //         if (userId) {
    //             try {
    //                 const response = await fetch(
    //                     `http://localhost:5001/carts?userid=${userId}`,
    //                 );
    //                 const [cart] = await response.json();
    //                 setCartItems(cart?.items || []);
    //             } catch (error) {
    //                 console.error('Failed to fetch cart: ', error);
    //             }
    //         }
    //     };

    //     fetchCart();
    // }, [userId]);
    // console.log('ID: ', userId);
    // console.log('cartItems: ', cartItems);

    const filterFoods = () => {
        // Tránh thay đổi lại biến khi sắp xếp
        let updatedFoods = foods;

        // 1. Lọc sản phẩm theo loại
        if (selectedType !== 'All') {
            updatedFoods = [...updatedFoods].filter(
                (food) => food.type === selectedType,
            );
        }

        // 2. Lọc sản phẩm theo giá
        if (selectedValue === 'lowToHigh') {
            updatedFoods.sort((a, b) => a.price - b.price);
        } else if (selectedValue === 'highToLow') {
            updatedFoods.sort((a, b) => b.price - a.price);
        }
        setFilteredFoods(updatedFoods);
    };
    // Thực hiện khi giá trị truyền vào thay đổi
    useEffect(() => {
        filterFoods();
    }, [selectedType, foods, selectedValue]);

    // 2. Thêm sản phẩm or tăng số lượng
    const increaseCartQuantity = (productId: number) => {
        // Get useId from localStorage in useAuth()
        const userId = localStorage.getItem('userId');
        if (!userId) {
            const redirect = window.confirm(
                'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng. Đăng nhập ngay?',
            );

            if (redirect) {
                window.location.href = `${config.routes.signIn}`;
            }

            return;
        }

        // Tìm sản phẩm từ danh sách foods
        const food = foods?.find((item) => item.id === productId);
        if (!food) {
            console.error(`Product with ID ${productId} not found`);
            return;
        }

        // Cập nhật giỏ hàng
        setCartItems((currItems) => {
            // Kiểm tra xem sản phẩm đã tồn tại chưa
            const existing = currItems.find((item) => item.id === productId);

            if (!existing) {
                // Nếu sản phẩm chưa có trong giỏ

                return [...currItems, { ...food, quantity: 1 }];
            } else {
                // Nếu sản phẩm đã có, tăng số lượng
                return currItems.map((item) => {
                    if (item.id === productId) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    // 3. Xoá sản phẩm
    const decreaseCartQuantity = (productId: number) => {
        setCartItems((currItems) => {
            if (
                currItems.find((item) => item.id === productId)?.quantity === 1
            ) {
                return cartItems.filter((item) => item.id !== productId);
            } else {
                return currItems.map((item) => {
                    if (item.id === productId) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    // 4. Lấy số lượng của nó
    const getItemQuantity = (id: number) => {
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    };

    // 5. Xoá sản phẩm khỏi cart
    const removeFromCart = (id: number) => {
        setCartItems((currItems) => {
            const updatedItems = currItems.filter((item) => item.id != id);
            // saveCart(Number(localStorage.getItem('userId')), updatedItems);
            return updatedItems;
        });
    };

    // 6. Tổng sản phẩm có trong giỏ
    const totalItemsInCart = () => {
        const cartQuantity = cartItems.reduce(
            (quantity, item) => quantity + item.quantity,
            0,
        );
        return cartQuantity;
    };

    // 8. Tính tổng số tiền
    const getItemCartAmount = () => {
        const totalPrice = cartItems.reduce(
            (totalAmount, item) => totalAmount + item.price * item.quantity,
            0,
        );
        return totalPrice;
    };

    // value
    const value = {
        loading,
        foods,
        featuredProducts,
        filteredFoods,
        setFilteredFoods,
        selectedValue,
        setSelectedValue,
        cartItems,
        setCartItems,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        totalItemsInCart,
        getItemCartAmount,
        selectedType,
        setSelectedType,
        getItemQuantity,
    };
    return (
        <ShoppingCartContext.Provider value={value}>
            {children}
        </ShoppingCartContext.Provider>
    );
};
