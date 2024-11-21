const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController');

// Route for creating a new event
router.post('/events',  eventController.createEvent);

// Route for getting all events
router.get('/events', eventController.getAllEvents);

// Route for getting an event by ID
router.get('/events/:id', eventController.getEventById);

// Route for updating an event by ID
router.put('/events/:id', eventController.updateEvent);

// Route for deleting an event by ID
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;
