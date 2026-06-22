import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { CACHE_CONFIG } from '../constants/config'
import { MatchService } from '../services/matchService'
import { Player } from '../types/match.types'

interface UsePlayersReturn {
  players?: Player[]
  isLoading: boolean
  error: AxiosError | null
}

/**
 * Hook to fetch all configured players
 * Uses React Query for caching and automatic revalidation
 * @returns Players data, loading state, and error
 */
export const usePlayers = (): UsePlayersReturn => {
  const { data, isLoading, error } = useQuery<Player[], Error>(
    ['players'],
    () => MatchService.getPlayers(),
    {
      cacheTime: CACHE_CONFIG.PLAYERS_CACHE_TIME,
      staleTime: CACHE_CONFIG.PLAYERS_STALE_TIME,
    }
  ) as UseQueryResult<Player[], AxiosError>

  return {
    players: data,
    isLoading,
    error: error ?? null,
  }
}
