const express = require('express');
const publisherController = require('../controllers/PublisherController');
const router = express.Router();

// Routes for creating , delete or edit publisher
router.get('/publishers/create', publisherController.createPublisher);
router.post('/publishers/create', publisherController.createPublisherPost);
router.get('/publishers', publisherController.getAllPublishers);
router.get('/publishers/:id', publisherController.getPublisherDetails);
router.get('/publishers/:id/edit', publisherController.editPublisher);
router.post('/publishers/:id/edit', publisherController.editPublisherPost);
router.get('/publishers/:id/delete', publisherController.deletePublisher);
router.post('/publishers/:id/delete', publisherController.deletePublisherPost);

module.exports = router;