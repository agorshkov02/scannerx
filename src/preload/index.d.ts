declare global {
  interface Window {
    dirsApi: {
      getDirsSync(): string[]
    }
    persistApi: {
      getSync(key: Key): Value
      setSync(key: Key, value: Value): void
    }
    settingsApi: {
      getIntervalSync(): number | undefined
      setIntervalSync(interval: number)
      getPathSync(): string | undefined
      setPathSync(path: string)
    }
    vendorsApi: {
      getVendorsSync(): string[]
      addVendorSync: (vendor: string) => void
      deleteVendorSync: (vendor: string) => void
    }
  }
}

export {}
