import React from 'react';
import Square from './Square'

const Row = ({row}) => {
  return (
    <div
      className="row"
    >
      {
        row.map((square) => {
          return <Square
            key={square.code}
            square={square}
          />
        })
      }
    </div>
  );
};


export default Row;