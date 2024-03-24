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
  {
    idInstance: '9903878765',
    token: 'd86433befe084e2398c8040a039d56b6e10cd2066d564f778c',
  },
  {
    idInstance: '9903878766',
    token: '17552f33bcdd4a178465ad000968167350ced97d07a5483bb2',
  },
]

const phoneNumbers = ['77059641582', '77071512603']

async function main() {
  for (let instance of mainInstance) {
    const restAPI = whatsAppClient.restAPI({
      idInstance: instance.idInstance,
      apiTokenInstance: instance.token,
    })

    try {
      initializeInstance(restAPI, instance)
    } catch (error) {
      utilsFunctions.logger.error(error)
      continue
    }
    utilsFunctions.logger.info(`Instance initialize ${instance.idInstance}`)

  }
}

main()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
