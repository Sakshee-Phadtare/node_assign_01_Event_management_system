const connection = require('../config/db');

// Get all active events (excluding soft-deleted ones)
const getAllActiveEvents = () => {
  return connection.promise().query(
    'SELECT id, name, description, date_time, location, image_path, created_at, updated_at FROM events WHERE is_deleted = FALSE'
  );
};

// Get an event by ID (excluding soft-deleted ones)
const getEventById = (id) => {
  const query = `SELECT id, name, description, date_time, location, image_path, created_at, updated_at 
                 FROM events 
                 WHERE id = ? AND is_deleted = FALSE`;
  return connection.promise().query(query, [id]);
};


// Create a new event
const createEvent = (event) => {
  const { name, description, date_time, location, image_path } = event;
  return connection.promise().query(
    'INSERT INTO events (name, description, date_time, location, image_path) VALUES (?, ?, ?, ?, ?)',
    [name, description, date_time, location, image_path]
  );
};

// Update an event
const updateEvent = (id, event) => {
  const { name, description, date_time, location, image_path } = event;
  return connection.promise().query(
    `UPDATE events 
     SET name = ?, description = ?, date_time = ?, location = ?, image_path = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [name, description, date_time, location, image_path, id]
  );
};


// Soft delete an event (mark as deleted)
const softDeleteEvent = (id) => {
  return connection.promise().query('UPDATE events SET is_deleted = TRUE WHERE id = ?', [id]);
};

module.exports = {
  getAllActiveEvents,
  getEventById,
  createEvent,
  updateEvent,
  softDeleteEvent,
};
