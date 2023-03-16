import React, { useState } from 'react'
import { Calendar } from 'react-calendar'
import { Box, Divider, Typography } from '@mui/material'
import styled from 'styled-components'
import { format } from 'date-fns'
import dayjs from 'dayjs'

const StyledDot = styled(Box)`
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: #1976d2;
`

const CalendarComponent = ({ activities }) => {
    const [selectedDate, setSelectedDate] = useState(null)
    const currentDate = dayjs()

    const renderDay = (date) => {
        // const activitiesOnDay = getActivities(date)

        return (
            <Box position="relative" height="100%">
                {activities.length > 0 && <StyledDot position="absolute" top={0} left={0} />}
                <Typography>{date.getDate()}</Typography>
            </Box>
        )
    }

    return (
        // <Box sx={{ marginTop: '100px', display: 'flex', flexDirection: 'row' }}>
        <>
            <CalendarContainer>
                <Calendar
                    value={selectedDate}
                    onChange={setSelectedDate}
                    locale="es"
                    tileContent={({ date }) => {
                        // const activitiesOnDay = getActivities(date)

                        return activities.length > 0 ? <StyledDot /> : null
                    }}
                    tileClassName={({ date }) => {
                        // const activitiesOnDay = getActivities(date)
                        //en vez de activitesONDay seria las activities que ya vienen filtradas
                        return activities.length > 0 ? 'highlight' : null
                    }}
                    calendarType="ISO 8601"
                    showNeighboringMonth={false}
                    minDate={new Date()}
                    showNavigation={true}
                    tileDisabled={({ activeStartDate, date, view }) => view === 'month' && date < activeStartDate}
                    renderDay={renderDay}
                />
            </CalendarContainer>
            {selectedDate && (
                <Box sx={{ marginTop: '20px' }}>
                    {/* <Typography>{`Actividades  ${format(selectedDate, 'PP')}:`}</Typography> */}
                    {activities.map((activity) => (
                        // <Box key={activity.id} sx={{ marginTop: '10px', backgroundColor: 'white' }}>
                        <Box
                            key={activity.id}
                            sx={{
                                flex: 1,
                                width: '100%',
                                maxWidth: '600px',
                                bgcolor: '#FFFFFF',
                                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
                                borderRadius: '10px',
                                padding: '30px',
                                mb: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mt: 4,
                                mx: 3,
                                '@media (min-width: 600px)': {
                                    mx: 'auto',
                                },
                            }}
                        >
                            <Typography variant="h6">{activity.name}</Typography>
                            <Typography>{activity.description}</Typography>
                            <Typography>{activity.date}</Typography>
                            <Typography>{activity.price}</Typography>
                            <Divider style={{ color: 'green' }} />
                        </Box>
                    ))}
                </Box>
            )}
        </>
        // </Box>
    )
}

export default CalendarComponent

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
