import Sequelize from 'sequelize';

import Movie from '../app/models/Movie';

import databaseConfig from '../config/database';

const models = [Movie];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
