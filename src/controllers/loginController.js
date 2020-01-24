class LoginController {
  constructor(loginService) {
    this.loginService = loginService;
    this.login = this.login.bind(this);
  }

  login(req, res) {
    if (req.body.username && req.body.password) {
      this.loginService.authorizeUser({
        username: req.body.username,
        password: req.body.password,
      }).then(data => res.status(200).json(data))
        .catch(() => res.status(400).json({ message: 'Incorrect Username and/or Password!' }));
    } else {
      res.status(400).json({ message: 'Incorrect Username and/or Password!' })
    }
  }
}

module.exports = LoginController;
