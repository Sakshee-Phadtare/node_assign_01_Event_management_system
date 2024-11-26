const express = require('express');
const router = express.Router();  
const eventController = require('../controllers/eventController');
const { upload } = eventController; 


// Route for creating a new event
router.post('/events/createEvent', (req, res, next) => {
    upload.single('file')(req, res, (err) => {
      if (err) {
        // Handle Multer error
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  }, eventController.createEvent);

// Route for getting all events
router.get('/events/getEvents', eventController.getAllEvents);

// Route for getting an event by ID
router.get('/events/getEventById/:id', eventController.getEventById);

// Route for updating an event by ID
router.put('/events/updateEventById/:id', (req, res, next) => {
    upload.single('file')(req, res, (err) => {
      if (err) {
        // Handle Multer error
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  }, eventController.updateEvent);

// Route for deleting an event by ID
router.delete('/events/deleteEvent/:id', eventController.deleteEvent);

module.exports = router;
