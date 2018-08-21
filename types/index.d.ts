interface SessionConfig {
  key: string
  maxAge: number
}

interface MySQLConfig {
  DB?: string
  host: string
  prot: number
  name: string
  username: string
  password: string
}

interface CrossDomainConfig {
  origin: string
  headers: string
  methods: string
}

interface JWTConfig {
  key: string
  maxAge: string
  secret: string
}

interface dirConfig {
  log: string
  static: string
  view: string
}

interface MeseroConfig {
  rootDir: string
  port: number
  env: string
  isUseIO?: boolean
  session?: SessionConfig
  mysql?: MySQLConfig | Array<MySQLConfig>
  crossDomain?: CrossDomainConfig
  jwt?: JWTConfig
  dir: dirConfig
}

interface MeseroEnvConfig {
  [env: string]: object
}

declare module 'boxen' {
  function boxen (...args: Array<any>): string
  export = boxen
}
