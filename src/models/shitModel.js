class ShitModel {
  constructor(shit) {
    this.id = shit.id;
    this.thereOrNot = shit.thereOrNot || 1;
    this.type = shit.type;
    this.addedById = shit.addedById;
    this.removedById = shit.removedById || 0;
    this.timestamp = shit.timestamp || Math.floor(new Date() / 1000);
    this.lat = parseFloat(shit.lat.toFixed(8));
    this.long = parseFloat(shit.long.toFixed(8));
    this.name = shit.name || 'the best shit ever';
  }
}

module.exports = ShitModel;
