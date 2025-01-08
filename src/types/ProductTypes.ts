export type Product = {
    id: number;
    name: string;
    price: number;
    image?: string;
    type?: string;
    rating?: number;
};

export type Category = {
    id: number;
    name: string;
    type: string;
    image: string;
};
