import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Layout from './components/layout/Layout';
import EventForm from './components/pages/EventForm';
import { createTheme, ThemeProvider } from '@mui/material';

function App() {
	const theme = createTheme({
		spacing: 1,
	});

    return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="event/new" element={<EventForm />} />
				</Route>
			</Routes>
		</ThemeProvider>
    );
}

export default App;
