const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// show all game genre
const getAllGenres = async () => {
  return await prisma.genre.findMany();
};
// show the game with their id 
const getGenreById = async (id) => {
  try {
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return await prisma.genre.findUnique({
      where: {
        id: numericId
      }
    });
  } catch (error) {
    console.error('Error in getGenreById:', error.message);
    throw error;
  }
};

module.exports = { 
  getAllGenres,
  getGenreById 
};