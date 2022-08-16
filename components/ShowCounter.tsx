import { DateTimeDisplay } from './DateTimeDisplay'

interface ShowCounterProps {
  minutes: number
  seconds: number
  matchId: string
}

export const ShowCounter = ({
  minutes,
  seconds,
  matchId,
}: ShowCounterProps) => {
  const isDanger = minutes === 0

  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://www.faceit.com/en/csgo/room/${matchId}`}
    >
      <div className="show-counter">
        <DateTimeDisplay value={minutes} type={'Mins'} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={isDanger} />
      </div>
    </a>
  )
}
