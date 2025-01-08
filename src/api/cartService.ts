import { CartItem } from '../context/StoreContext';

export type Cart = {
    id: number;
    userId: number;
    items: CartItem[];
};

// Create call api
export const fetchCartByUserId = async (
    userId: number,
): Promise<Cart | null> => {
    const response = await fetch(
        `http://localhost:5001/carts?userId=${userId}`,
    );
    if (!response.ok) throw new Error('Failed to fetch cart');
    const data = await response.json();
    return data.length ? data[0] : null;
};

// Tao gio hang
export const addCart = async (
    userId: number,
    items: CartItem[],
): Promise<Cart> => {
    const response = await fetch('http://localhost:3000/carts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, items }),
    });
    if (!response.ok) throw new Error('Failed to fetch cart');

    return await response.json();
};

// Upload gio hang
export const updateCart = async (
    cartId: any,
    items: CartItem[],
): Promise<Cart> => {
    const response = await fetch(`http://localhost:3000/carts?id=${cartId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId, items }),
    });
    if (!response.ok) throw new Error('Failed to fetch cart');
    return await response.json();
};

// CHECK and save cart
export const saveCart = async (
    userId: number,
    newItems: CartItem[],
): Promise<Cart> => {
    const existingCart = await fetchCartByUserId(userId);
    if (existingCart) {
        const updatedItems = [...existingCart.items, ...newItems];
        return await updateCart(existingCart.id, updatedItems);
    } else {
        return await addCart(userId, newItems);
    }
};
