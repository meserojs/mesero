import extendRouter from './extend-router'
import injectModules from './inject-modules'
import isInjectSession from './is-inject-session'

class MiddlewareClass {
  queue: Array<MiddlewarePlugin> = []

  add (func: MiddlewarePlugin): void {
    this.queue.push(func)
  }
}

const Middleware = new MiddlewareClass()

// default middleware plugin
Middleware.add(extendRouter)
Middleware.add(injectModules)
Middleware.add(isInjectSession)

export default Middleware
