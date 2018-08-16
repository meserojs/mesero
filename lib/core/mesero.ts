import { queue as modelQueue } from './model'
import { queue as controllerQueue } from './controller'
import { queue as interceptorQueue } from './interceptor'
import { queue as serviceQueue } from './service'

import getConfig from './common/get-config'

export default class Mesero {
  public config: MeseroConfig

  constructor () {
    console.log('model queue: ', modelQueue)
    console.log('controller queue: ', controllerQueue)
    console.log('interceptor queue: ', interceptorQueue)
    console.log('service queue: ', serviceQueue)

    this.config = getConfig()

    console.log(this.config)
  }

  start (): void {

  }
}
