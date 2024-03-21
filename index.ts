import whatsAppClient from "@green-api/whatsapp-api-client";
import winston from "winston";
import express, { Request, Response } from 'express';
import cors from "cors"

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: 'number-worm' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
})

const app = express();
const PORT = 3000;
app.use(cors());

interface WhatsAppInstanceInterfaces {
    idInstance: string;
    token: string;
}

const mainInstance : WhatsAppInstanceInterfaces[] = [
    {idInstance : "9903878765", token: "d86433befe084e2398c8040a039d56b6e10cd2066d564f778c"},
    {idInstance : "9903878766", token: "17552f33bcdd4a178465ad000968167350ced97d07a5483bb2"},
]

function main () {
    for (let instance of mainInstance) {
        const restApi = whatsAppClient.restApi({
            idInstance: instance.idInstance,
            apiTokenInstance: instance.token,
        });

        logger.info(`Instance initialize ${instance.idInstance}`)

    }
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})