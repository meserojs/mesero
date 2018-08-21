import * as path from 'path'
import * as Koa from 'koa'
import * as KoaBody from 'koa-body'
import * as KoaStatic from 'koa-static'
import * as KoaViews from 'koa-views'
import chalk from 'chalk'
import boxen = require('boxen')

interface StartServerArguments {
  config: MeseroConfig
  model: Model
  controller: Controller
  service: Service
  interceptor: Interceptor
  logger: Logger
  router: any
}

const CTX_ERROR_FLAG = '[ctx@error]'

export default async function ({config, model, controller, service, interceptor, router, logger}: StartServerArguments): Promise<any> {
  const { serverBeforeStart, serverStarted } = interceptor

  const beforeServerStart = async () => {
    for (let serverBeforeStartItemFunc of serverBeforeStart) {
      await serverBeforeStartItemFunc()
    }
  }

  const afterServerStarted = async () => {
    console.log(
      boxen(
        chalk.yellow(
          `ENV: ${config.env}\nPort: ${config.port}\n${config.mysql ? `MySQL: ${Array.isArray(config.mysql) ? config.mysql.map(v => `${v.host}@${v.name}`).join(',') : `${config.mysql.host}@${config.mysql.name}`}` : ''}`
        ),
        {
          padding: {left: 1, right: 1},
          borderStyle: 'double',
          borderColor: 'yellow'
        }
      )
    )

    for (let serverStartedItemFunc of serverStarted) {
      await serverStartedItemFunc()
    }
  }

  await beforeServerStart()

  new Koa()
    .use(async (ctx: any, next) => {
      ctx.model = model
      ctx.controller = controller
      ctx.service = service
      ctx.logger = logger

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
      logger.error(error)
    })
    .use(KoaStatic(config.dir.static))
    .use(KoaViews(config.dir.view, {extension: 'ejs'}))
    .use(KoaBody())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(config.port, afterServerStarted)
}
