import Joi from 'joi'

const validate = async (params, model, next) => {
  const result = await Joi.validate(params, model)
  if (!result.error) {
    next()
  } else {
    throw result.error.details[0].message
  }
}

export {
  validate
}
