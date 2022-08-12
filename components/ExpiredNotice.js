import React from 'react';

export const ExpiredNotice = ({matchId}) => {
    return (
        <div className="expired-notice-container">
           
      <a target='_blank' rel="noreferrer" href={`https://www.faceit.com/en/csgo/room/${matchId}/scoreboard`} className="expired-notice">
        <p>Faceit match link</p>
      </a>
      </div>
    );
  };