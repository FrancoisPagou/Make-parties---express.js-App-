import React from 'react';
import EventCard from './EventCard';

function EventList({events}) {
    return (
        <>
            {
                events.map((event, index) => (
                    <EventCard 
                        key={index}
                        img={event.image}
                        title={event.title}
                        description={event.description}
                    />
                ))
            }
        </>
    )
}

export default EventList
