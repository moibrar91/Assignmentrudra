const db = require('../config/dbConfig');

class User {
  static async createUser(username, password) {
    const [rows] = await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    return rows.insertId;
  }

  static async getUserByUsername(username) {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }

  
}

module.exports = User;
