import { Card } from '@mui/material'
import React, { useState } from 'react'
import { Calendar } from 'react-calendar'
import Footer from '../components/Footer'
import Navbar from '../components/navbar/Navbar'

function getActivities(date) {
    // Remplazar por la llamada a la base de datos
    const activities = [
        {
            title: 'Actividad 1',
            date: '2023-02-15',
            description: 'Descripción de la actividad 1',
        },
        {
            title: 'Actividad 2',
            date: '2023-02-20',
            description: 'Descripción de la actividad 2',
        },
        {
            title: 'Actividad 3',
            date: '2023-02-22',
            description: 'Descripción de la actividad 3',
        },
        {
            title: 'Actividad 4',
            date: '2023-02-28',
            description: 'Descripción de la actividad 4',
        },
    ]

    return activities.filter((activity) => activity.date === date.toISOString().slice(0, 10))
}

const Home = ({ activities }) => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    return (
        <>
            <Navbar />
            <div>
                <Calendar value={selectedDate} onChange={setSelectedDate} locale="es" />
                <div>
                    {activities.map((activity) => (
                        <Card key={activity.title} activity={activity} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home
