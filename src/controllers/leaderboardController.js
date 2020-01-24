class LeaderboardController {
  constructor(leaderboardService) {
    this.leaderboardService = leaderboardService;
    this.getLeaderboardData = this.getLeaderboardData.bind(this);
  }

  getLeaderboardData(req, res) {
    this.leaderboardService.getData(req.headers.type)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(err.message).json(`You made a ${err.message} error`));
  }
}

module.exports = LeaderboardController;