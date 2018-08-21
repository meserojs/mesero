import initLogger from './0-init-logger'
import initModel from './1-init-model'
import initController from './2-init-controller'
import initService from './3-init-service'
import initInterceptor from './4-init-interceptor'
import initJWT from './5-init-jwt'

export default (config: MeseroConfig): initModules => ({
  logger: initLogger(config),
  model: initModel(config),
  controller: initController(config),
  service: initService(config),
  interceptor: initInterceptor(config),
  jwt: initJWT(config)
})
