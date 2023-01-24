import Joi = require('joi');

export const isToken = Joi.string().required().min(16);

export const isEmail = Joi.string().required();

export const isUser = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const isLevel = Joi.number().required().min(1).messages({
  'number.base': '"level" must be a number',
  'any.required': '"level" is required',
  'number.min': '"level" must be greater than or equal to 1',
});
