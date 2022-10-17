import React from 'react';
import EventCard from './EventCard';

function EventList({events}) {
    return (
        <>
            {
                events.map((event, index) => (
                    <EventCard 
                        key={index}
                        img={event.imgUrl}
                        title={event.title}
                        description={event.desc}
                    />
                ))
            }
        </>
    )
}

export default EventList
