import { queue } from '../decorators/service'

export default (config: MeseroConfig): Service => {
  const service: Service = {}

  for (let item of queue) {
    const { class: ClassObject } = item
    service[ClassObject.name] = new ClassObject()
  }

  return service
}
