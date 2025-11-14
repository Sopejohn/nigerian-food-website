import bcrypt from 'bcryptjs';
import { dbGet, dbRun } from './database';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export class UserModel {
  static async create(userData: CreateUserData): Promise<User> {
    const { name, email, password } = userData;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await dbRun(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    
    const user = await this.findByEmail(email);
    if (!user) {
      throw new Error('Failed to create user');
    }
    
    return user;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const user = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    return user as User | null;
  }

  static async findById(id: number): Promise<User | null> {
    const user = await dbGet('SELECT * FROM users WHERE id = ?', [id]);
    return user as User | null;
  }

  static async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
