import getConfig from './common/get-config'
import initModules from './init-modules'
import startServer from './start-server'
import router from './common/router'

export default class Mesero {
  public config: MeseroConfig
  public logger: Logger
  public model: Model
  public controller: Controller
  public service: Service
  public interceptor: Interceptor

  constructor () {
    this.config = getConfig()

    const { logger, model, controller, service, interceptor } = initModules(this.config)

    this.logger = logger
    this.model = model
    this.controller = controller
    this.service = service
    this.interceptor = interceptor
  }

  start (): void {
    startServer({
      config: this.config,
      model: this.model,
      controller: this.controller,
      service: this.service,
      interceptor: this.interceptor,
      logger: this.logger,
      router
    })
  }
}
