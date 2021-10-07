class Product {
  constructor(payload) {
    this._id = payload._id;
    this.name = payload.name;
    this.valueUnitary = payload.valueUnitary;
    this.amount = payload.amount;
    this.dateOfLastSale = payload.dateOfLastSale;
    this.updatedAt = payload.updatedAt;
    this.insertedAt = payload.insertedAt;
  };
};

module.exports = Product;
