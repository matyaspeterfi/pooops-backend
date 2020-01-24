class UserController {
  constructor(userService, getIdFromToken) {
    this.userService = userService;
    this.getProfile = this.getProfile.bind(this);
    this.getIdFromToken = getIdFromToken;
  }

  getProfile(req, res) {
    this.userService.getUserData(this.getIdFromToken(req))
      .then(data => res.status(200).json(data))
      .catch(err => res.status(err.message).json(`You made a ${err.message} error`));
  }
}

module.exports = UserController;