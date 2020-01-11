import React from 'react';

import Button from '../Button';

const Points = ({ points }) => (
  <div>
    <div>
      {points}
    </div>
    {points < 1 && (
      <div>
        <Button />
      </div>
    )}
  </div>
);

export default Points;
