interface Model {
  [key: string]: any
}

interface Controller {
  [key: string]: object
}

interface Service {
  [key: string]: object
}

interface Interceptor {
  serverBeforeStart: Array<(...args: Array<any>) => any>
  serverStarted: Array<(...args: Array<any>) => any>
}

interface JWT {
  sign: (data: any, time: number) => void
  verify: (token: string) => any
}

interface initModules {
  logger: Logger
  model: Model
  controller: Controller
  service: Service
  interceptor: Interceptor
  jwt?: JWT
}

declare module 'boxen' {
  function boxen (...args: Array<any>): string
  export = boxen
}

interface ServerModules {
  config: NasoConfig
  model: Model
  controller: Controller
  service: Service
  interceptor: Interceptor
  logger: Logger
  jwt?: JWT
  store: object
  util: object
  io?: any
  router: any
}

interface MiddlewarePlugin {
  (app: any, config: ServerModules): ((ctx: any, next: any) => any) | void
}

declare class MiddlewareClass {
  queue: Array<MiddlewarePlugin>
  add: (func: MiddlewarePlugin) => MiddlewareClass
}

declare module 'auto-import-modules' {
  function autoImportModules (...args: Array<any>): void
  export = autoImportModules
}

interface NasoConstructor {
  new (): NasoClass
}

interface NasoClass {
  config: NasoConfig
  start: () => void
}

interface naso {
  Naso: NasoConstructor
  Model: ModelDecorator
  Controller: ControllerDecorator
  Interceptor: InterceptorDecorator
  Service: ServiceDecorator
  Router: any
  Middleware: MiddlewareClass
}
