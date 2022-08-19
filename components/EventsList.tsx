import List from '@mui/material/List'
import addSeconds from 'date-fns/addSeconds'
import parseISO from 'date-fns/parseISO'

import { IEvent, MatchStatus } from '../pages/api/models/Events'
import { Counter } from './Counter'
import { PastMatch } from './PastMatch'

interface EventsListProps {
  events: IEvent[]
}

const EventsList = ({ events }: EventsListProps) => {
  if (!events.length) {
    return null
  }

  return (
    <List>
      {events.map(
        ({ event: eventStatus, payload, timestamp }: IEvent, index: number) => {
          const date = parseISO(timestamp)

          const targetDateTime = addSeconds(date, 299)

          if (eventStatus === MatchStatus.FINISHED) {
            return <PastMatch key={payload.id + index} matchId={payload.id} />
          } else if (eventStatus === MatchStatus.READY) {
            return (
              <Counter
                key={payload.id + index}
                matchId={payload.id}
                targetDateTime={targetDateTime}
              />
            )
          }
        }
      )}
    </List>
  )
}

export default EventsList
