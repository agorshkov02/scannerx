import { tooltipClasses } from '@mui/material/Tooltip'
import Tooltip, { TooltipProps } from '@mui/material/Tooltip/Tooltip'
import { styled as styles } from '@mui/material/styles'

const ScannerXTooltip = styles(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} followCursor />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#ffffff',
    boxShadow: theme.shadows[2],
    color: '#000000',
    fontSize: theme.typography.pxToRem(16),
    maxWidth: 512,
    whiteSpace: 'pre-line'
  }
}))

export { ScannerXTooltip }
