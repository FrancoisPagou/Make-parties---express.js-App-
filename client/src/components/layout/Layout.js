import { Container } from '@mui/system'
import React from 'react';
import Header from '../Header';

function Layout({children}) {
  return (
        <React.Fragment>
            <Container maxWidth='lg'>
                <Header />
                    <main className='page__content'>
                        {children}
                    </main>
            </Container>
        </React.Fragment>
    )
}

export default Layout