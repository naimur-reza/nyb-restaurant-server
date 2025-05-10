import { ordersCollection } from "../config/db";
import type { TOrder } from "../types/order-type";
 
export class OrderService {
  static async createOrder(orderData: TOrder) {
    const order = await ordersCollection.insertOne(orderData);
    return order;
  }

  static async getAllOrders() {
    const orders = await ordersCollection.find({}).toArray();
    return orders;
  }

  static async deleteOrder(orderId: string) {
    const result = await ordersCollection.deleteOne({ orderId });
    if (result.deletedCount === 0) {
      throw new Error("Order not found");
    }
    return result;
  }
}
