import { Container } from '@mui/system'
import React from 'react'

function Layout({children}) {
  return (
    <Container maxWidth='lg'>
        {children}
    </Container>
  )
}

export default Layout