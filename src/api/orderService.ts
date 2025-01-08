import { CartItem } from '../context/StoreContext';

export type OrderProps = {
    id: number;
    userId: string;
    items: CartItem[];
    total: number;
    paymentMethod: string;
    address: string;
    date: string;
};

export const submitOrder = async (order: OrderProps) => {
    try {
        const response = await fetch('http://localhost:5001/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
        });

        if (!response.ok) {
            throw new Error(`Failed to submit order: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error submitting order: ', error);
        throw error;
    }
};
