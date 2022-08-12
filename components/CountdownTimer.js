import React from 'react';
import { useCountdown } from '../util/useCountdown';
import {ExpiredNotice} from './ExpiredNotice';
import {ShowCounter} from './ShowCounter';

export const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
    console.log(targetDate)
  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};