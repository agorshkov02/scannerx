import { makeAutoObservable } from 'mobx'

class VendorsStore {
  private _vendors: string[] = []

  constructor() {
    makeAutoObservable(this)
  }

  public get vendors(): string[] {
    return this._vendors
  }

  public set vendors(vendors: string[]) {
    this._vendors = vendors
  }
}

const INSTANCE = new VendorsStore()
export { INSTANCE, VendorsStore }
