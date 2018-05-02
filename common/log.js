import log4js from 'log4js'

log4js.configure({
  appenders: {
    ruleConsole: { type: 'console' },
    ruleFile: {
      type: 'dateFile',
      filename: 'logs/server-',
      pattern: 'yyyy-MM-dd.log',
      maxLogSize: 10 * 1000 * 1000,
      numBackups: 3,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: '时间:%d{yyyy-MM-dd hh:mm:ss,SSS}%n级别:[%p]%n消息:%m%n------------------------------------'
      }
    }
  },
  categories: {
    default: { appenders: ['ruleConsole', 'ruleFile'], level: 'info' },
    user: { appenders: ['ruleFile'], level: 'all' }
  }
})

const logger = log4js.getLogger('user')

export {
  logger
}
