import React from 'react'

const Card = ({ activity }) => {
    return (
        <div>
            <h2>{activity.title}</h2>
            <p>{activity.description}</p>
        </div>
    )
}

export default Card
