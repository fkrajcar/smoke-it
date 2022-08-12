import dbConnect from '../util/dbConnect'
import { IEvent, Event } from './api/models/Events'
import { addSeconds, parseISO, formatDistanceToNow, setDate, isBefore, differenceInSeconds } from 'date-fns'
import { CountdownTimer } from '../components/CountdownTimer'

interface IProps {
  events: IEvent[];
}

const Index = (props: IProps) => (
  <>
    {/* Create a card for each pet */}
    {props.events.map((match: IEvent, index) => {
      const date = parseISO(match.timestamp)

      const target = addSeconds(date, 298);

      return (
        <CountdownTimer key={match.transaction_id} targetDate={target.toISOString()} />
      )
    }
    )}
  </>
)

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  // const response = await Event.find({ event: 'match_status_ready' })
  const response = await Event.find().sort({ timestamp: -1 })

  const events = JSON.parse(JSON.stringify(response))
  console.log(events)

  return { props: { events } }
}

export default Index
