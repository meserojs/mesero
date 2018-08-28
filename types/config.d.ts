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

interface NasoConfig {
  rootDir: string
  port: number
  env: string
  isUseSocketIO?: boolean
  session?: SessionConfig
  mysql?: MySQLConfig | Array<MySQLConfig>
  crossDomain?: CrossDomainConfig
  jwt?: JWTConfig
  dir: dirConfig
}

interface NasoEnvConfig {
  [env: string]: object
}
