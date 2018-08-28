import * as KoaSession from 'koa-session'

const isInjectSession: MiddlewarePlugin = function (app, modules) {
  const { config } = modules

  if (config.session) {
    const key: string = config.session.key || 'naso'

    app.keys = [key]

    return KoaSession({key, maxAge: config.session.maxAge || 24 * 60 * 60 * 1000}, app)
  }
}

export default isInjectSession
