import React from 'react';

const GameMessage = ({ message }) => {
  const msg = message !== null ? `Sait ${message.win} pistettä, seuraavaan voittoon ${message.untillNext} painallusta!` : '';
  return (
    <div>
      {msg}
    </div>
  );
};

export default GameMessage;
