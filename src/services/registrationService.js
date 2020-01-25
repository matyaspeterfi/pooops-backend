class RegistrationService {
  constructor(conn) {
    this.conn = conn;
  }

  emailValidation(input) {
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
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE email = ?;';

      this.conn.query(query, [item.email], (err, row) => {
        err ? reject(new Error(500)) : resolve(row);
      });
    });
  }

  insertUser(item) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (email, password, username) VALUES (?, ?, ?);';
      
      this.conn.query(query, [item.email, item.password, item.username], (err, row) => {
        err ? reject(new Error(500)) : resolve(row.insertId);
      });
    });
  }

  async createUser(item) {
    const userData = await this.containsUser(item);
    return new Promise((resolve, reject) => {
      if (!this.emailValidation(item.email) || !this.checkIfPasswordNumLatinLetter(item.password)) {
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
