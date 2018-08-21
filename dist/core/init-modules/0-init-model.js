"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const model_1 = require("../model");
exports.default = (config) => {
    if (!config.mysql) {
        return void 0;
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
        const { class: classObject, db, table, sql, method, field } = item;
        const dbItem = sequelize[db || 'default'];
        classObject && (model[classObject.name] = dbItem.define(table, field, { freezeTableName: true, timestamps: false }));
    }
    return model;
};
