const Joi = require('joi')

const output = (message, item) => {
  let data = Joi.array().description('返回数据')
  if (item) {
    data = Joi.array().items(item).description('返回数据')
  }
  const result = {
    '200': {
      body: Joi.object({
        code: Joi.number().description('返回标识'),
        message: Joi.string().description('接口描述'),
        data: data
      }).options({
        allowUnknown: true
      }).description(message)
    }
  }
  return result
}

module.exports = output
