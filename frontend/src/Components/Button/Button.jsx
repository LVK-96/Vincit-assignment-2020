import React from 'react';


const Button = ({
  text, handleClick, disabled, visible,
}) => {
  if (visible) {
    return (
      <div>
        <button type="button" onClick={handleClick} disabled={disabled}>
          {text}
        </button>
      </div>
    );
  }

  return null;
};

export default Button;
