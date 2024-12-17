// Import the Prisma Client from the correct location
const { PrismaClient } = require('@prisma/client'); // Correct import
const prisma = new PrismaClient();

async function main() {
  // Insert Publishers
  const fromSoftware = await prisma.publisher.create({
    data: {
      name: 'From Software',
    },
  });

  const valve = await prisma.publisher.create({
    data: {
      name: 'Valve',
    },
  });

  const lariansStudio = await prisma.publisher.create({
    data: {
      name: "Larian's Studio",
    },
  });

  // Insert Genres
  const action = await prisma.genre.create({
    data: {
      name: 'Action',
    },
  });

  const adventure = await prisma.genre.create({
    data: {
      name: 'Adventure',
    },
  });

  const turnBase = await prisma.genre.create({
    data: {
      name: 'Turn-based',
    },
  });

  // Insert Games
  await prisma.game.create({
    data: {
      title: 'Elden Ring',
      description: 'An action RPG game developed by From Software.',
      releaseDate: new Date('2022-02-25'),
      genreId: action.id,      // Set the genre to Action
      publisherId: fromSoftware.id,  // Set the publisher to From Software
    },
  });

  await prisma.game.create({
    data: {
      title: 'Baldur\'s Gate 3',
      description: 'An adventure RPG game developed by Larian\'s Studio.',
      releaseDate: new Date('2023-08-03'),
      genreId: adventure.id,      // Set the genre to Adventure
      publisherId: lariansStudio.id,  // Set the publisher to Larian's Studio
    },
  });

  await prisma.game.create({
    data: {
      title: 'Pokémon Sword',
      description: 'A turn-based RPG game developed by Game Freak and published by Nintendo.',
      releaseDate: new Date('2019-11-15'),
      genreId: turnBase.id,      // Set the genre to Turn-based
      publisherId: valve.id,  // Set the publisher to Valve (you can change this if the publisher is wrong)
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });