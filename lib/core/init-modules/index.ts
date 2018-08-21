import initLogger from './0-init-logger'
import initModel from './1-init-model'
import initController from './2-init-controller'
import initService from './3-init-service'
import initInterceptor from './4-init-interceptor'

export default (config: MeseroConfig): initModules => ({
  logger: initLogger(config),
  model: initModel(config),
  controller: initController(config),
  service: initService(config),
  interceptor: initInterceptor(config)
})
