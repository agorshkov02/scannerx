import { ScannerXTooltip } from '@components/commons/ScannerXTooltip'
import { mapFieldError } from '@components/commons/utils'
import { useEditStore } from '@hooks/.'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stack, { StackProps } from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SELECTED_CELLS_CROWDED_BOUND = 8

const COMMENTS_MAX_LENGTH = 2048
const COMMENTS_MAX_ROWS = 16
const COMMENTS_MIN_ROWS = 4

const STATE_MAX_LENGTH = 256
const STATE_OPTIONS = ['Added', 'Rejected', 'Waiting']

type EditFormFormData = {
  comments: string
  state: string
}

const EditForm = observer(() => {
  const editStore = useEditStore()

  const { comments, state } = useMemo(() => {
    if (editStore.isSelectedFew) {
      return { comments: '', state: '-' }
    } else {
      return editStore.selectedCells[0].value
    }
  }, editStore.selectedCells)

  const isSelectedCellsCrowded = useMemo(() => editStore.selectedCells.length > SELECTED_CELLS_CROWDED_BOUND, [editStore.selectedCells])

  const visibleSelectedCells = useMemo(() => editStore.selectedCells.slice(0, SELECTED_CELLS_CROWDED_BOUND), [editStore.selectedCells])

  const unvisibleSelectedCells = useMemo(() => editStore.selectedCells.slice(SELECTED_CELLS_CROWDED_BOUND), [editStore.selectedCells])

  const unvisibleSelectedCellsLength = useMemo(() => unvisibleSelectedCells.length, [unvisibleSelectedCells])

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<EditFormFormData>({
    defaultValues: {
      comments,
      state
    }
  })

  const onSubmit: SubmitHandler<EditFormFormData> = (data: EditFormFormData) => {
    editStore.selectedCells.forEach((selectedCell) => {
      const { dir, vendor } = selectedCell.key
      const { comments, state } = { comments: data.comments, state: data.state }
      window.persistApi.setSync({ dir, vendor }, { comments, state }) // TODO: through store
    })
    editStore.stopEditing()
  }

  return (
    <CustomizedStack component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ my: 1 }}>
        {visibleSelectedCells.map((selectedCell, i) => (
          <Box key={`${selectedCell.key.dir}:${selectedCell.key.vendor}:${i}`}>
            <Typography>
              <Box sx={{ textTransform: 'capitalize' }}>
                <Box component="span" sx={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {selectedCell.key.dir}
                </Box>
                <Box component="span" sx={{ display: 'inline-block', fontWeight: 600, mx: '8px', transform: 'scale(0.8)' }}>
                  •
                </Box>
                <Box component="span" sx={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {selectedCell.key.vendor}
                </Box>
              </Box>
            </Typography>
            <Divider sx={{ my: 1 }} />
          </Box>
        ))}
      </Box>
      {isSelectedCellsCrowded && (
        <ScannerXTooltip
          title={
            <Box sx={{ my: 1 }}>
              {unvisibleSelectedCells.map((selectedCell, i) => (
                <Box key={`${selectedCell.key.dir}:${selectedCell.key.vendor}:${i}`}>
                  <Typography>
                    <Box sx={{ textTransform: 'capitalize' }}>
                      <Box component="span" sx={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {selectedCell.key.dir}
                      </Box>
                      <Box component="span" sx={{ display: 'inline-block', fontWeight: 600, mx: '8px', transform: 'scale(0.8)' }}>
                        •
                      </Box>
                      <Box component="span" sx={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {selectedCell.key.vendor}
                      </Box>
                    </Box>
                  </Typography>
                  {unvisibleSelectedCellsLength > 1 && unvisibleSelectedCellsLength !== i + 1 && <Divider sx={{ my: 1 }} />}
                </Box>
              ))}
            </Box>
          }
        >
          <Typography>
            <Box component="span" sx={{ fontWeight: 600 }}>
              ...
            </Box>
            <Divider sx={{ my: 1 }} />
          </Typography>
        </ScannerXTooltip>
      )}
      <Autocomplete
        defaultValue={state}
        freeSolo
        fullWidth
        options={STATE_OPTIONS}
        renderInput={(params) => (
          <TextField
            label="State"
            {...mapFieldError(errors.state, `State must be specified and be between less than ${STATE_MAX_LENGTH} characters`)}
            {...register('state', {
              maxLength: {
                value: STATE_MAX_LENGTH,
                message: `State must be less than ${STATE_MAX_LENGTH} characters`
              },
              required: 'State must be specified'
            })}
            {...params}
          />
        )}
      />
      <TextField
        fullWidth
        label="Comments"
        maxRows={COMMENTS_MAX_ROWS}
        minRows={COMMENTS_MIN_ROWS}
        multiline
        {...mapFieldError(errors.comments, `Comments must be less than ${COMMENTS_MAX_LENGTH} characters`)}
        {...register('comments', {
          maxLength: {
            value: COMMENTS_MAX_LENGTH,
            message: `Comments must be less than ${COMMENTS_MAX_LENGTH} characters`
          }
        })}
      />
      <CustomizedButton>Save</CustomizedButton>
    </CustomizedStack>
  )
})

// TODO: cleanup
type CustomizedStackProps = Omit<StackProps, 'spacing' | 'sx'>

const CustomizedStack = ({ children, ...props }: CustomizedStackProps) => (
  <Stack
    spacing={2}
    sx={{
      backgroundColor: '#ffffff',
      boxShadow: 2,
      left: '50%',
      p: 2,
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400
    }}
    {...props}
  >
    {children}
  </Stack>
)

// TODO: cleanup
type CustomizedButtonProps = Omit<ButtonProps, 'type' | 'variant'>

const CustomizedButton = ({ children, ...props }: CustomizedButtonProps) => (
  <Button type="submit" variant="contained" sx={{ mb: 2 }} {...props}>
    {children}
  </Button>
)

export { EditForm }
