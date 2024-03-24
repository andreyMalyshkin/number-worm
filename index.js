const whatsAppClient = require("@green-api/whatsapp-api-client");
const winston = require("winston");
const express = require('express');
const cors = require("cors");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: 'number-worm' },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
})

const app = express();
const PORT = 3000;
app.use(cors());

const mainInstance = [
    {idInstance : "9903878765", token: "d86433befe084e2398c8040a039d56b6e10cd2066d564f778c"},
    {idInstance : "9903878766", token: "17552f33bcdd4a178465ad000968167350ced97d07a5483bb2"},
]

const phoneNumbers = [
    "77059641582",
    "77071512603"
]

const settings = {
    markIncomingMessagesReadedOnReply: "yes",
    outgoingAPIMessageWebhook: "yes",
    incomingWebhook: "yes"
}

async function initializeInstance (restApi, instance) {
    logger.info (`Start checking autorization of instance ${instance.idInstance}`)

    restApi.instance.getStateInstance().then((data) => {
        logger.info(`Instance ${instance.idInstance} is ${data.stateInstance}`)
        console.log(data)
    }).catch((error) => {
        logger.error(`Service is broken in checking instance autorization ${error}`)
    })

    restApi.settings.setSettings(settings).then((data) => {
        logger.info (`Instance ${instance.idInstance} save settings is ${data.saveSettings}`)
    }).catch((error) => {
        logger.error(`Instance ${instance.idInstance} not take settings ${error}`)
    })
}

async function main () {
    for (let instance of mainInstance) {
        const restAPI = whatsAppClient.restAPI({
            idInstance: instance.idInstance,
            apiTokenInstance: instance.token,
        });

        try {
            initializeInstance(restAPI, instance)
        }catch (error) {
            logger.error(error)
            continue
        }

        logger.info(`Instance initialize ${instance.idInstance}`)

    }
}

main()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})