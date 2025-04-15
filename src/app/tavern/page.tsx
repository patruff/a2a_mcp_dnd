'use client';

import React from 'react';

// Tavern Map Description with Objects and Character Positions
const tavernMap = {
  dimensions: {
    width: 24, // grid squares across (each 5 feet)
    height: 18, // grid squares down
    squareSize: 5, // feet per square
  },

  // Basic environment elements
  environment: {
    floorType: 'stone',
    wallType: 'stone',
    lighting: 'dim', // due to smokiness
    visibility: 6, // squares of clear visibility (30 feet)
    ambience: 'smoky',
    torches: [
      // Positions of wall torches [x, y]
      [0, 3],
      [0, 9],
      [0, 15],
      [6, 0],
      [12, 0],
      [18, 0],
      [23, 3],
      [23, 9],
      [23, 15],
      [6, 17],
      [12, 17],
      [18, 17],
    ],
  },

  // Large fixtures
  fixtures: {
    bar: {
      type: 'counter',
      position: [3, 1],
      width: 15,
      height: 1,
      direction: 'horizontal',
    },
    barrels: [
      {position: [2, 2], size: 1},
      {position: [3, 2], size: 1},
      {position: [4, 2], size: 1},
    ],
    cauldron: {position: [1, 1], size: 1},
    piano: {position: [21, 2], width: 2, height: 1},
    bearskinRug: {position: [12, 8], width: 2, height: 3},
    entranceCarpet: {position: [12, 16], width: 1, height: 2, color: 'red'},
    entrancePlants: [
      {position: [11, 16], size: 1},
      {position: [13, 16], size: 1},
    ],
  },

  // Tables and seating
  furniture: {
    // Rectangular tables (2x1 squares)
    rectangularTables: [
      {position: [5, 9], orientation: 'horizontal'},
      {position: [5, 12], orientation: 'horizontal'},
      {position: [9, 9], orientation: 'horizontal'},
      {position: [9, 12], orientation: 'horizontal'},
      {position: [13, 9], orientation: 'horizontal'},
      {position: [13, 12], orientation: 'horizontal'},
    ],
    // Round tables (1 square)
    roundTables: [
      {position: [17, 7], radius: 1},
      {position: [17, 10], radius: 1},
      {position: [17, 13], radius: 1},
    ],
    // Chairs (positions around tables)
    chairs: [
      // Bar stools
      {position: [5, 2], facing: 'north'},
      {position: [7, 2], facing: 'north'},
      {position: [9, 2], facing: 'north'},
      {position: [11, 2], facing: 'north'},
      {position: [13, 2], facing: 'north'},
      {position: [15, 2], facing: 'north'},

      // Chairs for rectangular tables
      {position: [4, 9], facing: 'east'},
      {position: [6, 9], facing: 'west'},
      {position: [4, 12], facing: 'east'},
      {position: [6, 12], facing: 'west'},

      {position: [8, 9], facing: 'east'},
      {position: [10, 9], facing: 'west'},
      {position: [8, 12], facing: 'east'},
      {position: [10, 12], facing: 'west'},

      {position: [12, 9], facing: 'east'},
      {position: [14, 9], facing: 'west'},
      {position: [12, 12], facing: 'east'},
      {position: [14, 12], facing: 'west'},

      // Chairs for round tables (4 per table)
      {position: [16, 7], facing: 'east'},
      {position: [18, 7], facing: 'west'},
      {position: [17, 6], facing: 'south'},
      {position: [17, 8], facing: 'north'},

      {position: [16, 10], facing: 'east'},
      {position: [18, 10], facing: 'west'},
      {position: [17, 9], facing: 'south'},
      {position: [17, 11], facing: 'north'},

      {position: [16, 13], facing: 'east'},
      {position: [18, 13], facing: 'west'},
      {position: [17, 12], facing: 'south'},
      {position: [17, 14], facing: 'north'},
    ],
    specialSeat: {position: [20, 4], facing: 'west'},
  },

  // Character starting positions
  characters: {
    bartender: {
      position: [8, 1],
      facing: 'south',
      race: 'human',
      description: 'Wiping glasses behind the bar counter',
    },
    gnomeThief: {
      position: [12, 15],
      facing: 'north',
      race: 'gnome',
      height: 3, // feet
      movementSpeed: 25, // feet per round (5 squares)
      description: 'Just entered the tavern, partially obscured by smoke',
    },
    wizard: {
      position: [17, 7],
      facing: 'south',
      race: 'human',
      description: 'Sitting at the easternmost round table, nursing a drink',
    },
    // Add random patrons for atmosphere
    patrons: [
      {position: [5, 9], type: 'dwarf', activity: 'drinking'},
      {position: [13, 12], type: 'human', activity: 'eating'},
      {position: [9, 2], type: 'half-elf', activity: 'talking'},
      {position: [17, 13], type: 'halfling', activity: 'gambling'},
    ],
  },

  // Interactive objects or points of interest
  interactiveElements: {
    secretDoor: {position: [0, 5], visible: false, requiresCheck: 'perception'},
    suspiciousPatron: {position: [14, 9], description: 'Watching the entrance carefully'},
    droppedPurse: {position: [10, 14], visible: true, requiresCheck: 'investigation'},
  },
};

const TavernGrid = ({children}: {children: React.ReactNode}) => (
  <div
    className="tavern-grid"
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${tavernMap.dimensions.width}, 1fr)`,
      gridTemplateRows: `repeat(${tavernMap.dimensions.height}, 1fr)`,
      width: 'calc(50px * 24)',
      height: 'calc(50px * 18)',
      background: '#826d5c', // stone floor color
      border: '1px solid black',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
);

const Table = ({position, size, type}: {position: number[]; size: any; type: string}) => {
  const [x, y] = position;
  return (
    <div
      className={`table ${type}`}
      style={{
        gridColumn: `${x + 1} / span ${size.width || 1}`,
        gridRow: `${y + 1} / span ${size.height || 1}`,
        background: '#5e4b38', // wooden color
        borderRadius: type === 'round' ? '50%' : '4px',
        border: '2px solid #3d3023',
      }}
    />
  );
};

const SmokeEffect = ({visibility}: {visibility: number}) => (
  <div
    className="smoke-layer"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        'radial-gradient(circle at center, transparent 0%, rgba(120, 120, 120, 0.3) 40%, rgba(80, 80, 80, 0.7) 80%)',
      pointerEvents: 'none',
      zIndex: 10,
    }}
  >
    {/* Add animated smoke particles here */}
  </div>
);

const Character = ({data}: {data: any}) => {
  const [x, y] = data.position;
  return (
    <div
      className={`character ${data.race} ${data.type || ''}`}
      style={{
        gridColumn: x + 1,
        gridRow: y + 1,
        zIndex: 5,
        width: '80%',
        height: '80%',
        margin: '10%',
        background:
          data.race === 'gnome'
            ? '#8B6D9C'
            : data.race === 'human'
            ? '#D2B48C'
            : data.race === 'dwarf'
            ? '#A67153'
            : '#92A67A',
        borderRadius: '50%',
        position: 'relative',
        boxShadow: '0 0 0 2px black',
      }}
    >
      {/* Direction indicator */}
      <div
        className="facing"
        style={{
          position: 'absolute',
          width: '40%',
          height: '40%',
          background: 'white',
          borderRadius: '50%',
          top:
            data.facing === 'north'
              ? '5%'
              : data.facing === 'south'
              ? '55%'
              : '30%',
          left:
            data.facing === 'west'
              ? '5%'
              : data.facing === 'east'
              ? '55%'
              : '30%',
        }}
      />
    </div>
  );
};

const TavernPage: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <TavernGrid>
        {/* Stone floor effect */}
        {[...Array(tavernMap.dimensions.width * tavernMap.dimensions.height)].map((_, i) => (
          <div key={i} style={{border: '1px solid rgba(0,0,0,0.1)'}} />
        ))}

        {/* Northern Wall */}
        <div
          style={{
            backgroundColor: '#544e31',
            gridColumn: '1 / span 24',
            gridRow: '1 / span 1',
            zIndex: 2,
          }}
        />
        {/* Render fixtures */}
        <Table position={tavernMap.fixtures.bar.position} size={{width: tavernMap.fixtures.bar.width, height: tavernMap.fixtures.bar.height}} type="bar" />
        {tavernMap.fixtures.barrels.map((barrel, index) => (
          <Table key={index} position={barrel.position} size={{width: barrel.size, height: barrel.size}} type="barrel" />
        ))}
        <Table position={tavernMap.fixtures.piano.position} size={{width: tavernMap.fixtures.piano.width, height: tavernMap.fixtures.piano.height}} type="piano" />
        
        {/* Render characters */}
        {Object.entries(tavernMap.characters).map(([key, character]) => {
          if (key !== 'patrons') {
            return <Character key={key} data={character} />;
          }
          return null;
        })}

        {/* Render patrons */}
        {tavernMap.characters.patrons && tavernMap.characters.patrons.map((patron, index) => (
          <Character key={`patron-${index}`} data={patron} />
        ))}

        {/* Smoke effect */}
        <SmokeEffect visibility={tavernMap.environment.visibility} />
      </TavernGrid>
      <p className="text-sm text-gray-500 mt-4">
        A detailed representation of the Smoky Tavern using CSS Grid.
      </p>
    </div>
  );
};

export default TavernPage;
