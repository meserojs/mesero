import * as Koa from 'koa'
import * as KoaBody from 'koa-body'
import * as KoaStatic from 'koa-static'
import * as KoaViews from 'koa-views'

import serverBeforeStart from './server-before-start'
import serverStart from './server-start'
import serverStarted from './server-started'
import Middleware from '../middleware'

export default async function (modules: ServerModules): Promise<any> {
  const { config, router } = modules

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
    .use(KoaBody())
    .use(router.routes())
    .use(router.allowedMethods())

  await serverStart(app, modules)
  await serverStarted(modules)
}
