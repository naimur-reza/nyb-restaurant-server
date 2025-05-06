
interface Order {
    _id: string;
    userId: string;
    orderDate: Date;
    totalAmount: number;
    status: string;
    items: {
        productId: string;
        quantity: number;
        price: number;
    }[];
}

