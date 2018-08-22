const CTX_ERROR_FLAG = '[ctx@error]'

const extendRouter: MiddlewarePlugin = function (app, modules) {
  const { config, logger } = modules

  return async (ctx, next) => {
    if (config.crossDomain) {
      ctx.set('Access-Control-Allow-Origin', config.crossDomain.origin || '*')
      ctx.set('Access-Control-Allow-Headers', config.crossDomain.headers || 'Content-Type, Content-Length')
      ctx.set('Access-Control-Allow-Methods', config.crossDomain.methods || 'GET,PUT,POST,PATCH,DELETE,HEAD,OPTIONS')

      if (ctx.method === 'OPTIONS') {
        ctx.status = 200

        return void 0
      }
    }

    ctx.error = function (msg: string) {
      /* eslint-disable no-throw-literal */
      throw `${CTX_ERROR_FLAG}${msg}`
    }

    try {
      await next()
    } catch (error) {
      if (typeof error === 'string' && error.indexOf(CTX_ERROR_FLAG) === 0) {
        ctx.body = {error: error.split(CTX_ERROR_FLAG)[1]}
      } else {
        console.log(error) && logger.error(error)
      }
    }
  }
}

export default extendRouter
