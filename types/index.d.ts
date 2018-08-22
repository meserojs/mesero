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
  config: MeseroConfig
  model: Model
  controller: Controller
  service: Service
  interceptor: Interceptor
  logger: Logger
  router: any
  jwt?: JWT
  store: object
  util: object
  io?: any
}

interface MiddlewarePlugin {
  (app: any, config: ServerModules): ((ctx: any, next: any) => any) | void
}

declare class MiddlewareClass {
  queue: Array<MiddlewarePlugin>
  add: (func: MiddlewarePlugin) => void
}

interface MeseroConstructor {
  new (): MeseroClass
}

interface MeseroClass {
  config: MeseroConfig
  start: () => void
}

interface mesero {
  Mesero: MeseroConstructor
  Model: ModelDecorator
  Controller: ControllerDecorator
  Interceptor: InterceptorDecorator
  Service: ServiceDecorator
  router: any
  Middleware: MiddlewareClass
}
