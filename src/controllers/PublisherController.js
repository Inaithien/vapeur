const publisherModel = require('../models/PublisherModel');
const gameModel = require('../models/GameModel'); 
const getAllPublishers = async (req, res) => {
    const publishers = await publisherModel.getAllPublishers();
    res.render('publishers', { layout: 'layouts', publishers });
};

const getPublisherDetails = async (req, res) => {
    try {
        const numericId = parseInt(req.params.id);
        if (isNaN(numericId)) {
            throw new Error('Invalid ID format');
        }
        const publisher = await publisherModel.getPublisherById(numericId);
        const publisherGames = await gameModel.getGamesByPublisher(numericId);

        if (publisher) {
            res.render('PublisherDetail', { layout: 'layouts', publisher });
        } else {
            res.status(404).send('Publisher not found');
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

const createPublisher = async (req, res) => {
    res.render('CreatePublisher', { layout: 'layouts' });
};

const createPublisherPost = async (req, res) => {
    const { name } = req.body;
    await publisherModel.createPublisher({ name });
    res.redirect('/publishers');
};

const deletePublisher = async (req, res) => {
    const publisher = await publisherModel.getPublisherById(req.params.id);
    if (publisher) {
        res.render('deletePublisher', { layout: 'layouts', publisherId: publisher.id, publisherName: publisher.name });
    } else {
        res.status(404).send('Publisher not found');
    }
};

const deletePublisherPost = async (req, res) => {
    await publisherModel.deletePublisher(req.params.id);
    res.redirect('/publishers');
};

const editPublisher = async (req, res) => {
    const publisher = await publisherModel.getPublisherById(req.params.id);
    if (publisher) {
        res.render('EditPublisher', { layout: 'layouts', publisher });
    } else {
        res.status(404).send('Publisher not found');
    }
};

const editPublisherPost = async (req, res) => {
    const { name, country } = req.body;
    await publisherModel.updatePublisher(req.params.id, { name, country });
    res.redirect('/publishers');
};
module.exports = {
    getAllPublishers,
    getPublisherDetails,
    createPublisher,
    createPublisherPost,
    deletePublisher,
    deletePublisherPost,
    editPublisher,
    editPublisherPost
};