import useSWRImmutable from 'swr/immutable'

import { config } from '../config/misc'
import { fetcher } from './fetcher'

export function useMatchStats(matchId: string) {
  const { data, error } = useSWRImmutable(
    `${config.FACEIT_API_URL_BASE}/matches/${matchId}/stats`,
    fetcher
  )

  return {
    data,
    isLoading: !error && !data,
    error,
  }
}
