import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import {BASE_URL} from '../utils/apiUrl';

function EventCard({img, title, description}) {
	const IMG_PATH = `${BASE_URL}/images`;
	return (
		<Card sx={{ width: '100%', maxWidth: {xs: '100%', sm: '30%'}, mb: 20 }}>
			<CardMedia
				component="img"
				image={`${IMG_PATH}/${img}`}
				alt=""
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" variant="outlined">RSVP</Button>
				<Button size="small" variant="contained">SHOW</Button>
			</CardActions>
		</Card>
	)
}

export default EventCard