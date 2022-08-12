import dbConnect from '../util/dbConnect'
import { IEvent, Event } from './api/models/Events'
import { addSeconds, parseISO, formatDistanceToNow, setDate, isBefore, differenceInSeconds } from 'date-fns'

interface IProps {
  events: IEvent[];
}

const Index = (props: IProps) => (
  <>
    {/* Create a card for each pet */}
    {props.events.map((match: IEvent, index) => {
      const date = parseISO(match.timestamp)

      const target = addSeconds(date, 298);

      const diff = differenceInSeconds(target, new Date());

      const days = Math.floor(diff / 86400);
      const hours = Math.floor((diff - days * 86400) / 3600);
      const minutes = Math.floor((diff - days * 86400 - hours * 3600) / 60);
      const seconds = diff - days * 86400 - hours * 3600 - minutes * 60;

      return (
        <>
          <div key={match.transaction_id}>
            {match.payload.id}

          </div>
          <div key={index}>
            {target.toISOString()}
          </div>
          <div key={index}>
            {date.toISOString()}
          </div>
          <div key={index}>
            Days: {days}
          </div>
          <div key={index}>
            Hours: {hours}
          </div>
          <div key={index}>
            Minutes: {minutes}
          </div>
          <div key={index}>
            Seconds {seconds}
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
