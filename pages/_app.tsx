import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, IconButton, Menu, MenuItem, Toolbar } from '@mui/material'
import { useState } from 'react'
import { Container } from '@mui/system'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function MyApp({ Component, pageProps }: AppProps) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return <>
    <AppBar>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem>
            <Link onClick={handleClose} href="/">Students</Link>
          </MenuItem>
          <MenuItem>
            <Link onClick={handleClose} href="/inprocess">In Process</Link>
          </MenuItem>
          <MenuItem>
            <Link onClick={handleClose} href="/create">Create</Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
    <Container sx={{
      marginTop: '94px'
    }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Component {...pageProps} />
      </LocalizationProvider>
    </Container>
  </>
}

export default MyApp
