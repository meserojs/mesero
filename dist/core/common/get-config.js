"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var YAML = require("yamljs");
var fs = require("fs-extra");
var path = require("path");
var _ = require("lodash");
var glob = require("glob");
function default_1() {
    var rootDir = process.cwd();
    var config = {
        rootDir: rootDir,
        port: 8080,
        env: 'production',
        dir: {
            log: './log',
            static: './static',
            view: './view'
        }
    };
    // base config
    var CONFIG_YML_NAME = 'mesero.yml';
    var CONFIG_YML_PATH = path.resolve(rootDir, CONFIG_YML_NAME);
    var ymlConfig = fs.existsSync(CONFIG_YML_PATH) && (YAML.parse(fs.readFileSync(CONFIG_YML_PATH, 'utf8')) || {});
    // env config
    var envConfig = {};
    var envConfigYmlFiles = glob.sync(path.resolve(rootDir, 'mesero.*.yml'));
    for (var _i = 0, envConfigYmlFiles_1 = envConfigYmlFiles; _i < envConfigYmlFiles_1.length; _i++) {
        var item = envConfigYmlFiles_1[_i];
        var nameMatchArray = /mesero\.(\S+)\.yml/.exec(item);
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
