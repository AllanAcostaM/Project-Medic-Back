import joi, { ObjectSchema } from 'joi';

const medicLoginSchema: ObjectSchema = joi.object().keys({
  username: joi.string().required().min(4).max(10).messages({
    'string.base': 'Username must be of type string',
    'string.min': 'Invalid username',
    'string.max': 'Invalid username',
    'string.empty': 'Username must not be empty'
  }),
  password: joi.string().alphanum().required().min(4).max(9).messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Password invalid',
    'string.max': 'Password invalid',
    'string.empty': 'Password must not be empty'
  })
});

export { medicLoginSchema };
