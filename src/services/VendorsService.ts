import settings from 'electron-settings'

class VendorsService {
  public getVendorsSync(): string[] {
    return (settings.getSync('vendors') as string[]) ?? []
  }

  public addVendorSync(vendor: string): void {
    const vendors = this.getVendorsSync()
    if (vendors.includes(vendor)) {
      console.warn(`can't add vendor ${vendor}, vendor exists`)
      return
    }
    settings.setSync('vendors', [...vendors, vendor])
  }

  public deleteVendorSync(vendor: string): void {
    const vendors = this.getVendorsSync()
    if (!vendor.includes(vendor)) {
      console.warn(`can't delete vendor ${vendor}, vendor not exists`)
      return
    }
    const filtered = vendors.filter((added) => added !== vendor)
    settings.setSync('vendors', filtered)
  }
}

const INSTANCE = new VendorsService()
export { INSTANCE }
