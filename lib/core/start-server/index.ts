import * as Koa from 'koa'
import * as KoaBody from 'koa-body'
import * as KoaStatic from 'koa-static'
import * as KoaViews from 'koa-views'

import serverBeforeStart from './server-before-start'
import serverStart from './server-start'
import serverStarted from './server-started'
import Middleware from '../middleware'

const BODY_LIMIT_SIZE = 100000

export default async function (modules: ServerModules): Promise<any> {
  const { config } = modules

  await serverBeforeStart(modules)

  const app = new Koa()

  Middleware.queue.forEach((middlewareItem) => {
    const plugin = middlewareItem(app, modules)
    plugin && app.use(plugin)
  })

  // default koa middleware plugin
  app
    .use(KoaStatic(config.dir.static))
    .use(KoaViews(config.dir.view, {extension: 'ejs'}))
    .use(KoaBody({jsonLimit: BODY_LIMIT_SIZE, formLimit: BODY_LIMIT_SIZE, textLimit: BODY_LIMIT_SIZE}))
    .use(modules.router.routes())
    .use(modules.router.allowedMethods())

  await serverStart(app, modules)
  await serverStarted(modules)
}
