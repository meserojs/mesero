import Factory from '../common/decorator-factory'

export const queue: DecoratorQueue<ModelSettingsAttr> = []

const decorator = new Factory<ModelSettingsAttr>({
  db: '',
  table: '',
  field: {},
  sql: [],
  method: []
})

export const Model: ModelDecorator = <ModelDecorator>decorator.entry(queue)

Model.DB = db => decorator.createSettingsInPrototype((Target, key, descriptor) => {
  Target.prototype.__settings__.db = db

  return Target
})

Model.Table = name => decorator.createSettingsInPrototype((Target, key, descriptor) => {
  Target.prototype.__settings__.table = name

  return Target
})

Model.Field = (name, attr) => decorator.createSettingsInPrototype((Target, key, descriptor) => {
  Target.prototype.__settings__.field[name] = attr

  return Target
})

Model.SQL = decorator.createSettings((Target, key, descriptor) => {
  Target.__settings__.sql.push(Target[key])

  return Target
})

Model.Method = decorator.createSettings((Target, key, descriptor) => {
  Target.__settings__.method.push(Target[key])

  return Target
})
