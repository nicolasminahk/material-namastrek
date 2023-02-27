import { Card } from '@mui/material'
import React, { useState } from 'react'
import { Calendar } from 'react-calendar'
import Footer from '../components/Footer'
import Navbar from '../components/navbar/Navbar'
import styled from 'styled-components'
// import 'react-calendar/dist/Calendar.css'

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
            <div style={{ marginTop: '100px', flexDirection: 'row' }}>
                <CalendarContainer>
                    <Calendar value={selectedDate} onChange={setSelectedDate} locale="es" />
                </CalendarContainer>
                <div>
                    {activities?.map((activity) => (
                        <Card key={activity.title} activity={activity} />
                    ))}
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}
const CalendarContainer = styled.div`
    /* ~~~ container styles ~~~ */
    max-width: 600px;
    margin: auto;
    margin-top: 20px;
    background-color: #d4f7d4;
    padding: 10px;
    border-radius: 3px;
    /* ~~~ navigation styles ~~~ */
    .react-calendar__navigation {
        display: flex;

        .react-calendar__navigation__label {
            font-weight: bold;
        }

        .react-calendar__navigation__arrow {
            flex-grow: 0.333;
        }
    }
    /* ~~~ label styles ~~~ */
    .react-calendar__month-view__weekdays {
        text-align: center;
    }
    /* ~~~ button styles ~~~ */
    button {
        margin: 3px;
        background-color: #6f876f;
        border: 0;
        border-radius: 3px;
        color: white;
        padding: 5px 0;

        &:hover {
            background-color: #556b55;
        }

        &:active {
            background-color: #a5c1a5;
        }
    }
    /* ~~~ day grid styles ~~~ */
    .react-calendar__month-view__days {
        display: grid !important;
        grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;

        .react-calendar__tile {
            max-width: initial !important;
        }
    }
    /* ~~~ neighboring month & weekend styles ~~~ */
    .react-calendar__month-view__days__day--neighboringMonth {
        opacity: 0.7;
    }
    .react-calendar__month-view__days__day--weekend {
        color: #dfdfdf;
    }
    /* ~~~ active day styles ~~~ */
    .react-calendar__tile--range {
        box-shadow: 0 0 6px 2px black;
    }
    /* ~~~ other view styles ~~~ */
    .react-calendar__year-view__months,
    .react-calendar__decade-view__years,
    .react-calendar__century-view__decades {
        display: grid !important;
        grid-template-columns: 20% 20% 20% 20% 20%;

        &.react-calendar__year-view__months {
            grid-template-columns: 33.3% 33.3% 33.3%;
        }

        .react-calendar__tile {
            max-width: initial !important;
        }
    }
`
export default Home
