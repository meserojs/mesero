import * as YAML from 'yamljs'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as _ from 'lodash'
import * as glob from 'glob'

export default function (): MeseroConfig {
  const rootDir: string = process.cwd()

  let config: MeseroConfig = {
    rootDir,
    port: 8080,
    env: 'production',
    dir: {
      log: './log',
      static: './static',
      view: './view',
    }
  }

  // base config
  const CONFIG_YML_NAME: string = 'mesero.yml'
  const CONFIG_YML_PATH: string = path.resolve(rootDir, CONFIG_YML_NAME)

  let ymlConfig: object = fs.existsSync(CONFIG_YML_PATH) && (YAML.parse(fs.readFileSync(CONFIG_YML_PATH, 'utf8')) || {})

  // env config
  let envConfig: object = {}

  console.log(process.env.NODE_ENV)

  const envConfigYmlFiles: Array<string> = glob.sync(path.resolve(rootDir, 'mesero.*.yml'))

  for (let item of envConfigYmlFiles) {
    let name: RegExpExecArray | null | string = /mesero\.(\S+)\.yml/.exec(item)
    name && (name = name[1]) && (envConfig[name] = YAML.parse(fs.readFileSync(item, 'utf8')) || {})
  }

  // merge base config
  config = _.merge(config, ymlConfig)

  process.env && process.env.NODE_ENV && (config.env = process.env.NODE_ENV || 'production')

  // merge env config
  envConfig[config.env] && (config = _.merge(config, envConfig[config.env]))

  return config
}
