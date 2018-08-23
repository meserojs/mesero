import * as Sequelize from 'sequelize'

import { queue } from '../decorators/model'

export default (config: MeseroConfig): Model => {
  if (!config.mysql) {
    return {}
  }

  // init DB
  const mysql: Array<MySQLConfig> = !Array.isArray(config.mysql) ? [config.mysql] : config.mysql

  const sequelize: {[key: string]: Sequelize.Sequelize} = {}

  const initSequelizeItemOfMySQL = (options: MySQLConfig) => {
    const { host, name, username, password } = options

    const sequelizeOption = {
      host,
      dialect: 'mysql',
      dialectOptions: {
        charset: 'utf8'
      },
      operatorsAliases: false,
      timezone: '+08:00'
    }

    return new Sequelize(name, username, password, sequelizeOption)
  }

  for (let item of mysql) {
    const name: string = item.DB || 'default'

    sequelize[name] = initSequelizeItemOfMySQL(item)
  }

  // init model
  const model: Model = {}

  for (let item of queue) {
    const { class: ClassObject, db, table, sql, method, field } = item

    const dbItem = sequelize[db || 'default']

    if (!ClassObject) {
      continue
    }

    const modelItem: any = dbItem.define(table, field, {freezeTableName: true, timestamps: false})

    // add method into model
    modelItem.Methods = {}

    for (let m of method) {
      modelItem.Methods[m.name] = m
    }

    // add sql into model
    modelItem.SQL = {}

    for (let s of sql) {
      modelItem.SQL[s.name] = (...args: Array<any>) => {
        let sqlStatement = s(...args)

        const querySqlStatement = (item: string) => {
          if (item.toUpperCase().indexOf('SELECT') === 0) {
            return dbItem.query(item, {type: dbItem.QueryTypes.SELECT})
          }

          return dbItem.query(item)
        }

        if (Array.isArray(sqlStatement)) {
          return sqlStatement.map((item) => querySqlStatement(item))
        } else {
          return querySqlStatement(sqlStatement)
        }
      }
    }

    model[ClassObject.name] = modelItem
  }

  return model
}
