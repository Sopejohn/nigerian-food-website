import sqlite3 from 'sqlite3';
import { promisify } from 'util';

const db = new sqlite3.Database('./database.sqlite');

// Promisify database methods for async/await
export const dbRun = (sql: string, params: any[] = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

export const dbGet = (sql: string, params: any[] = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const dbAll = (sql: string, params: any[] = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Initialize database tables
export const initDatabase = async () => {
  try {
    // Create users table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default db;
