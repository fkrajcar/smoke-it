import dbConnect from '../util/dbConnect'
import { IEvent, Event } from './api/models/Events'
import { addSeconds, parseISO } from 'date-fns'
import { CountdownTimer } from '../components/CountdownTimer'
import Head from 'next/head'

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

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  // const response = await Event.find()
  const response = await Event.find({
    event: { $in: ['match_status_ready', 'match_status_finished'] },
  }).sort({ timestamp: -1 })

  const events = JSON.parse(JSON.stringify(response))
  console.log(events)

  return { props: { events } }
}

export default Index
