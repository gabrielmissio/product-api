const { MissingParamError } = require('./../../utils/errors');

class GetpaymentConditionsFactory { // TODO: maybe move to a use case class
  async get({ numberOfInstallments, inputValue }) {
    if (!numberOfInstallments) {
      throw new MissingParamError('numberOfInstallments');
    }
    if (!inputValue) {
      throw new MissingParamError('inputValue');
    }

    const selicRateApiResponse = 2.25; // TODO: get value dynamically
    const limitOnInterestFreeInstallments = 6;

    if (numberOfInstallments <= limitOnInterestFreeInstallments) {
      return {
        numberOfInstallments,
        value: inputValue,
        monthlyInterestRate: inputValue / numberOfInstallments
      };
    }

    // todo: increase accuracy
    const interestRate = selicRateApiResponse / 100;
    const interestAmount = inputValue * interestRate * numberOfInstallments;
    const total = inputValue + interestAmount;

    return {
      numberOfInstallments,
      value: total,
      monthlyInterestRate: total / numberOfInstallments
    };
  }
};

module.exports = GetpaymentConditionsFactory;
