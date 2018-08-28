import Naso from './core/naso'
import { Model } from './core/decorators/model'
import { Controller } from './core/decorators/controller'
import { Interceptor } from './core/decorators/interceptor'
import { Service } from './core/decorators/service'
import { Router } from './core/common/router'
import Middleware from './core/middleware'

module.parent && module.parent.filename && (Naso.moduleParentFilename = module.parent.filename)

const naso: naso = {
  Naso,
  Model,
  Controller,
  Interceptor,
  Service,
  Middleware,
  Router
}

export = naso
