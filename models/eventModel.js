const connection = require('../config/db');

// Get all events
const getAllEvents = () => {
  return connection.promise().query('SELECT * FROM events');
};

// Get event by ID
const getEventById = (id) => {
  return connection.promise().query('SELECT * FROM events WHERE id = ?', [id]);
};

// Create a new event
const createEvent = (event) => {
  const { name, description, date_time, location, image_path } = event;
  return connection.promise().query(
    'INSERT INTO events (name, description, date_time, location, image_path) VALUES (?, ?, ?, ?,?)',
    [name, description, date_time, location, image_path]
  );
};  

// Update an event
const updateEvent = (id, event) => {
  const { name, description, date_time, location, image_path } = event;
  return connection.promise().query(
    'UPDATE events SET name = ?, description = ?, date_time = ?, location = ?, image_path = ? WHERE id = ?',
    [name, description, date_time, location, image_path, id]
  );
};

// Delete an event
const deleteEvent = (id) => {
  return connection.promise().query('DELETE FROM events WHERE id = ?', [id]);
};

module.exports = { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
