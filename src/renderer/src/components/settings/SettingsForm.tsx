import { mapFieldError } from '@components/commons/utils'
import Autocomplete from '@mui/material/Autocomplete'
import Button, { ButtonProps } from '@mui/material/Button'
import Stack, { StackProps } from '@mui/material/Stack'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'

const PATH_MAX_LENGTH = 2048
const INTERVAL_MAX_SECONDS = 256

type SettingsFormData = {
  interval: number
  path: string
}

const SettingsForm = () => {
  const interval = window.settingsApi.getIntervalSync() ?? 0
  const path = window.settingsApi.getPathSync() ?? ''
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SettingsFormData>({
    defaultValues: {
      interval,
      path
    }
  })

  const onSubmit: SubmitHandler<SettingsFormData> = (data: SettingsFormData) => {
    window.settingsApi.setIntervalSync(data.interval) // TODO: through store
    window.settingsApi.setPathSync(data.path) // TODO: through store
  }

  return (
    <CustomizedStack component="form" onSubmit={handleSubmit(onSubmit)}>
      <Autocomplete
        defaultValue={path}
        freeSolo
        fullWidth
        options={window.settingsApi.getPathVariants()}
        renderInput={(params) => (
          <TextField
            label="Path"
            {...mapFieldError(errors.path, `Path must be specified, be less than ${PATH_MAX_LENGTH} characters`)}
            {...register('path', {
              maxLength: {
                value: PATH_MAX_LENGTH,
                message: `Path length must be less than ${PATH_MAX_LENGTH} characters`
              },
              required: 'Path must be specified'
            })}
            {...params}
          />
        )}
      />
      <IntervalTextField
        {...mapFieldError(errors.interval, `Interval must be specified, be less than ${INTERVAL_MAX_SECONDS} seconds`)}
        InputProps={{
          inputProps: {
            ...register('interval', {
              max: {
                value: PATH_MAX_LENGTH,
                message: `Interval must be less then ${PATH_MAX_LENGTH} seconds`
              },
              required: 'Interval must be specified'
            })
          }
        }}
      />
      <CustomizedButton>Save</CustomizedButton>
    </CustomizedStack>
  )
}

type IntervalTextFieldProps = Omit<CustomizedTextFieldProps, 'label' | 'type'>

const IntervalTextField = (props: IntervalTextFieldProps) => <CustomizedTextField label="Interval" type="number" {...props} />

// TODO: cleanup
type CustomizedTextFieldProps = Omit<TextFieldProps, 'fullWidth'>

const CustomizedTextField = (props: CustomizedTextFieldProps) => <TextField fullWidth {...props} />

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

export { SettingsForm }
