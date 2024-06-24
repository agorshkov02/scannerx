import { MainTableCell } from '@components/maintable/MainTableCell'
import { SimpleTableCell } from '@components/maintable/SimpleTableCell'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Stack, { StackProps } from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody, { TableBodyProps } from '@mui/material/TableBody'
import TableHead, { TableHeadProps } from '@mui/material/TableHead'
import TableRow, { TableRowProps } from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { MouseEventHandler, useMemo, useState } from 'react'

type Sort = 'asc' | 'desc'

type MainTableProps = {
  dirs: string[]
  vendors: string[]
}

const MainTable = ({ dirs, vendors }: MainTableProps) => {
  const [sort, setSort] = useState<Sort>('asc')

  const isEmpty = useMemo(() => dirs.length === 0 || vendors.length === 0, [dirs, vendors])

  const sortedDirs = useMemo(() => {
    const reverseNeeded = sort === 'desc'
    return reverseNeeded ? dirs.sort().reverse() : dirs.sort()
  }, [sort, dirs])

  return (
    <>
      {isEmpty && (
        <Typography sx={{ textAlign: 'center' }}>
          <Box>Check that the path you specified exists and is available, and that at least one vendor is specified.</Box>
        </Typography>
      )}
      {!isEmpty && (
        <Table sx={{ m: '0 auto 16px auto', tableLayout: 'auto', width: 'auto' }}>
          <Box sx={{ m: '8px' }}>
            <MainTableHead>
              <MainTableRow>
                <SimpleTableCell>
                  <CustomizedStack>
                    Directory
                    {sort === 'asc' ? <DownwardFormIcon onClick={() => setSort('desc')} /> : <UpwardSortIcon onClick={() => setSort('asc')} />}
                  </CustomizedStack>
                </SimpleTableCell>
                {[...vendors].map((vendor, i) => (
                  <SimpleTableCell key={`${vendor}:${i}`}>{vendor}</SimpleTableCell>
                ))}
              </MainTableRow>
            </MainTableHead>
            <MainTableBody>
              {sortedDirs.map((dir, i) => (
                <MainTableRow key={`${dir}:${i}`}>
                  <SimpleTableCell>{dir}</SimpleTableCell>
                  {vendors.map((vendor, j) => {
                    const key = { dir, vendor }
                    return (
                      <MainTableCell
                        cell={{ key, value: window.persistApi.getSync(key) }}
                        key={`${dir}:${vendor}:${j}`}
                        sx={{
                          width: 'auto',
                          whiteSpace: 'nowrap',
                          padding: '8px'
                        }}
                      />
                    )
                  })}
                </MainTableRow>
              ))}
            </MainTableBody>
          </Box>
        </Table>
      )}
    </>
  )
}

type MainTableBodyProps = TableBodyProps

const MainTableBody = ({ children, ...props }: MainTableBodyProps) => <TableBody {...props}>{children}</TableBody>

type MainTableHeadProps = TableHeadProps

const MainTableHead = ({ children, ...props }: MainTableHeadProps) => <TableHead {...props}>{children}</TableHead>

type MainTableRowProps = TableRowProps

const MainTableRow = ({ children, ...props }: MainTableRowProps) => <TableRow {...props}>{children}</TableRow>

type SortIconIconProps = {
  onClick: MouseEventHandler<SVGSVGElement>
}

const DownwardFormIcon = ({ onClick }: SortIconIconProps) => <ArrowDownward fontSize="inherit" onClick={onClick} />

const UpwardSortIcon = ({ onClick }: SortIconIconProps) => <ArrowUpward fontSize="inherit" onClick={onClick} />

// TODO: cleanup
type CustomizedStackProps = Omit<StackProps, 'alignItems' | 'direction' | 'gap'>

const CustomizedStack = ({ children, ...props }: CustomizedStackProps) => (
  <Stack alignItems="center" direction="row" gap={1} {...props}>
    {children}
  </Stack>
)

export { MainTable }
