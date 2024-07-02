import sha256 from 'crypto-js/sha256'
import * as fs from 'fs'
import { join } from 'path'
import { Key, Value, EMPTY_VALUE } from './@types'

class PersistService {
  private path2DirVendor: Record<string, Record<string, Value>> = {}

  getSync(path: string, key: Key): Value {
    const data = this.getData(path)
    return data[`${key.dir}:${key.vendor}`] ?? EMPTY_VALUE
  }

  setSync(path: string, key: Key, value: Value) {
    const data = this.getData(path)
    data[`${key.dir}:${key.vendor}`] = value
    this.writeDataSync(path, data)
  }

  private getData(path: string): Record<string, Value> {
    if (!this.path2DirVendor[path]) {
      this.path2DirVendor[path] = this.readDataSync(path)
    }
    return this.path2DirVendor[path]
  }

  private readDataSync(path: string): Record<string, Value> {
    path = join(this.createAppDataDir(), sha256(path).toString())
    if (!fs.existsSync(path)) {
      const data: Record<string, Value> = {}
      fs.writeFileSync(path, JSON.stringify(data))
      return data
    }
    return JSON.parse(fs.readFileSync(path, 'utf-8'))
  }

  private writeDataSync(path: string, data: Record<string, Value>) {
    path = join(this.createAppDataDir(), sha256(path).toString())
    fs.writeFileSync(path, JSON.stringify(data))
    this.path2DirVendor[path] = data
  }

  private createAppDataDir(): string {
    const appDataDir = join(process.env.APPDATA || '', 'scanner')
    if (!fs.existsSync(appDataDir)) {
      fs.mkdirSync(appDataDir)
    }
    return appDataDir
  }
}

const INSTANCE = new PersistService()
export { INSTANCE }
