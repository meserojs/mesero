import chalk from 'chalk'
import boxen = require('boxen')

export default async function (modules: ServerModules): Promise<void> {
  const { config, interceptor } = modules

  console.log(
    boxen(
      chalk.yellow(
        `ENV: ${config.env}\nPort: ${config.port}${config.mysql ? `\nMySQL: ${Array.isArray(config.mysql) ? config.mysql.map(v => `${v.host}@${v.name}`).join(',') : `${config.mysql.host}@${config.mysql.name}`}` : ''}`
      ),
      {
        padding: {left: 1, right: 1},
        borderStyle: 'double',
        borderColor: 'yellow'
      }
    )
  )

  for (let item of interceptor.serverStarted) {
    await item()
  }
}
