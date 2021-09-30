const { MongoClient } = require('mongodb');

module.exports = {
  async connect(url, dbName) {
    this.uri = url;
    this.dbName = dbName;
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this.db = this.client.db(dbName);
  },

  async disconnect() {
    await this.client.close();
  },

  async getDb() {
    if (!this.client || !this.client.topology.isConnected()) {
      await this.connect(this.uri, this.dbName);
    }

    return this.db;
  }
};
