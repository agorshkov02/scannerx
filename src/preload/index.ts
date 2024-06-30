import { contextBridge } from 'electron'
import { EMPTY_VALUE, Key, Value } from '../services/@types'
import { INSTANCE as DIRS_SERVICE_INSTANCE } from '../services/DirsService'
import { INSTANCE as PERSIST_SERVICE } from '../services/PersistService'
import { INSTANCE as SETTINGS_SERVICE_INSTANCE } from '../services/SettingsService'
import { INSTANCE as VENDORS_SERVICE_INSTANCE } from '../services/VendorsService'
import './electron-settings-config'

contextBridge.exposeInMainWorld('dirsApi', {
  getDirsSync(): string[] {
    DIRS_SERVICE_INSTANCE.scan()
    return DIRS_SERVICE_INSTANCE.dirs
  }
})

contextBridge.exposeInMainWorld('persistApi', {
  getSync(key: Key): Value | undefined {
    const path = SETTINGS_SERVICE_INSTANCE.getPathSync()
    if (!path) {
      console.warn('path is not specified, check your scan settings')
      return EMPTY_VALUE
    }
    return PERSIST_SERVICE.getSync(path, key)
  },
  setSync(key: Key, value: Value) {
    const path = SETTINGS_SERVICE_INSTANCE.getPathSync()
    if (!path) {
      console.warn('path is not specified, check your scan settings')
      return
    }
    return PERSIST_SERVICE.setSync(path, key, value)
  }
})

contextBridge.exposeInMainWorld('settingsApi', {
  getIntervalSync(): number | undefined {
    return SETTINGS_SERVICE_INSTANCE.getIntervalSync()
  },
  setIntervalSync(interval: number) {
    SETTINGS_SERVICE_INSTANCE.setIntervalSync(interval)
  },
  getPathSync(): string | undefined {
    return SETTINGS_SERVICE_INSTANCE.getPathSync()
  },
  setPathSync(path: string) {
    SETTINGS_SERVICE_INSTANCE.setPathSync(path)
  },
  getPathVariants(): string[] {
    return SETTINGS_SERVICE_INSTANCE.getPathVariants()
  }
})

contextBridge.exposeInMainWorld('vendorsApi', {
  getVendorsSync(): string[] {
    return VENDORS_SERVICE_INSTANCE.getVendorsSync()
  },
  addVendorSync: (vendor: string): void => {
    return VENDORS_SERVICE_INSTANCE.addVendorSync(vendor)
  },
  deleteVendorSync: (vendor: string): void => {
    return VENDORS_SERVICE_INSTANCE.deleteVendorSync(vendor)
  }
})
