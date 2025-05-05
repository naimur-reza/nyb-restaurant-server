import bcrypt from "bcrypt";
import { usersCollection } from "../config/db";
 

export interface UserData {
  email: string;
  password: string;
}

export class UserService {
  static async createUser(userData: UserData) {
    const existingUser = await usersCollection.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await usersCollection.insertOne({ 
      email: userData.email, 
      password: hashedPassword 
    });
  }

 

  static async login (email: string, password: string){
    console.log(email, password);
    const user = await usersCollection.findOne({email});
    console.log(user);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }


    return {user}
  }
} 