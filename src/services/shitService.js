class ShitService {
  constructor(conn) {
    this.conn = conn;
  }

  getAllShits() { // later: not all, just around specific coordinates
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM shits;'

      this.conn.query(query, [], (err, rows) => {
        err ? reject(new Error(500)) : resolve(rows)
      });
    });
  }


}

module.exports = ShitService