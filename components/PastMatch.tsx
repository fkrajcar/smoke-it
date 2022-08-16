import { useCallback, useEffect, useMemo } from 'react'

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

  const match = useMemo(() => data?.rounds?.[0], [data])

  useEffect(() => {
    console.log(match)
  }, [match, data])

  const isWin = useCallback(() => {
    const ourTeam = match.teams.find((team: Team) => {
      return team.players.find((player: Player) =>
        Object.values(config.PLAYER_IDS).includes(player.player_id)
      )
    })

    return ourTeam.team_stats['Team Win'] === '1'
  }, [match])

  if (error) {
    return <div className="expired-notice-container">Error</div>
  }

  if (isLoading) {
    return <div className="expired-notice-container">Loading...</div>
  }

  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://www.faceit.com/en/csgo/room/${matchId}`}
      className="expired-notice"
    >
      <div
        className={
          isWin() ? 'expired-notice-container win' : 'expired-notice-container'
        }
      >
        <p>{match.round_stats.Map}</p>
        <p>{match.round_stats.Score}</p>
        <p>{isWin() ? 'winali' : 'spusili'}</p>
      </div>
    </a>
  )
}
