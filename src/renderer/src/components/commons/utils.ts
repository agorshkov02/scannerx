import { TextFieldProps } from '@mui/material/TextField'
import { FieldError } from 'react-hook-form'

const mapFieldError = (
  error: FieldError | undefined,
  helperTextPlaceholder: string | undefined
): TextFieldProps => {
  return {
    error: !!error,
    helperText: error?.message ?? helperTextPlaceholder
  }
}

export { mapFieldError }
