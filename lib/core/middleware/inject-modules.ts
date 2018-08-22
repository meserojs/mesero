const injectModules: MiddlewarePlugin = function (app, modules) {
  return async (ctx, next) => {
    ctx.config = modules.config
    ctx.model = modules.model
    ctx.controller = modules.controller
    ctx.service = modules.service
    ctx.logger = modules.logger
    ctx.store = modules.store
    ctx.jwt = modules.jwt
    ctx.util = modules.util
    ctx.io = modules.io

    await next()
  }
}

export default injectModules
