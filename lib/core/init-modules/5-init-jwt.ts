import * as fs from 'fs'
import * as jwt from 'jsonwebtoken'

export default function (config: NasoConfig): undefined | JWT {
  if (!config.jwt) {
    return undefined
  }

  let { key, maxAge, secret } = config.jwt

  secret && fs.existsSync(secret) && (key = fs.readFileSync(secret, 'utf8'))

  const sign = function (data: any, time: number): string {
    return jwt.sign({data}, key, { expiresIn: time || maxAge || 24 * 60 * 60 * 1000 })
  }

  const verify = function (token: string): any {
    try {
      const decoded: any = jwt.verify(token, key)
      return decoded.data
    } catch (err) {
      return undefined
    }
  }

  return {sign, verify}
}
