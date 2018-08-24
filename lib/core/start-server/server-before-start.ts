import createRouter from './create-router'

export default async function (modules: ServerModules): Promise<any> {
  const { interceptor } = modules

  modules.router = createRouter(modules)

  for (let item of interceptor.serverBeforeStart) {
    await item()
  }
}
