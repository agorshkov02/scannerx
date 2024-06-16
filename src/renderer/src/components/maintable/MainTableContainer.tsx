import { MainTable } from '@components/maintable/MainTable'
import { useEditStore } from '@hooks/.'
import TableContainer from '@mui/material/TableContainer'
import { reaction } from 'mobx'
import { useEffect, useState } from 'react'

const MainTableContainer = () => {
  const editStore = useEditStore()

  const [dirs, setDirs] = useState<string[]>([])
  const [vendors, setVendors] = useState<string[]>([])

  useEffect(() => {
    const fetchData = () => {
      const dirs = window.dirsApi.getDirsSync()
      const vendors = window.vendorsApi.getVendorsSync()
      if (dirs.length && vendors.length) {
        setDirs(dirs.sort())
        setVendors(vendors.sort())
      }
    }

    fetchData()

    const dispose = reaction(
      () => !editStore.isEdit,
      () => fetchData()
    )

    const interval = window.settingsApi.getIntervalSync() ?? Infinity
    const intervalId = setInterval(fetchData, interval * 1000)
    return () => {
      dispose()
      clearInterval(intervalId)
    }
  }, [])

  return (
    <TableContainer>
      <MainTable dirs={dirs} vendors={vendors} />
    </TableContainer>
  )
}

export { MainTableContainer }
