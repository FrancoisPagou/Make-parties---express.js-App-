import React, { useEffect, useState } from 'react';
import { Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { events as dumpEvemps} from '../../data/events';
import { BASE_URL } from '../../utils/apiUrl';
import EventList from '../EventList';

function Home() {
    const [events, setEvents] = useState(dumpEvemps);
    const [isLodding, setIsLodding] = useState(true)
    
    useEffect(() => {
        async function getAllEvents() {
            const {data} = await axios.get(BASE_URL, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("data events: ", data);
            setEvents(data);
        }
        getAllEvents();
        setIsLodding(false);
    }, [isLodding]);

    return (
        <>
            <Stack>
                <Typography variant='h3'>
                    Events
                </Typography> 
            </Stack>
            <Link to="/event/new">
                <Button variant="contained" sx={{mt: 15}}>
                    Create event
                </Button>
            </Link>
            <Stack 
                direction='row'
                flexWrap='wrap'
                sx={{mt: 40}}
                gap={20}
            >
                <EventList events={events} />
            </Stack>
        </>
    )
}

export default Home