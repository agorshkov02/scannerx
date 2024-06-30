import { Home, Settings } from '@mui/icons-material'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Stack, { StackProps } from '@mui/material/Stack'
import { useNavigate } from 'react-router-dom'

const Navbar = () => (
  <CustomizedStack>
    <HomeIconButtonWithTooltip />
    <SettingsIconButtonWithTooltip />
  </CustomizedStack>
)

const HomeIconButtonWithTooltip = () => (
  <NavigateIconButton to="/">
    <Home />
  </NavigateIconButton>
)

const SettingsIconButtonWithTooltip = () => (
  <NavigateIconButton to="/settings">
    <Settings />
  </NavigateIconButton>
)

type NavigateIconButtonProps = IconButtonProps & {
  to: string
}

const NavigateIconButton = ({ children, to }: NavigateIconButtonProps) => {
  const navigate = useNavigate()
  
  return <IconButton onClick={() => navigate(to)}>{children}</IconButton>
}

// TODO: cleanup
type CustomizedStackProps = Omit<StackProps, 'direction' | 'gap' | 'justifyContent'>

const CustomizedStack = ({ children, ...props }: CustomizedStackProps) => (
  <Stack direction="row" gap={2} justifyContent="end" {...props}>
    {children}
  </Stack>
)

export { Navbar }
