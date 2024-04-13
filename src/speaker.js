const utilsFunctions = require('./utils.js')
const utils = new utilsFunctions()
const { Instance, connectDB } = require('./db')
const whatsAppClient = require("@green-api/whatsapp-api-client");

/*
mainInstance: Array < object > [
    { n: {
    _id: 66002c68216663cbda120e6c
    idInstance: "9903878765"
    token: "d86433befe084e2398c8040a039d56b6e10cd2066d564f778c"
    isOnline: true
    wid: "79309994806"
    } }
]

phoneNumber: array ["77059641582", "77059641582"]
 */

const questions = [
    "Какой сегодня день?",
    "Что ты думаешь о технологиях будущего?",
    "Какое твоё любимое блюдо?"
];

async function speaker(mainInstance, phoneNumbers) {
    //TODO: необходимо реализовать отмену отправки если инстанс не онлайн
    for (let instance of mainInstance) {
        const restAPI = whatsAppClient.restAPI({
            idInstance: instance.idInstance,
            apiTokenInstance: instance.token,
        });

        for (let phoneNumber of phoneNumbers) {
            const message = questions[Math.floor(Math.random() * questions.length)];
            const chatId = `${phoneNumber}@c.us`;

            try {
                await restAPI.message.sendMessage(chatId,phoneNumber, message);
                console.log(`Сообщение отправлено на номер ${phoneNumber}`);
            } catch (error) {
                console.error(`Ошибка при отправке сообщения на номер ${phoneNumber}:`, error);
            }
        }
    }
}

module.exports = speaker;