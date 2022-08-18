import axios from 'axios'
import useSWRImmutable from 'swr/immutable'

import { config } from '../config/misc'

const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FACEIT_API_CLIENT_TOKEN}`,
      },
    })
    .then((res) => res.data)

export function useMatch(matchId: string) {
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
