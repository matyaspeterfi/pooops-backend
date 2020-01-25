class RegistrationController {
  constructor(registrationService, mailService) {
    this.registrationService = registrationService;
    this.mailService = mailService;
    this.register = this.register.bind(this);
  }

  register(req, res) {
    this.registrationService.createUser(req.body)
      .then(data => {
        this.mailService.main(req.body.email);
        res.status(200).json(data)})
      .catch(err => res.status(err.message).json(`You made a ${err.message} error`));
  }
}

module.exports = RegistrationController;
