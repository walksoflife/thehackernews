const Joi = require("joi");

const email = Joi.string().email().required();
const name = Joi.string().required();
const password = Joi.string().required().min(6);

module.exports = {
  registerValidator: Joi.object({
    name,
    email,
    password,
  }),
};
