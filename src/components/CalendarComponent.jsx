import React, { useState } from 'react'
import { Calendar } from 'react-calendar'
import { Card } from '@mui/material'
import styled from 'styled-components'

import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'

const CalendarComponent = ({ activities }) => {
    const [selectedDate, setSelectedDate] = useState(null)

    let footer = <p>Seleccione un día</p>
    if (selectedDate) {
        footer = <p>You picked {format(selectedDate, 'PP')}.</p>
    }

    return (
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

export default CalendarComponent

// // import React, { useState } from 'react'
// import React, { useState } from 'react'
// import { Calendar } from 'react-calendar'
// // import { Calendar } from 'react-calendar'
// // import dayjs from 'dayjs'
// import dayjs from 'dayjs'
// // import styled from 'styled-components'
// import styled from 'styled-components'
// // import { Box } from '@mui/material'
// import { Box } from '@mui/material'
// import { isSameDay } from 'date-fns'
// import 'react-modern-calendar-datepicker'
// // import { isSameDay } from 'date-fns'
// // import 'react-modern-calendar-datepicker/lib/DatePicker.css'

// const utils = {
//     getToday: () => {
//         const now = new Date()
//         return {
//             year: now.getFullYear(),
//             month: now.getMonth() + 1,
//             day: now.getDate(),
//         }
//     },
// }

// const CalendarContainer = styled(Box)(({ theme }) => ({
//     margin: theme.spacing(0, 2),
//     height: 'fit-content',
// }))

// const ActivityBox = styled(Box)(({ theme }) => ({
//     padding: theme.spacing(1),
//     borderRadius: '4px',
//     backgroundColor: '#f4f4f4',
//     boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.15)',
//     marginTop: theme.spacing(1),
// }))

// const CalendarComponent = ({ activities }) => {
//     const [selectedDate, setSelectedDate] = useState(utils.getToday())
//     const [selectedActivity, setSelectedActivity] = useState(null)

//     const onDateClick = (date) => {
//         setSelectedDate(date)
//         setSelectedActivity(activities.find((activity) => dayjs(activity.date).isSame(date, 'day')))
//     }

//     return (
//         <div style={{ marginTop: '100px', flexDirection: 'row' }}>
//             <CalendarContainer>
//                 <Calendar
//                     value={selectedDate}
//                     onChange={setSelectedDate}
//                     utils={utils}
//                     shouldHighlightWeekends
//                     locale="es"
//                     onDisabledDayError={() => {}}
//                     renderDayContent={({ day, isSelected, isToday, isDisabled }) => {
//                         const activity = activities.find((activity) => dayjs(activity.date).isSame(day, 'day'))
//                         const hasActivity = !!activity
//                         const isDaySelected = isSelected || isSameDay(day, selectedDate.date)
//                         const isDayToday = isToday && !hasActivity
//                         const isDayDisabled = isDisabled && !hasActivity

//                         return (
//                             <div
//                                 className={`calendar-day ${isDaySelected ? 'calendar-day-selected' : ''} ${
//                                     isDayToday ? 'calendar-day-today' : ''
//                                 } ${isDayDisabled ? 'calendar-day-disabled' : ''}`}
//                                 onClick={() => !isDayDisabled && onDateClick(day)}
//                             >
//                                 <div className="calendar-day-number">{day.day}</div>
//                                 {hasActivity && <div className="calendar-day-activity-dot" />}
//                             </div>
//                         )
//                     }}
//                 />
//             </CalendarContainer>
//             <div>
//                 {selectedActivity && (
//                     <ActivityBox>
//                         <div>{selectedActivity.title}</div>
//                         <div>{selectedActivity.description}</div>
//                         <div>{selectedActivity.date}</div>
//                     </ActivityBox>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default CalendarComponent
