const genreModel = require('../models/GenreModel');
const gameModel = require('../models/GameModel');

const getAllGenres = async (req, res) => {
    const genres = await genreModel.getAllGenres();
    res.render('genres', { layout: 'layouts', genres });
};

const getGenreDetails = async (req, res) => {
    try {
        const numericId = parseInt(req.params.id);
        if (isNaN(numericId)) {
            throw new Error('Invalid ID format');
        }
        const genre = await genreModel.getGenreById(numericId);
        const gamesInGenre = await gameModel.getGamesByGenre(numericId);
        
        if (genre) {
            res.render('GenreDetail', { 
                layout: 'layouts',
                genre: genre,
                games: gamesInGenre
            });
        } else {
            res.status(404).send('Genre not found');
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
};
module.exports = {
    getAllGenres,
    getGenreDetails
};