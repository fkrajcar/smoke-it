// import { useEffect, useState } from 'react'

// import { config } from '../config/misc'
// import { IMatch } from '../pages/api/models/Matches'
import { useMatch } from '../util/useMatch'
interface PastMatchProps {
  matchId: string
}

export const PastMatch = ({ matchId }: PastMatchProps) => {
  // const [data, setData] = useState<IMatch>()
  // const [isLoading, setIsLoading] = useState(false)

  const { data, error, isLoading } = useMatch(matchId)

  // useEffect(() => {
  //   setIsLoading(true)
  //   fetchData()
  // }, [])

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(
  //       `${config.FACEIT_API_URL_BASE}/matches/${matchId}/stats`,
  //       {
  //         headers: {
  //           Authorization: 'Bearer ' + process.env.FACEIT_API_CLIENT_TOKEN,
  //         },
  //       }
  //     )

  //     const data = await response.json()

  //     const match = data.rounds[0]

  //     setData(match)
  //   } catch (e) {
  //     console.log('Cant fetch: ', { matchId }, e)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  if (error) {
    return <div className="expired-notice-container">Error</div>
  }

  return (
    <div className="expired-notice-container">
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.faceit.com/en/csgo/room/${matchId}`}
        className="expired-notice"
      >
        {isLoading ? 'Loading...' : data?.rounds?.[0].match_id}
      </a>
    </div>
  )
}
