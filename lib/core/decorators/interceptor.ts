import Factory from '../common/decorator-factory'

export const queue: DecoratorQueue<InterceptorSettingsAttr> = []

const decorator = new Factory<InterceptorSettingsAttr>({
  serverBeforeStart: [],
  serverStarted: []
})

export const Interceptor: InterceptorDecorator = <InterceptorDecorator>decorator.entry(queue)

Interceptor.ServerBeforeStart = decorator.createSettings((Target, key, descriptor) => {
  Target.__settings__.serverBeforeStart.push(Target[key])

  return Target
})

Interceptor.ServerStarted = decorator.createSettings((Target, key, descriptor) => {
  Target.__settings__.serverStarted.push(Target[key])

  return Target
})
