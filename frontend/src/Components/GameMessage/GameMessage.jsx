import React from 'react';

const GameMessage = ({ response }) => {
  if (response) {
    const msg = `Sait ${response.win} pistettä, seuraavaan voittoon ${response.untillNext} painallusta!`;
    return (
      <div>
        {msg}
      </div>
    );
  }

  return null;
};

export default GameMessage;
