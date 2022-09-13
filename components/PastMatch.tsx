import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Image from 'next/future/image'
import { useCallback, useMemo } from 'react'

import { config } from '../config/misc'
import { useMatchStats } from '../util/useMatchStats'
import SmokeListItemButton from './SmokeListItemButton'

interface PlayerStats {
  Kills: number
  'K/D Ratio': string
}
export interface PlayerWithStats {
  player_id: string
  nickname: string
  avatar: string
  player_stats: PlayerStats
  kills: string
  kd: string
}

interface Team {
  players: PlayerWithStats[]
}
interface PastMatchProps {
  matchId: string
  players: PlayerWithStats[]
}

export const PastMatch = ({ matchId, players }: PastMatchProps) => {
  const { data, error, isLoading } = useMatchStats(matchId)

  const theme = useTheme()

  const match = useMemo(() => data?.rounds?.[0], [data])

  const getAvatar = useCallback(
    (playerId: string) => {
      return players?.find(({ player_id }) => player_id === playerId)?.avatar
    },
    [players]
  )

  const [playersStats, isWin] = useMemo(() => {
    const ourTeam = match?.teams?.find((team: Team) => {
      return team?.players.find((player: PlayerWithStats) =>
        Object.values(config.PLAYER_IDS).includes(player.player_id)
      )
    })

    const we = ourTeam?.players?.filter((player: PlayerWithStats) =>
      Object.values(config.PLAYER_IDS).includes(player.player_id)
    )

    const playersStats = we
      ?.map((player: PlayerWithStats) => {
        return {
          avatar: getAvatar(player.player_id),
          kills: player.player_stats.Kills,
          kd: player.player_stats['K/D Ratio'],
          nickname: player.nickname,
        }
      })
      .sort((a: PlayerWithStats, b: PlayerWithStats) => {
        const difference = parseInt(b.kills) - parseInt(a.kills)

        if (difference) {
          return difference
        }

        return parseFloat(b.kd) - parseFloat(a.kd)
      })

    return [playersStats, ourTeam?.team_stats['Team Win'] === '1']
  }, [match, getAvatar])

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
          justifyContent: 'center',
        }}
        disablePadding
      >
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '129px',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <CircularProgress />
        </Box>
      </ListItem>
    )
  }

  return (
    <SmokeListItemButton matchId={matchId} pastMatch>
      <Box
        sx={{
          maskImage:
            'linear-gradient(to right, rgba(0, 0, 0, 0.35) 10%, transparent 100%)',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: -1,
        }}
      >
        <Image
          src={`/${match.round_stats.Map}.jpg`}
          alt={`${match.round_stats.Map} map`}
          width={200}
          height={129}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          marginLeft: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          [theme.breakpoints.down('md')]: {
            flexDirection: 'row',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            marginRight: '10px',
            justifyContent: 'center',
            alignItems: 'center',
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
        <Box
          sx={{
            flexDirection: 'row',
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
            },
          }}
        >
          {playersStats.map(
            (
              { avatar, kills, kd, nickname }: PlayerWithStats,
              index: number
            ) => (
              <Box
                key={nickname + index}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: '10px',
                  paddingRight: '6px',
                  justifyContent: 'flex-start',
                }}
              >
                <Image
                  src={avatar}
                  width={28}
                  height={28}
                  alt={`${nickname} avatar`}
                  style={{ borderRadius: '50%' }}
                />
                <Box
                  key={nickname}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: '8px',
                  }}
                >
                  <Box
                    key={nickname}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRight: `1px solid ${theme.palette.divider}`,
                      paddingRight: '6px',
                      marginRight: '6px',
                    }}
                  >
                    <ListItemText
                      sx={{
                        flex: 'unset',
                        marginRight: '4px',
                        fontWeight: 'bold',
                      }}
                      disableTypography
                      primary={kills}
                    />
                    <Image
                      alt="death icon"
                      src={'/death.svg'}
                      width={18}
                      height={18}
                    />
                  </Box>
                  <ListItemText
                    sx={{
                      fontWeight: 'bold',
                    }}
                    disableTypography
                    primary={`${kd} `}
                  />
                  <ListItemText primary={'  K/D'} />
                </Box>
              </Box>
            )
          )}
        </Box>
      </Box>
    </SmokeListItemButton>
  )
}
