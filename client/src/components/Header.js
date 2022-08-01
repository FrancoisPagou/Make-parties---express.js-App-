import React from 'react'
import logo from '../images/log-make-parties.png'
import { Box, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header>
        <Stack 
            direction="row" 
            spacing={2}
            sx={{ 
                justifyContent: 'space-between',
                alignItems:'center'
            }}
        >
            <Box id="logo">
                <Link to='/'><img src={logo} alt="logo" width={100}/></Link>
            </Box>
            <Box className='account'>
                <a href='/login'>
                    <Typography>
                        Login
                    </Typography>
                </a>
            </Box>
        </Stack>
    </header>
  )
}

export default Navbar