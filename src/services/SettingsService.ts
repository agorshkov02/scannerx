import settings from 'electron-settings'

class SettingsService {
  public getIntervalSync(): number | undefined {
    return settings.getSync('scan.interval') as number
  }

  public setIntervalSync(interval: number) {
    settings.setSync('scan.interval', interval)
  }

  public getPathSync(): string | undefined {
    return settings.getSync('scan.path') as string
  }

  public setPathSync(path: string) {
    settings.setSync('scan.path', path)
    const pathVariants = this.getPathVariants()
    if (!pathVariants.includes(path)) {
      settings.setSync('pathVariants', [...pathVariants, path])
    }
  }

  public getPathVariants(): string[] {
    return settings.getSync('pathVariants') as string[] ?? []
  }
}

const INSTANCE = new SettingsService()
export { INSTANCE }
