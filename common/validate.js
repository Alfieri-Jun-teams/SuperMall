import Joi from 'joi'
import Enjoi from 'enjoi'

const validate = async (params, model) => {
  const schema = Enjoi(model)
  const result = await Joi.validate(params, schema)
  if (result.error) {
    throw result.error.details[0].message
  }
}

export {
  validate
}
