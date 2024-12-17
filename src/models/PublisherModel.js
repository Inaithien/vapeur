const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// show all publisher
const getAllPublishers = async () => {
    return await prisma.publisher.findMany();
};
// show publisher by their id
const getPublisherById = async (id) => {
    try {
        const numericId = parseInt(id);
        if (isNaN(numericId)) {
            throw new Error('Invalid ID format');
        }
        return await prisma.publisher.findUnique({
            where: {
                id: numericId
            }
        });
    } catch (error) {
        console.error('Error in getPublisherById:', error.message);
        throw error;
    }
};

const createPublisher = async (publisherData) => {
    return await prisma.publisher.create({
        data: {
            name: publisherData.name,
        }
    });
};

const updatePublisher = async (id, publisherData) => {
    return await prisma.publisher.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: publisherData.name,
        }
    });
};

const deletePublisher = async (id) => {
    return await prisma.publisher.delete({
        where: {
            id: parseInt(id)
        }
    });
};

module.exports = {
    getAllPublishers,
    getPublisherById,
    createPublisher,
    updatePublisher,
    deletePublisher
};