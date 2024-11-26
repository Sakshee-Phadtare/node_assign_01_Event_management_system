const ERROR_MESSAGES = {
    VALIDATION_ERROR: 'Invalid input data',
    UPLOAD_ERROR: 'File upload failed',
    FILE_TYPE_ERROR: 'Only .png, .jpg file types are allowed!',
    EVENT_NOT_FOUND: 'Event not found',
    FETCH_ERROR: 'Error fetching events',
    CREATE_EVENT_ERROR: 'Error creating event',
    UPDATE_EVENT_ERROR: 'Error updating event',
    DELETE_EVENT_ERROR: 'Error deleting event',
    EVENT_LIST_EMPTY: 'Event list is empty. There is no event added yet.',
  };
  
  const SUCCESS_MESSAGES = {
    EVENT_CREATED: 'Event created successfully',
    EVENT_UPDATED: 'Event updated successfully',
    EVENT_DELETED: 'Event deleted successfully',
  };
  
  const STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  };
  
  module.exports = {
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    STATUS_CODES,
  };
  