import React from 'react';
import {DateTimeDisplay} from './DateTimeDisplay';

export const ShowCounter = ({ days, hours, minutes, seconds }) => {
    const isDanger = minutes === 0;
    return (
      <div className="show-counter">
          <DateTimeDisplay value={minutes} type={'Mins'} />
          <p>:</p>
          <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={isDanger} />
      </div>
    );
  };