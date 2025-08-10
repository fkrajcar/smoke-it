import Container from '@mui/material/Container'

import EventsList from '../components/EventsList'
import { IEvent } from './api/models/Events'
import MatchService from './api/utils/matchService'

interface IProps {
  finishedMatches: IEvent[]
  readyMatch: IEvent
}

const Index = ({ finishedMatches }: IProps) => (
  <Container disableGutters>
    <EventsList events={finishedMatches} />
  </Container>
)

export async function getServerSideProps() {
  const matches = await MatchService.getPlayerMatches()

  // Flatten all match items and add id field
  const allMatches = matches.flatMap((match) =>
    match.items.map((item: any) => ({
      ...item,
      id: item.match_id,
    }))
  )

  // Remove duplicates by id and sort by finished_at in one chain
  const uniqueMatches = allMatches
    .filter(
      (match, index, self) => index === self.findIndex((m) => m.id === match.id)
    )
    .sort((a, b) => (b.finished_at || 0) - (a.finished_at || 0))

  return { props: { finishedMatches: uniqueMatches } }
}

export default Index
