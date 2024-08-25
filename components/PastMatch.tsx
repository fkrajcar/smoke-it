import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import ListItemText from '@mui/material/ListItemText'
import Image from 'next/future/image'
import { useCallback, useMemo } from 'react'

import { config } from '../config/misc'
import { useMatchStats } from '../util/useMatchStats'
import { ErrorState } from './ErrorState'
import { LoadingState } from './LoadingState'
import { PlayerStatsItem } from './PlayerStats'
import SmokeListItemButton from './SmokeListItemButton'

enum StatsProperties {
  Kills = 'Kills',
  KD = 'K/D Ratio',
  TeamWin = 'Team Win',
  Win = '1',
}

interface PlayerStats {
  [StatsProperties.Kills]: number
  [StatsProperties.KD]: string
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
    (playerId: string) =>
      players?.find(({ player_id }) => player_id === playerId)?.avatar,
    [players]
  )

  const [playersStats, isWin] = useMemo(() => {
    if (!match) return [null, null]

    const ourTeam = match?.teams?.find((team: Team) =>
      team?.players.some((player: PlayerWithStats) =>
        Object.values(config.PLAYER_IDS).includes(player.player_id)
      )
    )

    const we = ourTeam?.players?.filter((player: PlayerWithStats) =>
      Object.values(config.PLAYER_IDS).includes(player.player_id)
    )

    const playersStats: PlayerWithStats[] = we
      ?.map((player: PlayerWithStats) => ({
        avatar: getAvatar(player.player_id),
        kills: player.player_stats.Kills,
        kd: parseFloat(player.player_stats[StatsProperties.KD]).toFixed(2),
        nickname: player.nickname,
      }))
      .sort(
        (a: PlayerWithStats, b: PlayerWithStats) =>
          parseInt(b.kills) - parseInt(a.kills) ||
          parseFloat(b.kd) - parseFloat(a.kd)
      )

    return [
      playersStats,
      ourTeam?.team_stats[StatsProperties.TeamWin] === StatsProperties.Win,
    ]
  }, [match, getAvatar])

  if (error) return <ErrorState />
  if (isLoading) return <LoadingState />
  if (!playersStats?.length) return null

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
            maxHeight: '96px',
            overflowY: 'auto',
            overflowX: 'hidden',
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
            },
          }}
        >
          {playersStats?.map((player: PlayerWithStats, index: number) => (
            <PlayerStatsItem key={player.nickname + index} {...player} />
          ))}
        </Box>
      </Box>
    </SmokeListItemButton>
  )
}
