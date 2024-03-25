const winston = require('winston')

class Utils {
  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format((info) => {
          info['json.pool'] = process.env.JSON_POOL // Добавляем ваше поле к каждому логу
          return info
        })(),
        winston.format.json(),
      ),
      defaultMeta: { service: 'number-worm' },
      transports: [
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console(),
      ],
    })

    this.settings = {
      markIncomingMessagesReadedOnReply: 'yes',
      outgoingAPIMessageWebhook: 'yes',
      incomingWebhook: 'yes',
    }
  }
}

module.exports = Utils
