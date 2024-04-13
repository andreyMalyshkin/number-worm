const mongoose = require('mongoose')
require('dotenv').config() // Убедитесь, что переменные окружения загружены
const utilsFunctions = require('./utils.js')
const utils = new utilsFunctions()

//TODO: расширить данные для работы с бд
const instanceSchema = new mongoose.Schema({
  idInstance: String,
  token: String,
  isOnline: Boolean,
  wid: String,
})

const Instance = mongoose.model('Instance', instanceSchema, 'instancesData')

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    utils.logger.info('MongoDB has been connected');
    return true;
  } catch (error) {
    utils.logger.error('Error connecting to MongoDB:', error);
    utils.logger.info('Attempting to reconnect to MongoDB');
    return false;
    setTimeout(connectDB(),60000);
  }
}

module.exports = { Instance, connectDB }
