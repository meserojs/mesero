import { queue } from '../decorators/controller'

export default (config: MeseroConfig): Controller => {
  const controller: Controller = {}

  for (let item of queue) {
    const { class: ClassObject } = item
    controller[ClassObject.name] = new ClassObject()
  }

  return controller
}
