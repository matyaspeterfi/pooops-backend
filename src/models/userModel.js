class UserModel {
  constructor(id, shitsReported, shitsRemoved, username) {
    this.id = id;
    this.username = username || `User ${id}`;
    this.shitsReported = shitsReported;
    this.shitsRemoved = shitsRemoved;
  }
}

module.exports = UserModel;
