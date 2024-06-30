import { MainTableCell } from '@components/maintable/MainTableCell'
import { SimpleTableCell } from '@components/maintable/SimpleTableCell'
import { ArrowDownward, ArrowUpward, Sort } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Stack, { StackProps } from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody, { TableBodyProps } from '@mui/material/TableBody'
import TableHead, { TableHeadProps } from '@mui/material/TableHead'
import TableRow, { TableRowProps } from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { useMemo, useState } from 'react'

type Sort = {
  direction: 'asc' | 'desc'
  vendor: string
}

const DEFAULT_SORT: Sort = {
  direction: 'asc',
  vendor: 'Directory'
}

type MainTableProps = {
  dirs: string[]
  vendors: string[]
}

const MainTable = ({ dirs, vendors }: MainTableProps) => {
  const [sort, setSort] = useState<Sort>(DEFAULT_SORT)

  const isEmpty = useMemo(() => dirs.length === 0 || vendors.length === 0, [dirs, vendors])

  const now = useMemo(() => Date.now(), [])

  const rows = useMemo(() => {
    const firstRow = ['Directory', ...vendors].map((vendor) => ({
      key: { dir: undefined, vendor },
      value: { state: vendor, comments: undefined } // use vendor as state
    }))

    const rows = dirs.map((dir) => {
      const firstCell = {
        key: { dir, vendor: 'Directory' },
        value: { state: dir, comments: undefined } // use dir as state
      }

      return [
        firstCell,
        ...vendors.map((vendor) => {
          const key = { dir, vendor }
          const value = window.persistApi.getSync(key)
          return { key, value }
        })
      ]
    })

    rows.sort((row1, row2) => {
      const state1 = row1.find((cell) => {
        const {
          key: { vendor }
        } = cell
        return sort.vendor === vendor 
      })?.value?.state

      const state2 = row2.find((cell) => {
        const {
          key: { vendor }
        } = cell
        return sort.vendor === vendor
      })?.value?.state

      if (!state1 && !state2) {
        return 0
      }

      if (!state1) {
        return -1
      }

      if (!state2) {
        return 1
      }

      const localCompare = state1.localeCompare(state2)
      return sort.direction === 'asc' ? localCompare : -localCompare
    })

    return [firstRow, ...rows]
  }, [dirs, vendors, sort])

  return (
    <>
      {isEmpty && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography color='error'>Check that the path you specified exists and is available, and that at least one vendor is specified.</Typography>
        </Box>
      )}
      {!isEmpty && (
        <Table sx={{ m: '0 auto 16px auto', tableLayout: 'auto', width: 'auto' }}>
          <MainTableHead>
            <MainTableRow>
              {rows[0].map((cell, i) => {
                const {
                  key: { vendor }
                } = cell
                return (
                  <SimpleTableCell key={`${now}:${i}`}>
                    <CustomizedStack>
                      {vendor}
                      {sort.vendor === vendor ? (
                        sort.direction === 'asc' ? (
                          <ArrowDownward fontSize="inherit" onClick={() => setSort({ direction: 'desc', vendor })} />
                        ) : (
                          <ArrowUpward fontSize="inherit" onClick={() => setSort({ direction: 'asc', vendor })} />
                        )
                      ) : (
                        <Sort fontSize="inherit" onClick={() => setSort({ direction: 'asc', vendor })} />
                      )}
                    </CustomizedStack>
                  </SimpleTableCell>
                )
              })}
            </MainTableRow>
          </MainTableHead>
          <MainTableBody>
            {rows.slice(1).map((row, i) => (
              <MainTableRow key={`${now}:${i}`}>
                <SimpleTableCell>{row[0].value.state}</SimpleTableCell>
                {row.slice(1).map((cell, j) => (
                  <MainTableCell key={`${now}:${i}:${j}`} cell={cell} />
                ))}
              </MainTableRow>
            ))}
          </MainTableBody>
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

// TODO: cleanup
type CustomizedStackProps = Omit<StackProps, 'alignItems' | 'direction' | 'gap'>

const CustomizedStack = ({ children, ...props }: CustomizedStackProps) => (
  <Stack alignItems="center" direction="row" gap={1} {...props}>
    {children}
  </Stack>
)

export { MainTable }
