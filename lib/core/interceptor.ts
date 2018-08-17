import Factory from './common/decorator-factory'

export const queue: Array<InterceptorSettingsAttr> = []

const decorator = new Factory<InterceptorSettingsAttr>({
  class: null,
  serverBeforeStart: [],
  serverStarted: []
})

export const Interceptor: Interceptor = <Interceptor>decorator.entry(queue)

Interceptor.ServerBeforeStart = decorator.createSettings((Target, key, descriptor) => {
  Target.__settings__.serverBeforeStart.push(Target[key])

  return Target
})

Interceptor.ServerStarted = decorator.createSettings((Target, key, descriptor) => {
  Target.__settings__.serverStarted.push(Target[key])

  return Target
})
