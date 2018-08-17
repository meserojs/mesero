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
  class: object | null
}

interface ModelSettingsAttr extends decoratorType {
  table: string
  db: string
  field: {
    [key: string]: object
  }
  sql: Array<(...args: any[]) => any>
  method: Array<(...args: any[]) => any>
  // TODO: AfterDefineCallback & AfterDefine
}

interface Model extends decoratorFunction<ModelSettingsAttr> {
  DB: (db: string) => decoratorFunction<ModelSettingsAttr>
  Table: (name: string) => decoratorFunction<ModelSettingsAttr>
  Field: (name: string, attr: object) => decoratorFunction<ModelSettingsAttr>
  SQL: decoratorFunction<ModelSettingsAttr>
  Method: decoratorFunction<ModelSettingsAttr>
}

interface ControllerSettingsAttr extends decoratorType {
}

interface Controller extends decoratorFunction<ControllerSettingsAttr> {
}

interface InterceptorSettingsAttr extends decoratorType {
  serverBeforeStart: Array<(...args: any[]) => any>
  serverStarted: Array<(...args: any[]) => any>
}

interface Interceptor extends decoratorFunction<InterceptorSettingsAttr> {
  ServerBeforeStart: decoratorFunction<InterceptorSettingsAttr>
  ServerStarted: decoratorFunction<InterceptorSettingsAttr>
}

interface ServiceSettingsAttr extends decoratorType {
}

interface Service extends decoratorFunction<ServiceSettingsAttr> {
}
