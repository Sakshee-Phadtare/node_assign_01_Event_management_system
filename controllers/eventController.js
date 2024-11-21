const multer = require('multer');
const path = require('path');
const eventModel = require('../models/eventModel');


// Create a new event
const createEvent = async (req, res) => {
    console.log(req.body);
    
    const { name, description, date_time,location} = req.body;

    try {
      await eventModel.createEvent({ name, description, date_time, location });
     return res.status(201).json({ message: 'Event created successfully' });
    } catch (err) {
        console.log(err);
        
      res.status(500).json({ message: 'Error creating event' });
    }
  };
  
  // Get all events
  const getAllEvents = async (req, res) => {
    try {
      const [events] = await eventModel.getAllEvents();
      res.json(events);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching events' });
    }
  };
  
  // Get a specific event by ID
  const getEventById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [event] = await eventModel.getEventById(id);
      console.log('event.length',event.length)
      if (!event.length) {
         return res.status(404).json({ message: 'Event not found' });
      }
      res.json(event);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching event' });
    }
  };
  
  // Update an event
  const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, description, date_time, location } = req.body;
  
    try {
      await eventModel.updateEvent(id, { name, description, date_time, location, image_path: req.file?.path });
      res.json({ message: 'Event updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error updating event' });
    }
  };
  
  // Delete an event
  const deleteEvent = async (req, res) => {
    const { id } = req.params;
  
    try {
      await eventModel.deleteEvent(id);
      res.json({ message: 'Event deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting event' });
    }
  };
  
  module.exports = {
    // upload,
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
  };
  