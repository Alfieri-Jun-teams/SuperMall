// import fs from 'fs'
import tracer from 'tracer'

const userLogger = tracer.dailyfile({root: './logs', maxLogFiles: 30, allLogsFileName: 'user'})
const loginLogger = tracer.dailyfile({root: './logs', maxLogFiles: 30, allLogsFileName: 'login'})
const orderLogger = tracer.dailyfile({root: './logs', maxLogFiles: 30, allLogsFileName: 'order'})

export {
  userLogger,
  loginLogger,
  orderLogger
}
