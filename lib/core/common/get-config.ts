import * as YAML from 'yamljs'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as _ from 'lodash'
import * as glob from 'glob'

export default function (): NasoConfig {
  const rootDir: string = process.cwd()

  let config: NasoConfig = {
    rootDir,
    port: 8080,
    env: 'production',
    dir: {
      log: './log',
      static: './static',
      view: './view'
    }
  }

  // base config
  const CONFIG_YML_NAME: string = 'naso.yml'
  const CONFIG_YML_PATH: string = path.resolve(rootDir, CONFIG_YML_NAME)

  let ymlConfig: object = fs.existsSync(CONFIG_YML_PATH) && (YAML.parse(fs.readFileSync(CONFIG_YML_PATH, 'utf8')) || {})

  // env config
  let envConfig: NasoEnvConfig = {}

  const envConfigYmlFiles: Array<string> = glob.sync(path.resolve(rootDir, 'naso.*.yml'))

  for (let item of envConfigYmlFiles) {
    const nameMatchArray: RegExpExecArray | null = /naso\.(\S+)\.yml/.exec(item)

    if (nameMatchArray && nameMatchArray[1]) {
      envConfig[nameMatchArray[1]] = YAML.parse(fs.readFileSync(item, 'utf8')) || {}
    }
  }

  // merge base config
  config = _.merge(config, ymlConfig)

  process.env && process.env.NODE_ENV && (config.env = process.env.NODE_ENV || 'production')

  // merge env config
  envConfig[config.env] && (config = _.merge(config, envConfig[config.env]))

  return config
}
