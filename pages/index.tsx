import Container from '@mui/material/Container'

import { Counter } from '../components/Counter'
import EventsList from '../components/EventsList'
import dbConnect from '../util/dbConnect'
import { Event, IEvent, MatchStatus } from './api/models/Events'

interface IProps {
  finishedMatches: IEvent[]
  readyMatch: IEvent
}

const Index = ({ finishedMatches, readyMatch }: IProps) => (
  <Container disableGutters>
    {readyMatch?.payload?.id && (
      <Counter
        matchId={readyMatch.payload.id}
        targetTimestamp={readyMatch.timestamp}
      />
    )}

    <EventsList events={finishedMatches} />
  </Container>
)

export async function getStaticProps() {
  await dbConnect()

  const finishedMatchesResponse = await Event.find({
    event: MatchStatus.FINISHED,
  })
    .limit(10)
    .sort({ timestamp: -1 })

  const readyMatchResponse = await Event.findOne({
    event: MatchStatus.READY,
  }).sort('-_id')

  const finishedMatches = JSON.parse(JSON.stringify(finishedMatchesResponse))
  const readyMatch = JSON.parse(JSON.stringify(readyMatchResponse))

  return { props: { finishedMatches, readyMatch } }
}

export default Index
