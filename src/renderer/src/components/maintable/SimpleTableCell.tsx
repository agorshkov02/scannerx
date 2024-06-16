import TableCell, { TableCellProps } from '@mui/material/TableCell'

type SimpleTableCellProps = Omit<TableCellProps, 'sx'>

const SimpleTableCell = ({ children, ...props }: SimpleTableCellProps) => (
  <TableCell
    sx={{
      border: 'none',
      maxWidth: '128px',
      minWidth: '128px',
      overflow: 'hidden',
      padding: '8px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }}
    {...props}
  >
    {children}
  </TableCell>
)

export { SimpleTableCell }
