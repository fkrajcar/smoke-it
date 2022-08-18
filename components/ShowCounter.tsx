import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import ListItemText from '@mui/material/ListItemText'
import { useMemo } from 'react'

import SmokeListItemButton from './SmokeListItemButton'

interface ShowCounterProps {
  minutes: number
  seconds: number
  matchId: string
}

export const ShowCounter = ({
  minutes,
  seconds,
  matchId,
}: ShowCounterProps) => {
  const isDanger = useMemo(() => minutes < 0, [minutes])
  const progress = useMemo(
    () => (minutes * 60 + seconds) / 3,
    [minutes, seconds]
  )

  const sx = {
    flex: 'none',
    fontWeight: 'bold',
  }

  return (
    <SmokeListItemButton matchId={matchId} divider counter>
      <Box sx={{ display: 'flex', justfyContent: 'center', marginBottom: 1 }}>
        <ListItemText sx={sx} disableTypography primary={minutes} />
        <ListItemText sx={sx} secondary={':'} />
        <ListItemText
          sx={{
            ...sx,
            ...(isDanger && { color: 'red' }),
          }}
          disableTypography
          primary={seconds}
        />
      </Box>
      <Box sx={{ width: '100%' }}>
        <LinearProgress
          color={isDanger ? 'error' : 'secondary'}
          variant="determinate"
          value={progress}
        />
      </Box>
    </SmokeListItemButton>
  )
}
