const ShitModel = require('../models/shitModel')
class ShitService {
  constructor(conn) {
    this.conn = conn;
  }

  getAllShits() { // later: not all, just around specific coordinates
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM shits WHERE thereOrNot = 1;'

      this.conn.query(query, [], (err, rows) => {
        err ? reject(new Error(500)) : resolve(rows)
      });
    });
  }

  postNewShit(shit, userId) {
    shit.addedById = userId;
    const newShit = new ShitModel(shit)
    return new Promise((resolve, reject) => {
      const now = Math.floor(new Date() / 1000);
      const query = 'INSERT INTO shits (`type`, `addedById`, `timestamp`, `lat`, `long`, `name`) VALUES (?, ?, ?, ?, ?, ?);';
      this.conn.query(query, [newShit.type, newShit.addedById, now, newShit.lat, newShit.long, newShit.name], (err, row) => {
        if (err) return reject(new Error(500));
        newShit.timestamp = now;
        newShit.id = row.insertId;
        return resolve(newShit)
      });
    });
  }

  checkIfShitStillThere(shitId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM shits WHERE id = ?;';
      this.conn.query(query, [shitId], (err, row) => {
        if (err) return reject(new Error(500));
        return resolve(row[0].thereOrNot);
      });
    })
  }

  async removeShit(shitId, userId) {
    const check = await this.checkIfShitStillThere(shitId);

    return new Promise((resolve, reject) => {
    if (check === 0) return reject(new Error(410)); // 410: gone - shit already gone?
      const query = 'UPDATE shits SET thereOrNot = 0, removedById = ? WHERE id = ?;';

      this.conn.query(query, [userId, shitId], (err) => {
        err ? reject(new Error(500)) : resolve('ok')
      });
    });
  }
}

module.exports = ShitService