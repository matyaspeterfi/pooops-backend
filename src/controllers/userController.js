class UserController {
  constructor(userService, getIdFromToken) {
    this.userService = userService;
    this.getProfile = this.getProfile.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.getIdFromToken = getIdFromToken;
  }

  getProfile(req, res) {
    this.userService.getUserData(this.getIdFromToken(req))
      .then(data => res.status(200).json(data))
      .catch(err => res.status(err.message).json(`You made a ${err.message} error`));
  }

  updateUsername(req, res) {
    if (!req.headers.nickname) return res.status(400).json('You made a 400 error');
    this.userService.setNewUsername(this.getIdFromToken(req), req.headers.nickname)
      .then(data => res.status(200).json(data))
      .catch(err => {
        const errorResponse = {
          400: 'Username already in use',
          500: 'Unknown error, please try again later',
        };
        res.status(err.message).json(errorResponse[err.message]);
      })
  }
}

module.exports = UserController;