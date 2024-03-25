const utilsFunctions = require('./utils.js')
const utils = new utilsFunctions()
const { Instance, connectDB } = require('./db')

//TODO: возможно стоит обдумать другие настройки

module.exports = async function initializeInstance(restApi, instance) {
  utils.logger.info(
    `Start checking authorization of instance ${instance.idInstance}`,
  )

  try {
    const data = await restApi.instance.getStateInstance()
    utils.logger.info(
      `Instance ${instance.idInstance} is ${data.stateInstance}`,
    )

    //TODO: добавить проверки на другие статусы, например когда не авторизован более - вырезать из бд
    if (data.stateInstance !== 'authorized') {
      utils.logger.error(`Instance ${instance.idInstance} is not online`)
      instance.isOnline = false
      await Instance.findOneAndUpdate(
        { idInstance: instance.idInstance },
        { $set: { isOnline: false } },
      )
      return
    }

    try {
      const settingsResponse = await restApi.settings.setSettings(
        utils.settings,
      )
      utils.logger.info(
        `Instance ${instance.idInstance} save settings is ${settingsResponse.saveSettings}`,
      )
      instance.isOnline = true
      await Instance.findOneAndUpdate(
        { idInstance: instance.idInstance },
        { $set: { isOnline: true } },
      )
    } catch (error) {
      utils.logger.error(
        `Instance ${instance.idInstance} not take settings ${error}`,
      )
    }
  } catch (error) {
    utils.logger.error(
      `Service is broken in checking instance authorization ${error}`,
    )
  }
}
