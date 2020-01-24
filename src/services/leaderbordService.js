class LeaderboardService {
  constructor(conn) {
    this.conn = conn;
  }

  getPostedTheMost() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT addedById, COUNT(*) FROM shits GROUP BY addedById ORDER BY COUNT(*) DESC;';

      this.conn.query(query, [], (err, rows) => {
        err ? reject(new Error(500)) : resolve(rows);
      });
    });
  }

  getCollectedTheMost() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT removedById, COUNT(*) FROM shits WHERE thereOrNot = 0 GROUP BY removedById ORDER BY COUNT(*) DESC;';

      this.conn.query(query, [], (err, rows) => {
        err ? reject(new Error(500)) : resolve(rows);
      });
    });
  }

  getOldestShit() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM shits WHERE thereOrNot = 1 ORDER BY timestamp DESC LIMIT 10;';

      this.conn.query(query, [], (err, rows) => {
        err ? reject(new Error(500)) : resolve(rows);
      });
    });
  }

  async getData(type) {
    if (type === 'oldest' || 'posted' || 'collected') {
      const oldest = await this.getOldestShit();
      const posted = await this.getPostedTheMost();
      const collected = await this.getCollectedTheMost();

      return new Promise((resolve) => {
        if (type === 'oldest') {
          return resolve(oldest);
        } else if (type === 'posted') {
          return resolve(posted);
        } else if (type === 'collected') {
          return resolve(collected);
        }
      });
    }
    return Promise.reject(new Error(420));
  }
}

module.exports = LeaderboardService;