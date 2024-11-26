const { ERROR_MESSAGES, SUCCESS_MESSAGES, STATUS_CODES } = require('../constants');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const eventModel = require('../models/eventModel');
const schema = require('../inputValidation');
const streamifier = require('streamifier');
const { promisify } = require('util');

//destructuring
const{CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET } = process.env

// Cloudinary Configuration
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// File filter to allow only .png and .jpg files
const fileFilter = async(req, file, callBack) => {
  const allowedFileTypes = ['.png', '.jpg'];
  const extname = path.extname(file.originalname).toLowerCase();  

  if (allowedFileTypes.includes(extname)) {
    callBack(null, true); 
  } else {
    callBack(new Error(ERROR_MESSAGES.FILE_TYPE_ERROR), false);
  }
};

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5000 * 1024 * 1024 },
  fileFilter,
});

// Function for validating inputs
const validateInput = (data) => {
  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    return error.details.map((detail) => detail.message);
  }
  return null;
};

// Function to upload file buffer to Cloudinary
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        return reject(new Error(ERROR_MESSAGES.UPLOAD_ERROR));
      }
      resolve(result.secure_url);
    });

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });



// Create a new event
const createEvent = async (req, res) => {
  try {
    const { name, description, date_time, location } = req.body;

    // Validate inputs
    const validationErrors = validateInput({ name, date_time, location });
    if (validationErrors) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ errors: validationErrors });
    }

    let image_path = null;
    if (req.file) {
      image_path = await uploadToCloudinary(req.file.buffer);
    }

    await eventModel.createEvent({ name, description, date_time, location, image_path });
    return res
      .status(STATUS_CODES.CREATED)
      .json({ message: SUCCESS_MESSAGES.EVENT_CREATED });
  } catch (error) {
    console.error(error);
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: ERROR_MESSAGES.CREATE_EVENT_ERROR });
  }
};

// Fetch all active events (not deleted)
const getAllEvents = async (req, res) => {
  try {
    const [events] = await eventModel.getAllActiveEvents();
    if (!events.length) {
      return res
        .status(STATUS_CODES.NO_CONTENT)
        .json({ message: ERROR_MESSAGES.EVENT_LIST_EMPTY });
    }
    res.status(STATUS_CODES.SUCCESS).json(events);
  } catch (err) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: ERROR_MESSAGES.FETCH_ERROR });
  }
};

// Get a specific event by ID
const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const [event] = await eventModel.getEventById(id);
    if (!event.length) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.EVENT_NOT_FOUND });
    }
    res.status(STATUS_CODES.SUCCESS).json(event);
  } catch (err) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: ERROR_MESSAGES.FETCH_ERROR });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, description, date_time, location } = req.body;

  // Validate inputs
  const validationErrors = validateInput({ name, date_time, location });
  if (validationErrors) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ errors: validationErrors });
  }

  let image_path = null;
  if (req.file) {
    image_path = await uploadToCloudinary(req.file.buffer);
  }

  try {
    const [event] = await eventModel.getEventById(id);
    if (!event.length) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.EVENT_NOT_FOUND });
    }

    await eventModel.updateEvent(id, { name, description, date_time, location, image_path });
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: SUCCESS_MESSAGES.EVENT_UPDATED });
  } catch (err) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: ERROR_MESSAGES.UPDATE_EVENT_ERROR });
  }
};

// Soft delete an event
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const [event] = await eventModel.getEventById(id);

    if (!event.length) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.EVENT_NOT_FOUND });
    }

    // Mark the event as deleted
    await eventModel.softDeleteEvent(id);
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: SUCCESS_MESSAGES.EVENT_DELETED });
  } catch (err) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: ERROR_MESSAGES.DELETE_EVENT_ERROR });
  }
};

module.exports = {
  upload,
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
