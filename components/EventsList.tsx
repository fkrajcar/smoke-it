import List from '@mui/material/List'
import addSeconds from 'date-fns/addSeconds'
import parseISO from 'date-fns/parseISO'
import { useEffect, useState } from 'react'

import { config } from '../config/misc'
import { IEvent, MatchStatus } from '../pages/api/models/Events'
import { fetcher } from '../util/fetcher'
import { Counter } from './Counter'
import { PastMatch, PlayerWithStats } from './PastMatch'

interface EventsListProps {
  events: IEvent[]
}

const EventsList = ({ events }: EventsListProps) => {
  const [players, setPlayers] = useState<PlayerWithStats[]>([])
  useEffect(() => {
    getPlayers()
  }, [])

  const getPlayers = async () => {
    const players = []

    for await (const playerId of Object.values(config.PLAYER_IDS)) {
      const player = await fetcher(
        config.FACEIT_API_URL_BASE + '/players/' + playerId
      )

      players.push(player)
    }

    setPlayers(players)
  }

  if (!events.length || !players.length) {
    return null
  }

  return (
    <List>
      {events.map(
        ({ event: eventStatus, payload, timestamp }: IEvent, index: number) => {
          const date = parseISO(timestamp)

          const targetDateTime = addSeconds(date, 299)

          if (eventStatus === MatchStatus.FINISHED) {
            return (
              <PastMatch
                key={payload.id + index}
                matchId={payload.id}
                players={players}
              />
            )
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
