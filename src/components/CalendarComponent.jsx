import React, { useState } from 'react'
import { Calendar } from 'react-calendar'
import { Box, Divider, Typography } from '@mui/material'
import styled from 'styled-components'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

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

const CalendarComponent = ({ activities }) => {
    const [selectedDate, setSelectedDate] = useState(null)
    const [date, setDate] = useState(new Date())
    console.log(activities)
    console.log(selectedDate)

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

    // const filteredActivities = selectedDate
    //     ? activities?.filter((activity) => {
    //           return dayjs(activity.date).isSame(dayjs(selectedDate), 'day')
    //       })
    //     : []
    // const filteredActivities = selectedDate
    //     ? activities?.filter((activity) => {
    //           const selectedDateISO = selectedDate.toISOString()
    //           const activityDateISO = dayjs(activity.date).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')
    //           console.log(selectedDateISO)
    //           console.log(activityDateISO)
    //           return selectedDateISO === activityDateISO
    //       })
    //     : []
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
            {/* <div className="dayOfWeek">{getDayOfWeek()}</div>
            <div className="date">{date.toLocaleDateString()}</div> */}
            <CalendarContainer>
                <Calendar
                    value={selectedDate}
                    onChange={setSelectedDate}
                    locale={esLocale}
                    tileContent={({ date }) => {
                        const activitiesOnDay = activities?.filter((activity) => {
                            return dayjs(activity.date).isSame(date, 'day')
                        })

                        return activitiesOnDay?.length > 0 ? (
                            // <StyledDot position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />
                            <StyledDot position="absolute" />
                        ) : null
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
                            <Divider style={{ color: 'green' }} />
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    )
}

export default CalendarComponent

// const CalendarContainer = styled.div`
//     /* ~~~ container styles ~~~ */
//     max-width: 600px;
//     margin: auto;
//     margin-top: 20px;
//     background-color: #d4f7d4;
//     padding: 10px;
//     border-radius: 3px;

//     /* ~~~ navigation styles ~~~ */
//     .react-calendar__navigation {
//         display: flex;

//         .react-calendar__navigation__label {
//             font-weight: bold;
//             flex-grow: 1;
//             text-align: center;
//         }

//         .react-calendar__navigation__arrow {
//             flex-grow: 0.333;
//         }
//     }

//     /* ~~~ label styles ~~~ */
//     .react-calendar__month-view__weekdays {
//         display: grid;
//         grid-template-columns: repeat(7, 1fr);
//         text-align: center;
//         margin-bottom: 10px;
//     }

//     /* ~~~ button styles ~~~ */
//     button {
//         margin: 3px;
//         background-color: #6f876f;
//         border: 0;
//         border-radius: 3px;
//         color: white;
//         padding: 5px 0;

//         &:hover {
//             background-color: #556b55;
//         }

//         &:active {
//             background-color: #a5c1a5;
//         }
//     }

//     /* ~~~ day grid styles ~~~ */
//     .react-calendar__month-view__days {
//         display: grid !important;
//         grid-template-columns: repeat(7, 1fr);

//         .react-calendar__tile {
//             max-width: initial !important;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             height: 70px;
//             padding: 5px;
//             border-radius: 50%;
//             cursor: pointer;

//             &.react-calendar__tile--active {
//                 background-color: #6f876f;
//                 color: white;

//                 &:hover {
//                     background-color: #556b55;
//                 }
//             }

//             &.react-calendar__tile--now {
//                 background-color: #f0f0f0;
//             }

//             &.react-calendar__tile--weekend {
//                 color: #dfdfdf;
//             }

//             &.react-calendar__tile--neighboringMonth {
//                 opacity: 0.5;
//             }
//         }
//     }

//     /* ~~~ neighboring month styles ~~~ */
//     .react-calendar__tile--neighboringMonth {
//         opacity: 0.5;
//     }

//     /* ~~~ weekend styles ~~~ */
//     .react-calendar__tile--weekend {
//         color: #dfdfdf;
//     }

//     /* ~~~ active day styles ~~~ */
//     .react-calendar__tile--range {
//         box-shadow: 0 0 6px 2px black;
//     }

//     /* ~~~ other view styles ~~~ */
//     .react-calendar__year-view__months,
//     .react-calendar__decade-view__years,
//     .react-calendar__century-view__decades {
//         display: grid !important;
//         grid-template-columns: 20% 20% 20% 20% 20%;

//         &.react-calendar__year-view__months {
//             grid-template-columns: 33.3% 33.3% 33.3%;
//         }

//         .react-calendar__tile {
//             max-width: initial !important;
//         }
//     }
// `
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

// const CalendarContainer = styled.div`
//     /* ~~~ container styles ~~~ */
//     max-width: 600px;
//     margin: auto;
//     margin-top: 20px;
//     background-color: #d4f7d4;
//     padding: 10px;
//     border-radius: 3px;
//     /* ~~~ navigation styles ~~~ */
//     .react-calendar__navigation {
//         display: flex;

//         .react-calendar__navigation__label {
//             font-weight: bold;
//         }

//         .react-calendar__navigation__arrow {
//             flex-grow: 0.333;
//         }
//     }
//     /* ~~~ label styles ~~~ */
//     .react-calendar__month-view__weekdays {
//         text-align: center;
//     }
//     /* ~~~ button styles ~~~ */
//     button {
//         margin: 3px;
//         background-color: #6f876f;
//         border: 0;
//         border-radius: 3px;
//         color: white;
//         padding: 5px 0;

//         &:hover {
//             background-color: #556b55;
//         }

//         &:active {
//             background-color: #a5c1a5;
//         }
//     }
//     /* ~~~ day grid styles ~~~ */
//     .react-calendar__month-view__days {
//         display: grid !important;
//         grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;

//         .react-calendar__tile {
//             max-width: initial !important;
//         }
//     }
//     /* ~~~ neighboring month & weekend styles ~~~ */
//     .react-calendar__month-view__days__day--neighboringMonth {
//         opacity: 0.7;
//     }
//     .react-calendar__month-view__days__day--weekend {
//         color: #dfdfdf;
//     }
//     /* ~~~ active day styles ~~~ */
//     .react-calendar__tile--range {
//         box-shadow: 0 0 6px 2px black;
//     }
//     /* ~~~ other view styles ~~~ */
//     .react-calendar__year-view__months,
//     .react-calendar__decade-view__years,
//     .react-calendar__century-view__decades {
//         display: grid !important;
//         grid-template-columns: 20% 20% 20% 20% 20%;

//         &.react-calendar__year-view__months {
//             grid-template-columns: 33.3% 33.3% 33.3%;
//         }

//         .react-calendar__tile {
//             max-width: initial !important;
//         }
//     }
// `

// const renderDay = (date, _view) => {
//     const activitiesOnDay = activities?.filter((activity) => {
//         return dayjs(activity.date).isSame(date, 'day')
//     })

//     return (
//         <Box position="relative" height="100%">
//             {activitiesOnDay.length > 0 && <StyledDot position="absolute" top={0} left={0} />}
//             <Typography>{dayjs(date).format('dd D')}</Typography>
//         </Box>
//     )
// }
