const Joi = require('joi');

const schema = Joi.object().keys({
    name : Joi.string().alphanum().min(3).max(30).required(),
    date_time: Joi.date().greater('now').required(),
    location: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')).max(40).required()
});

module.exports = schema;