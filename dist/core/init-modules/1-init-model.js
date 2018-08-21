"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const model_1 = require("../decorators/model");
exports.default = (config) => {
    if (!config.mysql) {
        return {};
    }
    // init DB
    const mysql = !Array.isArray(config.mysql) ? [config.mysql] : config.mysql;
    const sequelize = {};
    const initSequelizeItemOfMySQL = (options) => {
        const { host, name, username, password } = options;
        const sequelizeOption = {
            host,
            dialect: 'mysql',
            dialectOptions: {
                charset: 'utf8'
            },
            operatorsAliases: false,
            timezone: '+08:00'
        };
        return new Sequelize(name, username, password, sequelizeOption);
    };
    for (let item of mysql) {
        const name = item.DB || 'default';
        sequelize[name] = initSequelizeItemOfMySQL(item);
    }
    // init model
    const model = {};
    for (let item of model_1.queue) {
        const { class: ClassObject, db, table, sql, method, field } = item;
        const dbItem = sequelize[db || 'default'];
        if (!ClassObject) {
            continue;
        }
        const modelItem = dbItem.define(table, field, { freezeTableName: true, timestamps: false });
        // add method into model
        modelItem.Methods = {};
        for (let m of method) {
            modelItem.Methods[m.name] = m;
        }
        // add sql into model
        modelItem.SQL = {};
        for (let s of sql) {
            modelItem.SQL[s.name] = (...args) => {
                const sqlStatement = s(...args);
                if (sqlStatement.toUpperCase().indexOf('SELECT') === 0) {
                    return dbItem.query(sqlStatement, { type: dbItem.QueryTypes.SELECT });
                }
                return dbItem.query(sqlStatement);
            };
        }
        model[ClassObject.name] = modelItem;
    }
    return model;
};
