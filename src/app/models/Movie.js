import Sequelize, { Model } from 'sequelize';

class Movie extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        overview: Sequelize.STRING,
        release_date: Sequelize.STRING,
        url: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
export default Movie;
