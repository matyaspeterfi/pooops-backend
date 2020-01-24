class RegistrationService {
  constructor(conn) {
    this.conn = conn;
  }

  checkIfUserNameNumLatinLetters(input) {
    const user = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (input && user.test(input)) return true;
    return false;
  }

  checkIfPasswordNumLatinLetter(input) {
    const passw = /^[A-Za-z0-9]\w{7,}$/;
    if (input && passw.test(input)) return true;
    return false;
  }

  containsUser(item) {
    return new Promise((resolve) => {
      const query = 'SELECT * FROM users WHERE username = ?;';

      this.conn.query(query, [item.username], (err, row) => {
        err ? reject(new Error(500)) : resolve(row);
      });
    });
  }

  insertUser(item) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (username, password) VALUES (?, ?);';
      
      this.conn.query(query, [item.username, item.password], (err, row) => {
        err ? reject(new Error(500)) : resolve(row.insertId);
      });
    });
  }

  async createUser(item) {
    const userData = await this.containsUser(item);
    return new Promise((resolve, reject) => {
      if (!this.checkIfUserNameNumLatinLetters(item.username) || !this.checkIfPasswordNumLatinLetter(item.password)) {
        reject(new Error(400));
      } else if (item.password !== item.confirmPsw) {
        reject(new Error(400));
      } else if (!userData.length) {
        resolve(this.insertUser(item));
      } else {
        reject(new Error(400));
      }
    });
  }
}

module.exports = RegistrationService;
