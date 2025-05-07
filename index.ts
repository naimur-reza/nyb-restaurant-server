import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";
import { OrderController } from "./controllers/orderContollers";
import { UserController } from "./controllers/userController";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post("/signup", UserController.signup);
app.post("/login", UserController.login);
app.get("/users", UserController.getAllUsers);
app.delete("/users/:id", UserController.deleteUser);
app.put("/users/:id", UserController.updateUser);

app.get("/orders", OrderController.getAllOrders);
app.post("/orders", OrderController.createOrder);
app.delete("/orders/:id", OrderController.deleteOrder);

// Connect to database and start server
async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
