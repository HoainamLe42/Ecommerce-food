export type Items = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
};

export type OrderDetails = {
    orderId: number;
    items: Items[];
    address: string;
    total: number;
    date: string;
};

export type Order = {
    id: number;
    userId: string;
    customerName: string;
    items: Items[];
    paymentMethod: string;
    date: string;
    total: number;
    status: 'Pending' | 'Delivered' | 'Cancelled';
};
