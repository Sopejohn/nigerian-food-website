"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("./database");
class UserModel {
    static async create(userData) {
        const { name, email, password } = userData;
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        await (0, database_1.dbRun)('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        const user = await this.findByEmail(email);
        if (!user) {
            throw new Error('Failed to create user');
        }
        return user;
    }
    static async findByEmail(email) {
        const user = await (0, database_1.dbGet)('SELECT * FROM users WHERE email = ?', [email]);
        return user;
    }
    static async findById(id) {
        const user = await (0, database_1.dbGet)('SELECT * FROM users WHERE id = ?', [id]);
        return user;
    }
    static async validatePassword(plainPassword, hashedPassword) {
        return await bcryptjs_1.default.compare(plainPassword, hashedPassword);
    }
}
exports.UserModel = UserModel;
