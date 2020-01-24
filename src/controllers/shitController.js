class ShitController {
  constructor(shitService) {
    this.shitService = shitService;
    this.getShits = this.getShits.bind(this)
  }

  getShits(req, res) {
    this.shitService.getAllShits()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(err.message).json(`You made a ${err.message} error`))
  }
}

module.exports = ShitController;