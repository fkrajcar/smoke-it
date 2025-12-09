import { PLAYER_IDS } from '../constants/config'
import {
  IEvent,
  MatchHistoryItem,
  PlayerMatchHistory,
  PlayerWithStats,
  ProcessedPlayerStats,
  Round,
  StatsProperties,
  Team,
} from '../types/match.types'

/**
 * Processes raw match history data and returns unique finished matches
 * @param matches - Array of player match histories
 * @returns Array of processed match events
 */
export const processMatchHistory = (
  matches: PlayerMatchHistory[]
): IEvent[] => {
  // Flatten all match items and add id field
  const allMatches = matches.flatMap((match) =>
    match.items.map((item: MatchHistoryItem) => ({
      ...item,
      id: item.match_id,
    }))
  )

  // Remove duplicates by id and sort by finished_at
  const uniqueMatches = allMatches
    .filter(
      (match, index, self) => index === self.findIndex((m) => m.id === match.id)
    )
    .sort((a, b) => (b.finished_at || 0) - (a.finished_at || 0))

  return uniqueMatches as unknown as IEvent[]
}

/**
 * Finds the team that contains our configured players
 * @param teams - Array of teams
 * @returns The team containing our players or undefined
 */
export const findOurTeam = (teams: Team[]): Team | undefined => {
  const ourPlayerIds = Object.values(PLAYER_IDS) as string[]

  return teams.find((team) =>
    team.players.some((player) => ourPlayerIds.includes(player.player_id))
  )
}

/**
 * Filters team players to only include our configured players
 * @param team - The team to filter
 * @returns Array of our players
 */
export const getOurPlayers = (team: Team): PlayerWithStats[] => {
  const ourPlayerIds = Object.values(PLAYER_IDS) as string[]

  return team.players.filter((player) =>
    ourPlayerIds.includes(player.player_id)
  )
}

/**
 * Processes player statistics and adds avatar information
 * @param players - Array of players with stats
 * @param getAvatar - Function to retrieve player avatar
 * @returns Array of processed player stats
 */
export const processPlayerStats = (
  players: PlayerWithStats[],
  getAvatar: (playerId: string) => string | undefined
): ProcessedPlayerStats[] => {
  return players
    .map((player) => ({
      avatar: getAvatar(player.player_id),
      kills: parseInt(player.player_stats[StatsProperties.Kills], 10),
      assists: parseInt(player.player_stats[StatsProperties.Assists], 10),
      deaths: parseInt(player.player_stats[StatsProperties.Deaths], 10),
      kd: parseFloat(player.player_stats[StatsProperties.KD]),
      nickname: player.nickname,
      ADR: parseInt(player.player_stats[StatsProperties.ADR], 10),
      player_id: player.player_id,
    }))
    .sort((a, b) => b.kills - a.kills || b.kd - a.kd)
}

/**
 * Determines if our team won the match
 * @param team - Our team
 * @returns True if won, false otherwise
 */
export const didTeamWin = (team: Team): boolean => {
  return team.team_stats[StatsProperties.TeamWin] === StatsProperties.Win
}

/**
 * Extracts the first round from match data
 * @param matchData - Match statistics data
 * @returns The first round or undefined
 */
export const getFirstRound = (
  matchData: { rounds?: Round[] } | undefined
): Round | undefined => {
  return matchData?.rounds?.[0]
}
