import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import { useQuery } from '@tanstack/react-query'

import { IEvent } from '../pages/api/models/Events'
import MatchService from '../pages/api/utils/matchService'
import { PastMatch } from './PastMatch'
interface EventsListProps {
  events: IEvent[]
}

const EventsList = ({ events }: EventsListProps) => {
  const { data: players, isLoading } = useQuery(
    ['players'],
    () => MatchService.getPlayers(),
    {
      // time until stale data is garbage collected
      cacheTime: 60 * 1000,
      // time until data becomes stale
      staleTime: 30 * 1000,
    }
  )

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

  if (!events?.length || !players?.length) {
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
