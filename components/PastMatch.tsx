import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import ListItemText from '@mui/material/ListItemText'
import Image from 'next/future/image'
import React, { useCallback, useMemo } from 'react'

import { IMAGE_DIMENSIONS } from '@/src/constants/config'
import { useMatchStats } from '@/src/hooks/useMatchStats'
import { isoToFormat } from '@/src/lib/dateHelpers'
import {
  didTeamWin,
  findOurTeam,
  getFirstRound,
  getOurPlayers,
  processPlayerStats,
} from '@/src/lib/matchHelpers'
import { Player, ProcessedPlayerStats } from '@/src/types/match.types'

import { ErrorState } from './ErrorState'
import { LoadingState } from './LoadingState'
import { PlayerStatsItem } from './PlayerStats'
import { SmokeListItemButton } from './SmokeListItemButton'

interface PastMatchProps {
  matchId: string
  players: Player[]
  updatedAt: number
}

export const PastMatch: React.FC<PastMatchProps> = ({
  matchId,
  players,
  updatedAt,
}) => {
  const { data, error, isLoading } = useMatchStats(matchId)
  const theme = useTheme()

  const match = useMemo(() => getFirstRound(data), [data])

  const getAvatar = useCallback(
    (playerId: string) =>
      players?.find(({ player_id }) => player_id === playerId)?.avatar,
    [players]
  )

  const { playersStats, isWin } = useMemo(() => {
    if (!match?.teams) {
      return { playersStats: null, isWin: null }
    }

    const ourTeam = findOurTeam(match.teams)

    if (!ourTeam) {
      return { playersStats: null, isWin: null }
    }

    const ourPlayers = getOurPlayers(ourTeam)
    const stats = processPlayerStats(ourPlayers, getAvatar)
    const win = didTeamWin(ourTeam)

    return { playersStats: stats, isWin: win }
  }, [match, getAvatar])

  if (isLoading || error?.response?.status === 429) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState />
  }

  if (!playersStats?.length || !match) return null

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
          width={IMAGE_DIMENSIONS.MAP_IMAGE.width}
          height={IMAGE_DIMENSIONS.MAP_IMAGE.height}
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
          <ListItemText
            primaryTypographyProps={{ fontSize: '0.625rem' }}
            primary={isoToFormat(updatedAt)}
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 4,
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
          {playersStats.map((player: ProcessedPlayerStats, index: number) => (
            <PlayerStatsItem key={`${player.nickname}-${index}`} {...player} />
          ))}
        </Box>
      </Box>
    </SmokeListItemButton>
  )
}
