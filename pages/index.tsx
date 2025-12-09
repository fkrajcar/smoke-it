import Container from '@mui/material/Container'
import { GetServerSideProps } from 'next'
import React from 'react'

import EventsList from '@/components/EventsList'
import { processMatchHistory } from '@/src/lib/matchHelpers'
import { MatchService } from '@/src/services/matchService'
import { IEvent } from '@/src/types/match.types'

interface IndexPageProps {
  finishedMatches: IEvent[]
}

const IndexPage: React.FC<IndexPageProps> = ({ finishedMatches }) => (
  <Container disableGutters>
    <EventsList events={finishedMatches} />
  </Container>
)

export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  try {
    const matches = await MatchService.getPlayerMatches()
    const uniqueMatches = processMatchHistory(matches)

    return {
      props: {
        finishedMatches: uniqueMatches,
      },
    }
  } catch (error) {
    console.error('Error fetching matches:', error)

    return {
      props: {
        finishedMatches: [],
      },
    }
  }
}

export default IndexPage
