import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

function EventCard({image, title, desc}) {
	return (
		<Card sx={{ width: '100%', maxWidth: {xs: '100%', sm: '30%'}, mb: 20 }}>
			<CardMedia
				component="img"
				image={image}
				alt="green iguana"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{desc}
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