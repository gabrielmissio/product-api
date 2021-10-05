class ProductPurchase {
  constructor(payload) {
    this._id = payload._id;
    this.product = payload.product;
    this.paymentCondition = payload.paymentCondition;
    this.status = payload.status;
    this.saleValue = payload.saleValue;
    this.updatedAt = payload.updatedAt;
    this.insertedAt = payload.insertedAt;
  };
};

module.exports = ProductPurchase;
