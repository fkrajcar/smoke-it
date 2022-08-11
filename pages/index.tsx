import Link from 'next/link'
import Image from 'next/Image'
import dbConnect from '../util/dbConnect'
import { IEvent, Event } from './api/models/Events'

interface IProps {
  events: IEvent[];
}

const Index = (props: IProps) => (
  <>
    {/* Create a card for each pet */}
    {props.events.map((match: IEvent) => (
      <div key={match.transaction_id}>
        {match.payload.id}
      </div>
    ))}
  </>
)

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const response = await Event.find({})
  const events = JSON.parse(JSON.stringify(response))
  console.log(events)

  return { props: { events } }
}

export default Index
