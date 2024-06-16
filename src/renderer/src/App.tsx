import { MainView } from '@components/views/MainView'
import { Navbar } from '@components/views/Navbar'
import { SettingsView } from '@components/views/SettingsView'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { HashRouter, Outlet, Route, Routes } from 'react-router-dom'

const App = (): JSX.Element => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Box sx={{ m: 2 }}>
              <Navbar />
              <Divider sx={{ my: 2 }} />
              <Outlet />
            </Box>
          }
        >
          <Route path="/" element={<MainView />} index />
          <Route path="/settings" element={<SettingsView />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export { App }
