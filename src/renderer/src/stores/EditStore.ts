import { makeAutoObservable } from 'mobx'
import { Cell } from '../@types'

class EditStore {
  private _isEdit: boolean = false
  private _selectedCells: Cell[] = []

  constructor() {
    makeAutoObservable(this)
  }

  public startEditing(cell: Cell): void {
    if (!this.isSelected(cell)) {
      this._selectedCells = [...this._selectedCells, cell]
    }
    this._isEdit = true
  }

  public stopEditing(): void {
    this._isEdit = false
    this._selectedCells = []
  }

  public get isEdit(): boolean {
    return this._isEdit
  }

  public get selectedCells(): Cell[] {
    return this._selectedCells
  }

  public get isSelectedExclusive(): boolean {
    return this._selectedCells.length === 1
  }

  public isSelected(cell: Cell): boolean {
    return (
      !this._isEdit &&
      !!this._selectedCells.find((selectedCell) => {
        const { dir, vendor } = cell.key
        const { dir: selectedDir, vendor: selectedVendor } = selectedCell.key
        return dir === selectedDir && vendor === selectedVendor
      })
    )
  }

  public selectCellExclusive(cell: Cell): void {
    this._selectedCells = [cell]
  }

  public selectCell(cell: Cell): void {
    const lengthBeforeFilter = this._selectedCells.length
    this._selectedCells = this._selectedCells.filter((selectedCell) => {
      const { dir, vendor } = cell.key
      const { dir: selectedDir, vendor: selectedVendor } = selectedCell.key
      return !(dir === selectedDir && vendor === selectedVendor)
    })
    const lengthAfterFilter = this._selectedCells.length
    if (lengthBeforeFilter === lengthAfterFilter) {
      this._selectedCells = [...this._selectedCells, cell]
    }
  }
}

const INSTANCE = new EditStore()
export { EditStore, INSTANCE }
