import { queue } from '../decorators/interceptor'

export default (config: MeseroConfig): Interceptor => {
  const interceptor: Interceptor = {
    serverBeforeStart: [],
    serverStarted: []
  }

  for (let item of queue) {
    const { serverBeforeStart, serverStarted } = item
    interceptor.serverBeforeStart = interceptor.serverBeforeStart.concat(serverBeforeStart)
    interceptor.serverStarted = interceptor.serverStarted.concat(serverStarted)
  }

  return interceptor
}
