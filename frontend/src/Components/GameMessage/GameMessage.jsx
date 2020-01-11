import React from 'react';

const GameMessage = ({ message }) => {
  if (message) {
    const msg = `Sait ${message.win} pistettä, seuraavaan voittoon ${message.untillNext} painallusta!`;
    return (
      <div>
        {msg}
      </div>
    );
  }

  return null;
};

export default GameMessage;
