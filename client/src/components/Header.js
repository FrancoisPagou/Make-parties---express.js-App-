import React from 'react'
import logo from '../images/log-make-parties.png'
import { Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Login from './pages/Login'
import { Container } from '@mui/system'

function Navbar() {
  return (
    <header>
        <Container maxWidth="xl">
            <Stack 
                direction="row"
                sx={{ 
                    justifyContent: 'space-between',
                    alignItems:'center'
                }}
            >
                <Link to='/'><img src={logo} alt="logo" width={100}/></Link>
                <Link to='/login' element={<Login />}>
                    <Typography variant="button"
                        fontSize={18}
                    >
                        Login
                    </Typography>
                </Link>
            </Stack>
        </Container>
    </header>
  )
}

export default Navbar