import * as fs from 'fs'
import { join } from 'path'
import { INSTANCE as SETTINGS_SERVICE_INSTANCE } from './SettingsService'

class DirsService {
  private _dirs: string[] = []

  public get dirs(): string[] {
    return this._dirs
  }

  private set dirs(directories: string[]) {
    this._dirs = directories
  }

  public scan(): void {
    const path = SETTINGS_SERVICE_INSTANCE.getPathSync()
    if (!path) {
      console.warn('path is not specified')
      this.dirs = []
      return
    }
    const exists = fs.existsSync(path)
    if (!exists) {
      console.warn(`${path} is not exists`)
      this.dirs = []
      return
    }
    const stat = fs.statSync(path)
    if (!stat || !stat.isDirectory) {
      console.warn(`${path} is not a directory`)
      this.dirs = []
      return
    }
    const dirs: string[] = []
    const dir = fs.readdirSync(path)
    dir.forEach((content) => {
      const stat = fs.statSync(join(path, content))
      if (stat?.isDirectory()) {
        dirs.push(content)
      }
    })
    this.dirs = dirs
  }
}

const INSTANCE = new DirsService()
export { INSTANCE }
