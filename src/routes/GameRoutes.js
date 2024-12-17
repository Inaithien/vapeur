/* const express = require('express');

const gameController = require('../controllers/GameController');

module.exports = router; */
const express = require('express');
const gameController = require('../controllers/GameController');
const router = express.Router();
// Routes for showing game 
router.get('/', gameController.getFeaturedGames);
router.get('/games', gameController.getAllGames);
router.get('/', gameController.getHomePage);

// Routes for creating , delete or edit game
router.get('/games/create', gameController.createGame);
router.post('/games/create', gameController.createGamePost);
router.get('/games/:id', gameController.getGameDetails);
router.get('/games/:id/edit', gameController.editGame);
router.post('/games/:id/edit', gameController.editGamePost);
router.get('/games/:id/delete', gameController.deleteGame);
router.post('/games/:id/delete', gameController.deleteGamePost);

module.exports = router;