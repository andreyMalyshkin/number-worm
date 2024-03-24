const utilsFunctions = require('./utils.js')
const utils = new utilsFunctions()

module.exports = async function initializeInstance(restApi, instance) {
  utils.logger.info(
    `Start checking autorization of instance ${instance.idInstance}`,
  )

  restApi.instance
    .getStateInstance()
    .then((data) => {
        utils.logger.info(
        `Instance ${instance.idInstance} is ${data.stateInstance}`,
        )

        if (data.stateInstance !== true) {
            utils.logger.error(`Instance ${instance.idInstance} is not online`)
            //TODO: необходимо описать логику, при которой инстанс не берется в отправку ( флаг )
        } else {
            restApi.settings
                .setSettings(utils.settings)
                .then((data) => {
                    utils.logger.info(
                        `Instance ${instance.idInstance} save settings is ${data.saveSettings}`,
                    )
                })
                .catch((error) => {
                    utils.logger.error(
                        `Instance ${instance.idInstance} not take settings ${error}`,
                    )
                })
        }
    })
    .catch((error) => {
      utils.logger.error(
        `Service is broken in checking instance autorization ${error}`,
      )
    })


}
