const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getFeaturedGames = async () => {
  return await prisma.game.findMany({
    where: { featured: true },
    include: { genre: true, publisher: true },
  });
};
// show all game in db
const getAllGames = async () => {
  return await prisma.game.findMany({
    include: { genre: true, publisher: true },
  });
};
// show game using it id
const getGameById = async (id) => {
  try {
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    console.log('Fetching Game with ID:', numericId);
    return await prisma.game.findUnique({
      where: {
        id: numericId
      },
      include: {
        genre: true,
        publisher: true
      }
    });
  } catch (error) {
    console.error('Error in getGameById:', error.message);
    throw error;
  }
};
// show game by their genre 
const getGamesByGenre = async (genreId) => {
  try {
      return await prisma.game.findMany({
          where: {
              genreId: parseInt(genreId)
          },
          include: {
              publisher: true
          }
      });
  } catch (error) {
      console.error('Error in getGamesByGenre:', error.message);
      throw error;
  }
};
// try to fetch 5 games id from 1 to 5 and show in order of alphabet
const getFirstFiveGames = async () => {
  try {
    return await prisma.game.findMany({
      take: 5,
      orderBy: {
        id: 'asc'
      },
      include: {
        genre: true,
        publisher: true
      }
    });
  } catch (error) {
    console.error('Error in getFirstFiveGames:', error.message);
    throw error;
  }
};
// create game
const createGame = async (gameData) => {
  return await prisma.game.create({ data: gameData });
};
// update
const updateGame = async (id, gameData) => {
  return await prisma.game.update({
    where: { id: parseInt(id) },
    data: gameData,
  });
};
// delete
const deleteGame = async (id) => {
  return await prisma.game.delete({ where: { id: parseInt(id) } });
};
// get publisher game in their page
const getGamesByPublisher = async (publisherId) => {
  try {
      return await prisma.game.findMany({
          where: {
              publisherId: parseInt(publisherId)  // This is correct
          },
          include: {
              genre: true
          }
      });
  } catch (error) {
      console.error('Error in getGamesByPublisher:', error.message);
      throw error;
  }
};
// export the function to other file
module.exports = {
  getFeaturedGames,
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  getGamesByGenre,
  getFirstFiveGames,
  getGamesByPublisher  
};