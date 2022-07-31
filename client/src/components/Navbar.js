import React from 'react'
import logo from '../images/log-make-parties.png'
import { Box, Container, Stack, Typography } from '@mui/material'

function Navbar() {
  return (
    <header>
        <Container maxWidth="lg">
            <Stack 
                direction="row" 
                spacing={2}
                sx={{ 
                    justifyContent: 'space-between',
                    alignItems:'center'
                }}
            >
                <Box id="logo">
                    <img src={logo} alt="logo" width={100}/>
                </Box>
                <Box className='account'>
                    <a href='/login'>
                        <Typography>
                            Login
                        </Typography>
                    </a>
                </Box>
            </Stack>
        </Container>
        
    </header>
  )
}

export default Navbar