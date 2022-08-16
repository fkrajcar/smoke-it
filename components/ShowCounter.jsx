import React from 'react'
import { DateTimeDisplay } from './DateTimeDisplay'

export const ShowCounter = ({ days, hours, minutes, seconds, matchId }) => {
  const isDanger = minutes === 0
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://www.faceit.com/en/csgo/room/${matchId}`}
    >
      <div className="show-counter">
        <DateTimeDisplay value={minutes} type={'Mins'} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={isDanger} />
      </div>
    </a>
  )
}
