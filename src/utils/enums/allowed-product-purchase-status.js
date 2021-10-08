const { APPROVED, CANCEL_PURCHASE_WITH_APPROVED_STATUS, WAITING_CONFIRMATION } = require('./product-purchase-status');

const allowedProductPurchaseStatus = [
  APPROVED,
  WAITING_CONFIRMATION,
  CANCEL_PURCHASE_WITH_APPROVED_STATUS
];

module.exports = Object.freeze(allowedProductPurchaseStatus);
