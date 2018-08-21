"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YAML = require("yamljs");
const fs = require("fs-extra");
const path = require("path");
const _ = require("lodash");
const glob = require("glob");
function default_1() {
    const rootDir = process.cwd();
    let config = {
        rootDir,
        port: 8080,
        env: 'production',
        dir: {
            log: './log',
            static: './static',
            view: './view'
        }
    };
    // base config
    const CONFIG_YML_NAME = 'mesero.yml';
    const CONFIG_YML_PATH = path.resolve(rootDir, CONFIG_YML_NAME);
    let ymlConfig = fs.existsSync(CONFIG_YML_PATH) && (YAML.parse(fs.readFileSync(CONFIG_YML_PATH, 'utf8')) || {});
    // env config
    let envConfig = {};
    const envConfigYmlFiles = glob.sync(path.resolve(rootDir, 'mesero.*.yml'));
    for (let item of envConfigYmlFiles) {
        const nameMatchArray = /mesero\.(\S+)\.yml/.exec(item);
        if (nameMatchArray && nameMatchArray[1]) {
            envConfig[nameMatchArray[1]] = YAML.parse(fs.readFileSync(item, 'utf8')) || {};
        }
    }
    // merge base config
    config = _.merge(config, ymlConfig);
    process.env && process.env.NODE_ENV && (config.env = process.env.NODE_ENV || 'production');
    // merge env config
    envConfig[config.env] && (config = _.merge(config, envConfig[config.env]));
    return config;
}
exports.default = default_1;
