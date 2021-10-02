const HttpResponse = require('../helpers/http-response');

class CreateProductRouter {
  constructor({ listProductsUseCase } = {}) {
    this.listProductsUseCase = listProductsUseCase;
  }

  async route() {
    try {
      const listProducts = await this.listProductsUseCase.load();

      return HttpResponse.ok(listProducts);
    } catch (error) {
      return HttpResponse.internalError();
    };
  };
};

module.exports = CreateProductRouter;
