import axios from 'axios'
import useSWRImmutable from 'swr'

import { config } from '../config/misc'

const fetcher = (url: string, token: string) =>
  axios
    .get(url, { headers: { Authorization: 'Bearer ' + token } })
    .then((res) => res.data)

export function useMatch(matchId: string) {
  const { data, error } = useSWRImmutable(
    [
      `${config.FACEIT_API_URL_BASE}/matches/${matchId}/stats`,
      process.env.FACEIT_API_CLIENT_TOKEN,
    ],
    fetcher
  )

  return {
    data,
    isLoading: !error && !data,
    error,
  }
}
