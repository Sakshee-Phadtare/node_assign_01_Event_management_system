const multer = require('multer');
const path = require('path');
const eventModel = require('../models/eventModel');

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './uploads');
  },
  filename: (req, file, callBack) => {
      callBack(null, Date.now() + path.extname(file.originalname)); 
  }
});
const upload = multer({ storage });

// Create a new event
const createEvent = async (req, res) => {
    console.log(req.body);
    
    const { name, description, date_time,location} = req.body;
    console.log('File Path:', req.file?.path); 
    const image_path = req.file ? `/uploads/${req.file.filename}` : null;


    try {
      await eventModel.createEvent({ name, description, date_time, location,image_path });
     return res.status(201).json({ message: 'Event created successfully' });
    } catch (error) {
        console.log(error);
        
      res.status(500).json({ message: 'Error creating event' });
    }
  };
  
  // Get all events
  const getAllEvents = async (req, res) => {
    try {
      const [events] = await eventModel.getAllEvents();
      if(events.length===0)
      {
        res.status(204).json({ message: 'Event list is empty. There is no event added yet.' })
      }
      else{
        res.json(events);
      }
      
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
    const image_path = req.file ? `/uploads/${req.file.filename}` : null;
  
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
    upload,
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
  };
  