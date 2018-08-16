import Factory from './common/decorator-factory'

export const queue: Array<InterceptorSettingsAttr> = []

const factory = new Factory<InterceptorSettingsAttr>({
  class: null,
  serverBeforeStart: [],
  serverStarted: [],
})

export const Interceptor: Interceptor = <Interceptor>factory.entry(queue)

Interceptor.ServerBeforeStart = factory.createSettings((Target, key, descriptor) => {
  Target.__settings__.serverBeforeStart.push(Target[key])

  return Target
})

Interceptor.ServerStarted = factory.createSettings((Target, key, descriptor) => {
  Target.__settings__.serverStarted.push(Target[key])

  return Target
})
