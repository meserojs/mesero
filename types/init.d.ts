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

interface initModules {
  logger: Logger
  model: Model
  controller: Controller
  service: Service
  interceptor: Interceptor
}
