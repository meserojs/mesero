export default async function (modules: ServerModules): Promise<any> {
  const { interceptor } = modules

  for (let item of interceptor.serverBeforeStart) {
    await item()
  }
}
