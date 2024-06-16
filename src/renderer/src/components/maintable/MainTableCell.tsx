import { ScannerXTooltip } from '@components/commons/ScannerXTooltip'
import { useCellHighlight, useEditStore } from '@hooks/.'
import { Edit } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack, { StackProps } from '@mui/material/Stack'
import TableCell, { TableCellProps } from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import { blue } from '@mui/material/colors'
import { observer } from 'mobx-react-lite'
import { MouseEventHandler } from 'react'
import { Cell } from '../../@types'

type MainTableCellProps = TableCellProps & {
  cell: Cell
}

const MainTableCell = observer(({ cell }: MainTableCellProps) => {
  const editStore = useEditStore()

  return (
    <ScannerXTooltip
      title={
        <Typography>
          <Box>{cell.value.state}</Box>
          {!!cell.value.comments && (
            <Box>
              <Divider sx={{ my: 1 }}></Divider>
              <Box>{cell.value.comments}</Box>
            </Box>
          )}
        </Typography>
      }
    >
      <TableCell onClick={() => editStore.selectCell(cell)} sx={{ border: 'none', p: 0 }}>
        <CustomizedStack
          sx={{
            ...useCellHighlight(cell),
            border: editStore.isSelected(cell) ? `3px solid ${blue[500]}` : '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '8px',
            m: '4px',
            p: 1
          }}
        >
          <Box sx={{ maxWidth: '128px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cell.value.state}</Box>
          <OpenFormIcon
            onClick={(event) => {
              event.stopPropagation()
              editStore.startEditing(cell)
            }}
          />
        </CustomizedStack>
      </TableCell>
    </ScannerXTooltip>
  )
})

// TODO: cleanup
type CustomizedStackProps = Omit<StackProps, 'alignItems' | 'direction' | 'gap' | 'justifyContent'>

const CustomizedStack = ({ children, ...props }: CustomizedStackProps) => (
  <Stack alignItems="center" direction="row" gap={2} justifyContent="space-between" {...props}>
    {children}
  </Stack>
)

type OpenFormIconProps = {
  onClick: MouseEventHandler<SVGSVGElement>
}
const OpenFormIcon = ({ onClick }: OpenFormIconProps) => <Edit fontSize="inherit" onClick={onClick} />

export { MainTableCell }
