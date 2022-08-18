import { useTheme } from '@mui/material'
// or
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Image from 'next/image'
import { useEffect, useMemo } from 'react'

import { config } from '../config/misc'
import { useMatch } from '../util/useMatch'

interface Player {
  player_id: string
}

interface Team {
  players: Player[]
}
interface PastMatchProps {
  matchId: string
}

export const PastMatch = ({ matchId }: PastMatchProps) => {
  const { data, error, isLoading } = useMatch(matchId)
  const theme = useTheme()

  const match = useMemo(() => data?.rounds?.[0], [data])

  useEffect(() => {
    console.log(match)
  }, [match, data])

  const isWin = useMemo(() => {
    const ourTeam = match?.teams?.find((team: Team) => {
      return team?.players.find((player: Player) =>
        Object.values(config.PLAYER_IDS).includes(player.player_id)
      )
    })

    return ourTeam?.team_stats['Team Win'] === '1'
  }, [match])

  if (error) {
    return (
      <ListItem
        sx={{
          minWidth: '100%',
          minHeight: '64px',
          justifyContent: 'center',
        }}
      >
        <ListItemText primary="No matches found :(" />
      </ListItem>
    )
  }

  if (isLoading) {
    return (
      <ListItem
        sx={{
          minWidth: '100%',
          minHeight: '64px',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </ListItem>
    )
  }

  return (
    <ListItem>
      <ListItemButton
        component="a"
        target="_blank"
        rel="noreferrer"
        href={`https://www.faceit.com/en/csgo/room/${matchId}`}
        sx={{
          borderRadius: 1,
          border: `1px solid ${theme.palette.divider}`,
          '&:hover': {
            borderColor: theme.palette.primary.light,
          },
        }}
      >
        <Image
          src={`/${match.round_stats.Map}.jpg`}
          alt={`${match.round_stats.Map} map`}
          width={200}
          height={100}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            marginLeft: '10px',
          }}
        >
          <ListItemText primary={match.round_stats.Map} />
          <ListItemText primary={match.round_stats.Score} />
          <ListItemText
            primary={isWin ? 'WIN' : 'LOSE'}
            sx={{
              color: isWin
                ? theme.palette.success.main
                : theme.palette.error.main,
            }}
          />
        </Box>
      </ListItemButton>
    </ListItem>
  )
}
