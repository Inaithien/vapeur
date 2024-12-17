const gameModel = require('../models/GameModel');
const genreModel = require('../models/GenreModel');
const publisherModel = require('../models/PublisherModel');

const getFeaturedGames = async (req, res) => {
  const featuredGames = await gameModel.getFeaturedGames();
  res.render('home', { layout: 'layouts', featuredGames });
};
// show all game 
const getAllGames = async (req, res) => {
  const games = await gameModel.getAllGames();
  res.render('games', { layout: 'layouts', games });
};
// show detail of a game by id
const getGameDetails = async (req, res) => {
  try {
    const idRaw = req.params.id?.trim();
    console.log('Raw ID from params:', idRaw);

    const id = parseInt(idRaw, 10);
    if (isNaN(id) || id <= 0) {
      return res.status(400).send('Invalid game ID');
    }

    const game = await gameModel.getGameById(id);
    // render the game into detail page
    if (game) {
      res.render('GameDetail', { layout: 'layouts', game });
    } else {
      res.status(404).send('Game not found');
    }
  } catch (error) {
    console.error('Error in getGameDetails:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

const createGame = async (req, res) => {
  const genres = await genreModel.getAllGenres();
  const publishers = await publisherModel.getAllPublishers();
  res.render('CreateGame', { layout: 'layouts', genres, publishers });
};

const createGamePost = async (req, res) => {
  const { title, description, releaseDate, genreId, publisherId, featured } = req.body;
  await gameModel.createGame({
    title,
    description,
    releaseDate: new Date(releaseDate),
    genreId: parseInt(genreId),
    publisherId: parseInt(publisherId),
    featured: featured === 'true',
  });
  res.redirect('/games');
};

const getHomePage = async (req, res) => {
  try {
    const featuredGames = await gameModel.getFirstFiveGames();
    res.render('home', { layout: 'layouts', featuredGames });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

const editGame = async (req, res) => {
  const game = await gameModel.getGameById(req.params.id);
  const genres = await genreModel.getAllGenres();
  const publishers = await publisherModel.getAllPublishers();

  if (game) {
    res.render('editGame', { layout: 'layouts', game, genres, publishers });
  } else {
    res.status(404).send('Game not found');
  }
};

const editGamePost = async (req, res) => {
  const { title, description, releaseDate, genreId, publisherId, featured } = req.body;
  await gameModel.updateGame(req.params.id, {
    title,
    description,
    releaseDate: new Date(releaseDate),
    genreId: parseInt(genreId),
    publisherId: parseInt(publisherId),
    featured: featured === 'true',
  });
  res.redirect('/games');
};

const deleteGame = async (req, res) => {
  const game = await gameModel.getGameById(req.params.id);
  if (game) {
    res.render('deleteGame', { layout: 'layouts', gameId: game.id, gameTitle: game.title });
  } else {
    res.status(404).send('Game not found');
  }
};

const deleteGamePost = async (req, res) => {
  await gameModel.deleteGame(req.params.id);
  res.redirect('/games');
};

module.exports = {
  getFeaturedGames,
  getAllGames,
  getGameDetails,
  createGame,
  createGamePost,
  editGame,
  editGamePost,
  deleteGame,
  deleteGamePost,
  getHomePage
};