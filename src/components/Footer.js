import React from 'react';


const Footer = ({getCurrentStateInJSONFormat}) => {

  return (
    <div className="footer">
      {'['}
      {
        getCurrentStateInJSONFormat.map((row, i) => {
          return <div
            key={i + 'json'}
            className="footer-row"
          >
            {
              row.map((square) => {
                return <span key={Object.keys(square)[0] + '-json'}>
                  {JSON.stringify(square)}{', '}
                </span>
              })
            }
          </div>
        })
      }
      {']'}
    </div>
  );
};


export default Footer;