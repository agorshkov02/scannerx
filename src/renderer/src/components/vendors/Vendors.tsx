import { useVendorsStore } from '@hooks/.'
import Chip from '@mui/material/Chip'
import Stack, { StackProps } from '@mui/material/Stack'
import { observer } from 'mobx-react-lite'

const Vendors = observer(() => {
  const vendorsStore = useVendorsStore()

  return (
    <CustomizedStack>
      {vendorsStore.vendors.map((vendor, i) => (
        <Chip
          key={`${vendor}:${i}`}
          label={vendor}
          onDelete={() => {
            window.vendorsApi.deleteVendorSync(vendor) // TODO: through store
            vendorsStore.vendors = window.vendorsApi.getVendorsSync()
          }}
        />
      ))}
    </CustomizedStack>
  )
})

// TODO: cleanup
type CustomizedStackProps = Omit<StackProps, 'direction' | 'gap' | 'sx'>

const CustomizedStack = ({ children, ...props }: CustomizedStackProps) => (
  <Stack direction="row" gap={1} sx={{ mt: 3 }} {...props}>
    {children}
  </Stack>
)

export { Vendors }
