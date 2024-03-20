import whatsAppClient from "@green-api/whatsapp-api-client";
import winston from "winston";
import express, { Request, Response } from 'express';

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
})

const mainInstance :Array<object> = [
    {idInstance : "9903878765", token: "d86433befe084e2398c8040a039d56b6e10cd2066d564f778c"},
    {idInstance : "9903878766", token: "17552f33bcdd4a178465ad000968167350ced97d07a5483bb2"},
]

const restApi = whatsAppClient.restApi({
    idInstance: mainInstance.idInstance,
    apiTokenInstance: mainInstance.token,
});