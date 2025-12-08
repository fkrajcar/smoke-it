import useSWRImmutable from 'swr/immutable'

import { API_CONFIG } from '../constants/config'
import { faceitApiClient } from '../lib/apiClient'
import { MatchStats } from '../types/match.types'

interface UseMatchStatsReturn {
  data?: MatchStats
  isLoading: boolean
  error: Error | undefined
}

/**
 * Hook to fetch match statistics
 * Uses SWR for caching and automatic revalidation
 * @param matchId - The ID of the match
 * @returns Match stats data, loading state, and error
 */
export const useMatchStats = (matchId: string): UseMatchStatsReturn => {
  const { data, error } = useSWRImmutable<MatchStats>(
    matchId
      ? `${API_CONFIG.FACEIT_API_URL_BASE}/matches/${matchId}/stats`
      : null,
    () => faceitApiClient.get<MatchStats>(`/matches/${matchId}/stats`)
  )

  return {
    data,
    isLoading: !error && !data,
    error,
  }
}
