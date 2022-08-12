import React from 'react';
import { useCountdown } from '../util/useCountdown';
import {ExpiredNotice} from './ExpiredNotice';
import {ShowCounter} from './ShowCounter';

export const CountdownTimer = ({ targetDate, matchId, matchStatus }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (matchStatus === 'match_status_finished') {
    return <ExpiredNotice matchId={matchId} />;
  } else if (days + hours + minutes + seconds > 0) { 
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  } else{
    return null;
  }
};