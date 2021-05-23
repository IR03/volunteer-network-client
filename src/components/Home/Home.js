import React, { useEffect, useState } from 'react';
import Event from '../Event/Event';


const Home = () => {

    const [events, setEvents] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:5001/events')
        .then(res => res.json())
        .then(data => setEvents(data))

    }, [])

    return (
        <div className="row">
            {
                events.map(event =><Event key={event._id} event={event}></Event>)
            }
        </div>
    );
};

export default Home;