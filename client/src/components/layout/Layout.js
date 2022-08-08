import { Container } from '@mui/system'
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

function Layout() {
  return (
        <React.Fragment>
            <Header />
            <Container maxWidth='lg'>
                <main className='page__content'>
                    <Outlet />
                </main>
            </Container>
        </React.Fragment>
    )
}

export default Layout