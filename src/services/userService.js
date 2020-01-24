const UserModel = require('../models/userModel');

class UserService {
  constructor(conn) {
    this.conn = conn;
  }

  getUserData(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT username FROM users WHERE id = ?; SELECT * FROM shits WHERE addedById = ?; SELECT * FROM shits WHERE removedById = ?;';

      this.conn.query(query, [userId, userId, userId], (err, row) => {
        if (err) return reject(new Error(500));
        return resolve(new UserModel(userId, row[1].length, row[2].length, row[0][0].username));
      })
    })
  }

  checkIfUsernameExists(username) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE username = ?';

      this.conn.query(query, [username], (err, row) => {
        if (err) return reject(new Error(500));
        return resolve(row.length);
      })
    })
  }

  async setNewUsername(userId, newUsername) {
    const check = await this.checkIfUsernameExists(newUsername);

    return new Promise((resolve, reject) => {
      if (check) return reject(new Error(400));
      const query = 'UPDATE users SET username = ? WHERE id = ?;';

      this.conn.query(query, [newUsername, userId], (err, row) => {
        if (err) return reject(new Error(500));
        return resolve('Username successfully updated');
      })
    })
  }
}

module.exports = UserService;