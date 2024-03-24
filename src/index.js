const express = require('express')
const { Instance, connectDB } = require('./db')
const cors = require('cors')
require('dotenv').config()
const whatsAppClient = require('@green-api/whatsapp-api-client')
const initializeInstance = require('./initializeInstance.js')
const utilsFunctions = require('./utils.js')

const app = express()
const PORT = 3000
app.use(cors())
const utils = new utilsFunctions()

const mainInstance = [] //для получения и отправки
const phoneNumbers = [] // только для получения

async function loadDb() {
  try {
    const instances = await Instance.find()
    mainInstance.push(...instances) // Это добавит все найденные документы в массив mainInstance
    utils.logger.info('Data loaded from DB:', mainInstance)
  } catch (error) {
    utils.logger.error('Error loading data from DB:', error)
  }
}

//Функция, которая отвечает за первичную работу инстансев, обновляется каждые пол часа ( вдруг пришли новые инстансы )
async function main() {
  for (let instance of mainInstance) {
    const restAPI = whatsAppClient.restAPI({
      idInstance: instance.idInstance,
      apiTokenInstance: instance.token,
    })

    try {
      await initializeInstance(restAPI, instance)
    } catch (error) {
      utils.logger.error(error)
      continue
      //TODO: описать логику пропуска инстанса и логику проверки ответа от сервера ( вдруг все норм, просто сервис упал )
    }
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

connectDB()
  .then(() => {
    utils.logger.info('Connected to MongoDB')
    loadDb().then(() => {
      main().catch((error) => utils.logger.error(error))
      setInterval(() => {
        main().catch((error) => utils.logger.error(error))
      }, 1800000) // Повторяем каждые 30 минут
    })
  })
  .catch((error) =>
      utils.logger.error('Could not connect to MongoDB:', error),
  )
