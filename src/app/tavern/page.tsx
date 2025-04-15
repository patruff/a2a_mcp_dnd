'use client';

import React from 'react';

const TavernPage: React.FC = () => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(24, 1fr)',
    gridTemplateRows: 'repeat(18, 1fr)',
    width: 'calc(50px * 24)',
    height: 'calc(50px * 18)',
    backgroundColor: '#9c6644',
    border: '1px solid black',
    position: 'relative',
    overflow: 'hidden',
  };

  const wallStyle = {
    backgroundColor: '#544e31',
    gridColumn: '1 / span 24',
    gridRow: '1 / span 1',
    zIndex: 2,
  };

  const smokeStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  };

  return (
    <div className="container mx-auto py-10">
      <div style={gridStyle}>
        {/* Stone floor effect */}
        {[...Array(24 * 18)].map((_, i) => (
          <div key={i} style={{border: '1px solid rgba(0,0,0,0.1)'}}/>
        ))}

        {/* Northern Wall */}
        <div style={wallStyle}/>

        {/* Smoke effect */}
        <div style={smokeStyle}/>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        A simple representation of the Smoky Tavern using CSS Grid.
      </p>
    </div>
  );
};

export default TavernPage;
