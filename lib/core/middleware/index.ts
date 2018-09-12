import extendRouter from './extend-router'
import injectModules from './inject-modules'
import isInjectSession from './is-inject-session'

let Middleware: MiddlewareClass

class MiddlewareClass {
  queue: Array<MiddlewarePlugin> = []

  add (func: MiddlewarePlugin): MiddlewareClass {
    this.queue.push(func)

    return Middleware
  }
}

Middleware = new MiddlewareClass()

// default middleware plugin
Middleware
  .add(extendRouter)
  .add(injectModules)
  .add(isInjectSession)

export default Middleware
