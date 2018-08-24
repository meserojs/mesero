import Mesero from './core/mesero'
import { Model } from './core/decorators/model'
import { Controller } from './core/decorators/controller'
import { Interceptor } from './core/decorators/interceptor'
import { Service } from './core/decorators/service'
import { Router } from './core/common/router'
import Middleware from './core/middleware'

const mesero: mesero = {
  Mesero,
  Model,
  Controller,
  Interceptor,
  Service,
  Middleware,
  Router
}

export = mesero
