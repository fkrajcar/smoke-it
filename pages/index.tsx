import dbConnect from '../util/dbConnect'
import { IEvent, Event } from './api/models/Events'
import { addSeconds, parseISO } from 'date-fns'
import { CountdownTimer } from '../components/CountdownTimer'
import Head from 'next/head'

export const enum MatchStatus {
  READY = 'match_status_ready',
  FINISHED = 'match_status_finished',
}

interface IProps {
  events: IEvent[]
}

const Index = ({ events }: IProps) => (
  <>
    <Head>
      <title>SmokeIt</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    {events.map((event: IEvent) => {
      const date = parseISO(event.timestamp)

      const target = addSeconds(date, 299)

      return (
        <CountdownTimer
          matchStatus={event.event}
          matchId={event.payload.id}
          key={event.transaction_id}
          targetDate={target.toISOString()}
        />
      )
    })}
  </>
)

export async function getServerSideProps() {
  await dbConnect()

  // const response = await Event.find()

  const response = await Event.find({
    event: { $in: [MatchStatus.READY, MatchStatus.FINISHED] },
  }).sort({ timestamp: -1 })

  const events = JSON.parse(JSON.stringify(response))

  console.log(events)

  return { props: { events } }
}

export default Index
