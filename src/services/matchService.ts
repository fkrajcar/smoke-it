import { PLAYER_IDS } from '../constants/config'
import { faceitApiClient } from '../lib/apiClient'
import { MatchStats, Player, PlayerMatchHistory } from '../types/match.types'

export class MatchService {
  /**
   * Fetches player information for all configured players
   * @returns Promise with array of player data
   */
  static async getPlayers(): Promise<Player[]> {
    const playerIds = Object.values(PLAYER_IDS)

    const requests = playerIds.map((playerId) =>
      faceitApiClient.get<Player>(`/players/${playerId}`)
    )

    return Promise.all(requests)
  }

  /**
   * Fetches match history for all configured players
   * @returns Promise with array of player match histories
   */
  static async getPlayerMatches(): Promise<PlayerMatchHistory[]> {
    const playerIds = Object.values(PLAYER_IDS)

    const requests = playerIds.map((playerId) =>
      faceitApiClient.get<PlayerMatchHistory>(`/players/${playerId}/history`)
    )

    return Promise.all(requests)
  }

  /**
   * Fetches detailed statistics for a specific match
   * @param matchId - The ID of the match
   * @returns Promise with match statistics
   */
  static async getMatchStats(matchId: string): Promise<MatchStats> {
    return faceitApiClient.get<MatchStats>(`/matches/${matchId}/stats`)
  }

  /**
   * Fetches player information by ID
   * @param playerId - The ID of the player
   * @returns Promise with player data
   */
  static async getPlayerById(playerId: string): Promise<Player> {
    return faceitApiClient.get<Player>(`/players/${playerId}`)
  }
}

export default MatchService
