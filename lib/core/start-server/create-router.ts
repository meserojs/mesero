import * as KoaRouter from 'koa-router'
import { routes } from '../common/router'

export default function (modules: ServerModules): any {
  const router: any = new KoaRouter()

  for (let method in routes) {
    for (let url in routes[method]) {
      const joiner = routes[method][url](modules)

      Array.isArray(joiner) ? router[method](url, ...joiner) : router[method](url, joiner)
    }
  }

  return router
}
