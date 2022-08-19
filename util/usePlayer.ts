import useSWRImmutable from 'swr/immutable'

import { config } from '../config/misc'
import { fetcher } from './fetcher'

export function usePlayer(playerId: string) {
  const { data, error } = useSWRImmutable(
    `${config.FACEIT_API_URL_BASE}/players/${playerId}`,
    fetcher
  )

  return {
    data,
    isLoading: !error && !data,
    error,
  }
}
