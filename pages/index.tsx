import dbConnect from '../util/dbConnect'
import { IEvent, Event } from './api/models/Events'
import { parseISO, formatDistanceToNow } from 'date-fns'

interface IProps {
  events: IEvent[];
}

const Index = (props: IProps) => (
  <>
    {/* Create a card for each pet */}
    {props.events.map((match: IEvent, index) => {
      const date = parseISO(match.timestamp)
      const timePeriod = formatDistanceToNow(date)

      return (
        <>
          <div key={match.transaction_id}>
            {match.payload.id}

          </div>
          <div key={index}>
            {timePeriod}
          </div>
        </>
      )
    }

    )}
  </>
)

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const response = await Event.find({ event: 'match_status_ready' })

  const events = JSON.parse(JSON.stringify(response))
  console.log(events)

  return { props: { events } }
}

export default Index
