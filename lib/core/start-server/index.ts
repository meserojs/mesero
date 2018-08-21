import * as path from 'path'
import * as http from 'http'
import * as socketIO from 'socket.io'
import * as Koa from 'koa'
import * as KoaBody from 'koa-body'
import * as KoaStatic from 'koa-static'
import * as KoaViews from 'koa-views'
import * as KoaSession from 'koa-session'

import serverBeforeStart from './server-before-start'
import serverStarted from './server-started'

interface StartServerArguments {
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
}

const CTX_ERROR_FLAG = '[ctx@error]'

export default async function ({
  config, model, controller, service, interceptor, router, logger, store, jwt, util
}: StartServerArguments): Promise<any> {
  await serverBeforeStart(config, interceptor)

  const app = new Koa()

  let io: any = void 0

  app
    .use(async (ctx: any, next) => {
      ctx.model = model
      ctx.controller = controller
      ctx.service = service
      ctx.logger = logger
      ctx.store = store
      ctx.jwt = jwt
      ctx.util = util
      ctx.io = io

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
          throw error
        }
      }
    })
    .on('error', (error: any) => {
      console.log(error) && logger.error(error)
    })

  if (config.session) {
    const key: string = config.session.key || 'mesero'

    app.keys = [key]

    app.use(KoaSession({key, maxAge: config.session.maxAge || 24 * 60 * 60 * 1000}, app))
  }

  app
    .use(KoaStatic(config.dir.static))
    .use(KoaViews(config.dir.view, {extension: 'ejs'}))
    .use(KoaBody())
    .use(router.routes())
    .use(router.allowedMethods())

  if (config.isUseSocketIO) {
    const server = http.createServer(app.callback())
    io = socketIO(server)
    server.listen(config.port, serverStarted(config, interceptor))
  } else {
    app.listen(config.port, serverStarted(config, interceptor))
  }
}
