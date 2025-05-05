import type { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
    static async signup(req: Request, res: Response): Promise<void> {
      try {
        const { email, password } = req.body;
        await UserService.createUser({ email, password });
        res.status(201).json({ message: "User created successfully" });
      } catch (error) {
        if (error instanceof Error && error.message === "User already exists") {
          res.status(400).json({ message: error.message });
        } else {
          res.status(500).json({ message: "Error creating user" });
        }
      }
    }


    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const { user } = await UserService.login(email, password);
             
            res.status(200).json({ user });
        } catch (error) {
            if (error instanceof Error && error.message === "User not found") {
                res.status(401).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Error logging in" });
            }
        }
    } 
} 