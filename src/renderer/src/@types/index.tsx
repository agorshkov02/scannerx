type CellKey = {
  dir: string
  vendor: string
}

type CellValue = {
  comments: string | undefined
  state: string
}

type Cell = {
  key: CellKey
  value: CellValue
}

export { type Cell, type CellKey, type CellValue }
