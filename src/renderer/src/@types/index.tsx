type CellKey = {
  dir: string
  vendor: string
}

type CellValue = {
  comments: string | undefined
  state: string
}

const EMPTY_CELL_VALUE: CellValue = {
  comments: undefined,
  state: '-'
}

type Cell = {
  key: CellKey
  value: CellValue
}

export { EMPTY_CELL_VALUE, type Cell, type CellKey, type CellValue }
