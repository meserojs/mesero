export default async function (config: MeseroConfig, interceptor: Interceptor): Promise<any> {
  for (let item of interceptor.serverBeforeStart) {
    await item()
  }
}
