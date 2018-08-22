import getConfig from './common/get-config'
import initModules from './init-modules'
import startServer from './start-server'
import router from './common/router'
import util from './common/util'

export default class Mesero {
  public config: MeseroConfig
  public logger: Logger
  public model: Model
  public controller: Controller
  public service: Service
  public interceptor: Interceptor
  public jwt?: JWT
  public store: object = {}
  public util: object = util
  public io?: any

  constructor () {
    this.config = getConfig()

    const { logger, model, controller, service, interceptor, jwt } = initModules(this.config)

    this.logger = logger
    this.model = model
    this.controller = controller
    this.service = service
    this.interceptor = interceptor
    this.jwt = jwt
  }

  start (): void {
    startServer({
      config: this.config,
      model: this.model,
      controller: this.controller,
      service: this.service,
      interceptor: this.interceptor,
      logger: this.logger,
      router,
      store: this.store,
      jwt: this.jwt,
      util: this.util,
      io: this.io
    })
  }
}
