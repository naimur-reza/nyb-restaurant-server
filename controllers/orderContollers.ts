import type { Request, Response } from "express";
import { OrderService } from "../services/orderService";

export class OrderController {
  static async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      await OrderService.createOrder(data);
      res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
      if (error instanceof Error && error.message === "Order already exists") {
        res.status(500).json({ message: "Error creating order" });
      }
    }
  }

  static async signup(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      await OrderService.createOrder(data);
      res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
      if (error instanceof Error && error.message === "Order already exists") {
        res.status(500).json({ message: "Error creating order" });
      }
    }
  }

  static async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders" });
    }
  }

  static async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Order ID is required" });
        return;
      }
      await OrderService.deleteOrder(id);
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting order" });
    }
  }
}
