class LoginController {
  constructor(loginService) {
    this.loginService = loginService;
    this.login = this.login.bind(this);
  }

  login(req, res) {
    if (req.body.email && req.body.password) {
      this.loginService.authorizeUser({
        email: req.body.email,
        password: req.body.password,
      }).then(data => res.status(200).json(data))
        .catch(() => res.status(400).json({ message: 'Incorrect email and/or Password!' }));
    } else {
      res.status(400).json({ message: 'Incorrect email and/or Password!' })
    }
  }
}

module.exports = LoginController;
