import List from '@mui/material/List'
import { addSeconds, parseISO } from 'date-fns'
import React from 'react'

import { IEvent } from '../pages/api/models/Events'
import { CountdownTimer } from './CountdownTimer'

interface EventsListProps {
  events: IEvent[]
}

export const EventsList = ({ events }: EventsListProps) => {
  if (!events.length) {
    return null
  }

  return (
    <List>
      {events.map((event: IEvent, index: number) => {
        const date = parseISO(event.timestamp)

        const targetDateTime = addSeconds(date, 299)
        // console.log(event.payload.match)
        return (
          <CountdownTimer
            matchStatus={event.event}
            matchId={event.payload.id}
            key={event.transaction_id + index}
            targetDate={targetDateTime.toISOString()}
          />
        )
      })}
    </List>
  )
}
