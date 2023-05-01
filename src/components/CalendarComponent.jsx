import React, { useState } from 'react'
import { Calendar } from 'react-calendar'
import { Box, Button, Divider, Typography } from '@mui/material'
import styled from 'styled-components'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useAuth0 } from '@auth0/auth0-react'
import { gql, useMutation } from '@apollo/client'

const StyledDot = styled(Box)`
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: #1976d2;
    transform: translateX(-120%);
`
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('America/Argentina/Buenos_Aires')

const ADD_PERSON_EXIT = gql`
    mutation AddPersonExit($salida: String!, $auth0UserId: String!) {
        addPersonExit(salida: $salida, auth0UserId: $auth0UserId) {
            name
            date
            id
            price
        }
    }
`
function extractNumbers(inputString) {
    return inputString?.replace(/\D/g, '')
}
const CalendarComponent = ({ activities }) => {
    const [selectedDate, setSelectedDate] = useState(null)
    const [date, setDate] = useState(new Date())
    const { user, isAuthenticated, error: errorAuth0, isLoading: loadingAuth0 } = useAuth0()
    const userDepure = extractNumbers(user?.sub)
    const [idSalida, setIdSalida] = useState('')
    // console.log(activities)
    // console.log(selectedDate)

    const [addPersonExit] = useMutation(ADD_PERSON_EXIT, {
        variables: {
            auth0UserId: userDepure,
            salida: idSalida,
        },
    })

    const renderDay = (date, _view) => {
        const activitiesOnDay = activities?.filter((activity) => {
            return dayjs(activity.date).isSame(date, 'day')
        })
        console.log(activitiesOnDay)

        return (
            <Box position="relative" height="100%">
                {activitiesOnDay.length > 0 && (
                    <StyledDot position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />
                )}
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    {date.getDate()}
                </Box>
            </Box>
        )
    }
    const esLocale = {
        locale: 'es',
        weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    }

    const filteredActivities = selectedDate
        ? activities?.filter((activity) => {
              const activityDate = dayjs(activity.date).tz()
              const selectedDateFormatted = dayjs(selectedDate).tz()
              console.log(activityDate.$d, 'COMA', selectedDateFormatted.$d)
              console.log(activityDate.isSame(selectedDateFormatted, 'day'))
              return activityDate.isSame(selectedDateFormatted, 'day')
          })
        : []

    console.log('filter', filteredActivities)

    return (
        <Box sx={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'colum' }}>
            <CalendarContainer>
                <Calendar
                    value={selectedDate}
                    onChange={setSelectedDate}
                    locale={esLocale}
                    tileContent={({ date }) => {
                        const activitiesOnDay = activities?.filter((activity) => {
                            return dayjs(activity.date).isSame(date, 'day')
                        })

                        return activitiesOnDay?.length > 0 ? <StyledDot position="absolute" /> : null
                    }}
                    tileClassName={({ date }) => {
                        const activitiesOnDay = activities?.filter((activity) => {
                            return dayjs(activity?.date).isSame(date, 'day')
                        })

                        return activitiesOnDay?.length > 0 ? 'highlight' : null
                    }}
                    calendarType="ISO 8601"
                    showNeighboringMonth={false}
                    minDate={new Date()}
                    showNavigation={true}
                    tileDisabled={({ activeStartDate, date, view }) => view === 'month' && date < activeStartDate}
                    renderDay={renderDay}
                />
            </CalendarContainer>
            {filteredActivities?.length > 0 && (
                <Box sx={{ marginTop: '20px' }}>
                    {filteredActivities.map((activity) => (
                        <Box
                            key={activity.id}
                            sx={{
                                flex: 1,
                                width: '50%',
                                maxWidth: '400px',
                                bgcolor: '#F9AF5F',
                                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
                                borderRadius: '20px',
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
                            <Typography>{activity.duration}</Typography>
                            {user && (
                                <Button
                                    variant="contained"
                                    color="success"
                                    sx={{
                                        mt: 2,
                                        alignSelf: 'flex-end',
                                        '@media (max-width:600px)': { alignSelf: 'center', mt: 4 },
                                    }}
                                    onClick={() => {
                                        setIdSalida(activity.id)
                                        addPersonExit()
                                    }}
                                >
                                    Reservar Ahora
                                </Button>
                            )}
                            <Divider style={{ color: 'green' }} />
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    )
}

export default CalendarComponent

const CalendarContainer = styled.div`
    max-width: 600px;
    margin: auto;
    margin-top: 20px;
    background-color: #d4f7d4;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
   

    button {
        background-color: #d4f7d4;
        border: none;
        color: #388e3c;
        // margin: 10px;
        // margin: 4px;
        width: 30px;

        &:hover {
            background-color: #556b55;
        }

        &:active {
            background-color: #a5c1a5;
        }
    }


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
    .react-calendar__tile {
        max-width: initial !important;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 50px;
        padding: 3px;
        border-radius: 10%;
        cursor: pointer;

        &.react-calendar__tile--active {
            background-color: #6f876f;
            color: white;

            &:hover {
                background-color: #556b55;
            }
        }
        // .calendar-weekdays {
        //     display: grid;
        //     grid-template-columns: repeat(7, 1fr);
        //     text-align: center;
        //     font-weight: bold;
        //     margin-bottom: 10px;
        //     color: #7a869a;
        // }
        .react-calendar__month-view__weekdays {
            display: flex;
            justify-content: center; /* centrar horizontalmente */
            align-items: center; /* centrar verticalmente */
            margin-bottom: 4px; /* agregar un margen inferior para separar de los botones */
        }
    
        .react-calendar__month-view__weekdays__weekday {
            color: #388E3C;
            font-family: Arial;
            font-size: 14px;
            font-weight: 600;
            text-align: center; /* centrar el texto */
            flex-basis: 0; /* permitir que el ancho del elemento se ajuste automáticamente */
            flex-grow: 1; /* permitir que el elemento crezca para llenar el contenedor */
        }

        .calendar-day {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 40px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 50%;

            &--selected {
                background-color: #50c878;
                color: white;
                box-shadow: 0px 0px 10px rgba(80, 200, 120, 0.5);
            }

            &--range {
                background-color: #d4f7d4;
                color: #50c878;
            }

            &:hover:not(.calendar-day--selected):not(.calendar-day--range) {
                background-color: #e1e8ed;
            }

            &:active {
                background-color: #a5c1a5;
            }

            &--neighboringMonth {
                opacity: 0.7;
            }

            &--weekend {
                color: #dfdfdf;
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
    }
`
