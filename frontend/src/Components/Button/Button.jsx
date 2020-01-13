import React from 'react';


const Button = ({
  className, text, handleClick, disabled, visible,
}) => {
  if (visible) {
    return (
      <>
        <button className={className} type="button" onClick={handleClick} disabled={disabled}>
          {text}
        </button>
      </>
    );
  }

  return null;
};

export default Button;
