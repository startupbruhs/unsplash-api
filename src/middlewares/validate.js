/**
 * Body validator middleware
 * Automatically returns 400 error if specified schema is not valid.
 *
 * docs: https://hapi.dev/family/joi/?v=15.1.1
 * usage:
 * router.post('/some/route', validate({
 *  name: joi.string().required().default('agroni'),
 *  email: joi.string().email(),
 *  ...
 * }), (req, res) => {
 *  // handle route here
 * })
 */

const joi = require("joi");

const validate = schema => (request, response, next) => {
  const { error, value } = joi.validate(request.body, schema);
  if (error) {
    response.status(400).send(error);
    return;
  }
  request.validatedBody = value; // validated body will have defaults if specified in the schema
  next();
};

module.exports = validate;
