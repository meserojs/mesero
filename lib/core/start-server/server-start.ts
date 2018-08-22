import * as http from 'http'
import * as socketIO from 'socket.io'

export default function (app: any, modules: ServerModules): Promise<void> {
  const { config } = modules

  return new Promise((resolve: any) => {
    if (config.isUseSocketIO) {
      const server = http.createServer(app.callback())
      modules.io = socketIO(server)
      server.listen(config.port, resolve)
    } else {
      app.listen(config.port, resolve)
    }
  })
}
