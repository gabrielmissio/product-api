class ListProductsUsecase {
  constructor({ listProductsRepository } = {}) {
    this.listProductsRepository = listProductsRepository;
  };

  async load() {
    return this.listProductsRepository.load();
  };
};

module.exports = ListProductsUsecase;
