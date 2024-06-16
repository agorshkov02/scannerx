import { green, orange, red } from '@mui/material/colors'
import { INSTANCE as EDIT_STORE_INSTANCE } from '@stores/EditStore'
import { INSTANCE as VENDORS_STORE_INSTANCE } from '@stores/VendorsStore'
import { Cell } from '../@types'

export const useVendorsStore = () => VENDORS_STORE_INSTANCE
export const useEditStore = () => EDIT_STORE_INSTANCE

export type Highlight = {
  color: string
  backgroundColor: string
}

const STATE_HIGHLIGHT: Record<string, Highlight> = {
  Added: {
    color: '#ffffff',
    backgroundColor: green[400]
  },
  Rejected: {
    color: '#ffffff',
    backgroundColor: red[400]
  },
  Waiting: {
    color: '#ffffff',
    backgroundColor: orange[400]
  }
}

export const useCellHighlight = (cell: Cell): Highlight => {
  const state = cell.value.state
  return STATE_HIGHLIGHT[state] ?? { color: '#000000', backgroundColor: '#ffffff' }
}
