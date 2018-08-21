interface DecoratorQueue<T> extends Array<any> {
  [index: number]: Array<T>
}

interface Target<T> {
  (): void
  [attr: string]: any
  prototype: {
    __settings__: T
  }
  __settings__: T
}

interface decoratorFunction<T> {
  (Target: Target<T>, key: string, descriptor: PropertyDescriptor): Target<T>
}

interface decoratorType {
  class?: object
}

interface ModelSettingsAttr extends decoratorType {
  class?: {
    name: string
  }
  table: string
  db: string
  field: {
    [key: string]: any
  }
  sql: Array<(...args: any[]) => any>
  method: Array<(...args: any[]) => any>
  // TODO: AfterDefineCallback & AfterDefine
}

interface ModelDecorator extends decoratorFunction<ModelSettingsAttr> {
  DB: (db: string) => decoratorFunction<ModelSettingsAttr>
  Table: (name: string) => decoratorFunction<ModelSettingsAttr>
  Field: (name: string, attr: object) => decoratorFunction<ModelSettingsAttr>
  SQL: decoratorFunction<ModelSettingsAttr>
  Method: decoratorFunction<ModelSettingsAttr>
}

interface ControllerSettingsAttr extends decoratorType {
}

interface ControllerDecorator extends decoratorFunction<ControllerSettingsAttr> {
}

interface InterceptorSettingsAttr extends decoratorType {
  serverBeforeStart: Array<(...args: any[]) => any>
  serverStarted: Array<(...args: any[]) => any>
}

interface InterceptorDecorator extends decoratorFunction<InterceptorSettingsAttr> {
  ServerBeforeStart: decoratorFunction<InterceptorSettingsAttr>
  ServerStarted: decoratorFunction<InterceptorSettingsAttr>
}

interface ServiceSettingsAttr extends decoratorType {
}

interface ServiceDecorator extends decoratorFunction<ServiceSettingsAttr> {
}
