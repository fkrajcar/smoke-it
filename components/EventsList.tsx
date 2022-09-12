import List from '@mui/material/List'
import { useEffect, useState } from 'react'

import { config } from '../config/misc'
import { IEvent } from '../pages/api/models/Events'
import { fetcher } from '../util/fetcher'
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
      {events.map(({ payload }: IEvent, index: number) => (
        <PastMatch
          key={payload.id + index}
          matchId={payload.id}
          players={players}
        />
      ))}
    </List>
  )
}

export default EventsList
