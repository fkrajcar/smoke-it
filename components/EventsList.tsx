import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import React from 'react'

import { usePlayers } from '@/src/hooks/usePlayers'
import { IEvent, Player } from '@/src/types/match.types'

import { ErrorState } from './ErrorState'
import { PastMatch } from './PastMatch'

interface EventsListProps {
  events: IEvent[]
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  const { players, isLoading, error } = usePlayers()

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <CircularProgress sx={{ marginBottom: '20px' }} />
        <span>Loading matches</span>
      </Box>
    )
  }

  if (error) {
    return <ErrorState />
  }

  if (!events?.length || !players?.length) {
    return null
  }

  return (
    <List disablePadding>
      {events.map((event, index) => (
        <PastMatch
          key={`${event.id}-${index}`}
          matchId={event.id}
          players={players as Player[]}
          updatedAt={event.finished_at}
        />
      ))}
    </List>
  )
}

export default EventsList
