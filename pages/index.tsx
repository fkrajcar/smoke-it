import Head from 'next/head'

import { EventsList } from '../components/EventsList'
import dbConnect from '../util/dbConnect'
import { Event, IEvent, MatchStatus } from './api/models/Events'

interface IProps {
  events: IEvent[]
}

const Index = ({ events }: IProps) => (
  <>
    <Head>
      <title>SmokeIt</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <EventsList events={events} />
  </>
)

export async function getServerSideProps() {
  await dbConnect()

  const response = await Event.find({
    event: { $in: [MatchStatus.READY, MatchStatus.FINISHED] },
  }).sort({ timestamp: -1 })

  const events = JSON.parse(JSON.stringify(response))

  return { props: { events } }
}

export default Index
