import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import ListItemText from '@mui/material/ListItemText'
import { useMemo } from 'react'

import { getTargetDateTimeIsoString } from '../util/getTargetDateTimeIsoString'
import { useCountdown } from '../util/useCountdown'
import SmokeListItemButton from './SmokeListItemButton'

interface CounterProps {
  targetTimestamp: string
  matchId: string
}

export const Counter = ({ targetTimestamp, matchId }: CounterProps) => {
  const [, , minutes, seconds] = useCountdown(
    getTargetDateTimeIsoString(targetTimestamp)
  )

  const isDanger = useMemo(() => minutes <= 0, [minutes])
  const progress = useMemo(
    () => (minutes * 60 + seconds) / 3,
    [minutes, seconds]
  )

  const sx = {
    flex: 'none',
    fontWeight: 'bold',
    fontSize: '1.5rem',
  }

  if (minutes + seconds < 0) {
    return null
  }

  return (
    <SmokeListItemButton matchId={matchId} counter danger={isDanger}>
      <Box sx={{ display: 'flex', justfyContent: 'center', marginBottom: 1 }}>
        <ListItemText sx={sx} disableTypography primary={minutes} />
        <ListItemText sx={sx} disableTypography primary={':'} />
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
