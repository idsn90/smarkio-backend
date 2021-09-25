import * as Yup from 'yup';

import Movie from '../models/Movie';
import axiosConfig from '../../config/axios';

class MoviesController {
  async store(req, res) {
    const schemaValidation = Yup.object().shape({
      title: Yup.string().required(),
      overview: Yup.string().required(),
      release_date: Yup.string().required(),
      url: Yup.string().required(),
    });

    if (!(await schemaValidation.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const movieAlreadyExists = await Movie.findOne({
      where: { title: req.body.title },
    });

    if (movieAlreadyExists) {
      return res.json({ message: 'Movie already exists in database.' });
    }

    const movie = await Movie.create(req.body);
    return res.json(movie);
  }

  async index(req, res) {
    const { title, page = 1, type = 'tmdb' } = req.query;

    if (type === 'top') {
      const response = await Movie.findAll({});

      res.json(response);
    }

    const {
      data: { results },
    } = await axiosConfig().get('/search/movie', {
      params: {
        api_key: process.env.TMDB_KEY,
        language: 'pt-BR',
        query: title,
        page,
      },
    });

    const formattedResults = results.map(item => ({
      title: item.title,
      overview: item.overview,
      release_date: item.release_date,
      url: item.poster_path
        ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}`
        : 'https://static.thenounproject.com/png/340719-200.png',
    }));

    return res.json(formattedResults);
  }
}

export default new MoviesController();
