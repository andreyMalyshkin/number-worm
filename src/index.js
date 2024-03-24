const express = require('express')
const cors = require('cors')
const whatsAppClient = require('@green-api/whatsapp-api-client')
const initializeInstance = require('./initializeInstance.js')
const utils = require('./utils.js')

const app = express()
const PORT = 3000
app.use(cors())
const utilsFunctions = new utils()

const mainInstance = [
  //TODO: расширить объекты инстансов, держать флаги и номера
  {
    idInstance: '9903878765',
    token: 'd86433befe084e2398c8040a039d56b6e10cd2066d564f778c',
    isOnline: false,
  },
  {
    idInstance: '9903878766',
    token: '17552f33bcdd4a178465ad000968167350ced97d07a5483bb2',
    isOnline: false,
  },
]

const phoneNumbers = ['77059641582', '77071512603']

//Функция, которая отвечает за первичную работу инстансев, обновляется каждые пол часа ( вдруг пришли новые инстансы )
async function main() {
  //TODO: когда будет бд, сделать инициализацию бд и выгрузку в локальные переменные данных о инстансах и номерах
  for (let instance of mainInstance) {
    const restAPI = whatsAppClient.restAPI({
      idInstance: instance.idInstance,
      apiTokenInstance: instance.token,
    })

    try {
      await initializeInstance(restAPI, instance)
    } catch (error) {
      utilsFunctions.logger.error(error)
      continue
      //TODO: описать логику пропуска инстанса и логику проверки ответа от сервера ( вдруг все норм, просто сервис упал )
    }
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

main().catch((error) => utilsFunctions.logger.error(error))
setInterval(() => {
  main().catch((error) => utilsFunctions.logger.error(error))
}, 1800000)
