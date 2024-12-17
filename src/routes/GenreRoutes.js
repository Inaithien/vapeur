const express = require('express');
const genreController = require('../controllers/GenreController');
const router = express.Router();

router.get('/genres', genreController.getAllGenres);
router.get('/genres/:id', genreController.getGenreDetails);

module.exports = router;