import useSWRImmutable from 'swr/immutable'

import { config } from '../config/misc'
import { fetcher } from './fetcher'

export function useMatch(matchId: string) {
  const { data, error } = useSWRImmutable(
    `${config.FACEIT_API_URL_BASE}/matches/${matchId}`,
    fetcher
  )

  return {
    data,
    isLoading: !error && !data,
    error,
  }
}
