import Joi from 'joi'

const validate = async (params, model, next) => {
  const result = Joi.validate(params, model)
  if (result.error) {
    throw result.error.details[0].message
  } else {
    await next()
  }
}

export {
  validate
}
