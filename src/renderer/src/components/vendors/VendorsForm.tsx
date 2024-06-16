import vendorsfeed from '@assets/vendors-feed.json'
import { mapFieldError } from '@components/commons/utils'
import { useVendorsStore } from '@hooks/.'
import Autocomplete from '@mui/material/Autocomplete'
import Button, { ButtonProps } from '@mui/material/Button'
import Stack, { StackProps } from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const VENDOR_MAX_LENGTH = 256

type VendorsFormData = {
  vendor: string
}

const VendorsForm = () => {
  const vendorsStore = useVendorsStore()

  useEffect(() => {
    vendorsStore.vendors = window.vendorsApi.getVendorsSync()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<VendorsFormData>({
    defaultValues: {
      vendor: ''
    }
  })

  const onSubmit: SubmitHandler<VendorsFormData> = (data: VendorsFormData) => {
    window.vendorsApi.addVendorSync(data.vendor) // TODO: through store
    vendorsStore.vendors = window.vendorsApi.getVendorsSync()
  }

  return (
    <CustomizedStack component="form" onSubmit={handleSubmit(onSubmit)}>
      <Autocomplete
        defaultValue={''}
        freeSolo
        fullWidth
        options={vendorsfeed.vendors.sort()}
        renderInput={(params) => (
          <TextField
            label="Vendor"
            {...mapFieldError(errors.vendor, `Vendor must be specified, be less than ${VENDOR_MAX_LENGTH} characters`)}
            {...register('vendor', {
              maxLength: {
                value: VENDOR_MAX_LENGTH,
                message: `Vendor length must be less than ${VENDOR_MAX_LENGTH} characters`
              },
              required: 'Vendor must be specified'
            })}
            {...params}
          />
        )}
      />
      <CustomizedButton>Add</CustomizedButton>
    </CustomizedStack>
  )
}

// TODO: cleanup
type CustomizedStackProps = Omit<StackProps, 'direction' | 'gap' | 'sx'>

const CustomizedStack = ({ children, ...props }: CustomizedStackProps) => (
  <Stack direction="row" gap={1} sx={{ mt: 3 }} {...props}>
    {children}
  </Stack>
)

// TODO: cleanup
type CustomizedButtonProps = Omit<ButtonProps, 'type' | 'variant' | 'sx'>

const CustomizedButton = ({ children, ...props }: CustomizedButtonProps) => (
  <Button type="submit" variant="contained" sx={{ mb: 3 }} {...props}>
    {children}
  </Button>
)

export { VendorsForm }
