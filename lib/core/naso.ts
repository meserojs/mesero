import * as path from 'path'
import getConfig from './common/get-config'
import initModules from './init-modules'
import startServer from './start-server'
import util from './common/util'
import autoImportModules = require('auto-import-modules')

export default class Naso implements NasoClass {
  static moduleParentFilename: string = ''

  public config: NasoConfig
  public logger: Logger
  public model: Model
  public controller: Controller
  public service: Service
  public interceptor: Interceptor
  public jwt?: JWT
  public store: object = {}
  public util: object = util
  public io?: any
  public router: any

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

  start () {
    startServer({
      config: this.config,
      model: this.model,
      controller: this.controller,
      service: this.service,
      interceptor: this.interceptor,
      logger: this.logger,
      store: this.store,
      jwt: this.jwt,
      router: this.router,
      util: this.util,
      io: this.io
    })
  }

  static AutoImportModules (): void {
    Naso.moduleParentFilename && autoImportModules(path.parse(Naso.moduleParentFilename).dir)
  }
}
