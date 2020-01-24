const jwt = require('jsonwebtoken');

const accTokExp = '5000m';
const refTokExp = '5m';

class AuthenticationService {
  constructor(accTokSec, refTokSec) {
    this.accTokSec = accTokSec;
    this.refTokSec = refTokSec;
    this.authenticateToken = this.authenticateToken.bind(this);
    this.refreshedToken = this.refreshedToken.bind(this);
    this.generateAccess = this.generateAccess.bind(this);
    this.generateRefresh = this.generateRefresh.bind(this);
  }

  authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    return jwt.verify(token, this.accTokSec, (err) => {
      if (err) return res.status(403).json({ message: 'Token expired!' });
      return next();
    });
  }

  refreshedToken(req, res) {
    const incomingRefreshToken = req.headers.token;
    if (incomingRefreshToken == null) {
      return res.sendStatus(401);
    }
    return jwt.verify(incomingRefreshToken, this.refTokSec, (err, user) => {
      if (err) return res.status(403).json({ message: 'Token expired!' });
      const accessToken = jwt.sign({ userId: user.userId }, this.accTokSec, { expiresIn: `${accTokExp}` });
      const refreshToken = jwt.sign({ userId: user.userId }, this.refTokSec, { expiresIn: `${refTokExp}` });
      return res.json({ accessToken, refreshToken });
    });
  }

  generateAccess(user) {
    return jwt.sign(user, this.accTokSec, { expiresIn: `${accTokExp}` });
  }

  generateRefresh(user) {
    return jwt.sign(user, this.refTokSec, { expiresIn: `${refTokExp}` });
  }

  static getIdFromToken(req) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    return jwt.decode(token).userId;
  }
}

module.exports = AuthenticationService;
