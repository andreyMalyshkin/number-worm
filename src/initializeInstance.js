const utilsFunctions = require('./utils.js')
const utils = new utilsFunctions()

module.exports = async function initializeInstance(restApi, instance) {
  utils.logger.info(
    `Start checking authorization of instance ${instance.idInstance}`,
  )

  try {
    const data = await restApi.instance.getStateInstance()
    utils.logger.info(
      `Instance ${instance.idInstance} is ${data.stateInstance}`,
    )

    if (data.stateInstance !== 'authorized') {
      utils.logger.error(`Instance ${instance.idInstance} is not online`)
      instance.isOnline = false
      // TODO: необходимо описать логику, чтобы данные сохранялись в бд и передавался только номер
    } else {
      try {
        const settingsResponse = await restApi.settings.setSettings(
          utils.settings,
        )
        utils.logger.info(
          `Instance ${instance.idInstance} save settings is ${settingsResponse.saveSettings}`,
        )
        instance.isOnline = true
      } catch (error) {
        utils.logger.error(
          `Instance ${instance.idInstance} not take settings ${error}`,
        )
      }
    }
  } catch (error) {
    utils.logger.error(
      `Service is broken in checking instance authorization ${error}`,
    )
  }
}
