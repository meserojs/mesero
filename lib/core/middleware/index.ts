import extendRouter from './extend-router'
import injectModules from './inject-modules'
import isInjectSession from './is-inject-session'

class MiddlewareClass<T> {
  queue: Array<T> = []

  add (func: T) {
    this.queue.push(func)
  }
}

const Middleware = new MiddlewareClass<MiddlewarePlugin>()

// default middleware plugin
Middleware.add(extendRouter)
Middleware.add(injectModules)
Middleware.add(isInjectSession)

export default Middleware
