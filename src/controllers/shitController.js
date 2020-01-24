class ShitController {
  constructor(shitService, getIdFromToken) {
    this.shitService = shitService;
    this.getShits = this.getShits.bind(this);
    this.postShit = this.postShit.bind(this);
    this.getIdFromToken = getIdFromToken;
  }

  getShits(req, res) {
    this.shitService.getAllShits()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(err.message).json(`You made a ${err.message} error`))
  }

  postShit(req, res) {
    this.shitService.postNewShit(req.body.shit, this.getIdFromToken(req))
      .then(data => res.status(200).json(data))
      .catch(err => res.status(err.message).json(`You made a ${err.message} error`))
  }
}

module.exports = ShitController;