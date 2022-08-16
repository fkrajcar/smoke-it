import { MatchStatus } from '../pages'
import { useCountdown } from '../util/useCountdown'
import { PastMatch } from './PastMatch'
import { ShowCounter } from './ShowCounter'

interface CountdownTimerProps {
  matchId: string
  targetDate: string
  matchStatus: string
}

export const CountdownTimer = ({
  targetDate,
  matchId,
  matchStatus,
}: CountdownTimerProps) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate)

  if (matchStatus === MatchStatus.FINISHED) {
    return <PastMatch matchId={matchId} />
  } else if (days + hours + minutes + seconds > 0) {
    return <ShowCounter matchId={matchId} minutes={minutes} seconds={seconds} />
  } else {
    return null
  }
}
