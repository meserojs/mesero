import Factory from './common/decorator-factory'

export const queue: Array<ModelSettingsAttr> = []

const factory = new Factory<ModelSettingsAttr>({
  class: null,
  db: '',
  table: '',
  field: {},
  sql: [],
  method: [],
})

export const Model: Model = <Model>factory.entry(queue)

Model.DB = db => factory.createSettingsInPrototype((Target, key, descriptor) => {
  Target.prototype.__settings__.db = db

  return Target
})

Model.Table = name => factory.createSettingsInPrototype((Target, key, descriptor) => {
  Target.prototype.__settings__.table = name

  return Target
})

Model.Field = (name, attr) => factory.createSettingsInPrototype((Target, key, descriptor) => {
  Target.prototype.__settings__.field[name] = attr

  return Target
})

Model.SQL = factory.createSettings((Target, key, descriptor) => {
  Target.__settings__.sql.push(Target[key])

  return Target
})

Model.Method = factory.createSettings((Target, key, descriptor) => {
  Target.__settings__.method.push(Target[key])

  return Target
})
