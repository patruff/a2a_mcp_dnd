'use client';

import React, {useState, useEffect} from 'react';
import './TavernMap.css'; // We'll define styles here

const TavernMap = () => {
  // State for character positions and movement
  const [characters, setCharacters] = useState({
    gnomeThief: {position: [12, 15], facing: 'north', type: 'gnome'},
    bartender: {position: [8, 1], facing: 'south', type: 'human'},
    wizard: {position: [17, 7], facing: 'south', type: 'human'},
  });

  // Map configuration
  const mapConfig = {
    width: 24,
    height: 18,
    cellSize: 30, // pixels per cell
  };

  // Furniture and fixtures data
  const furniture = {
    bar: {position: [3, 1], width: 15, height: 1},
    barrels: [
      {position: [2, 2]},
      {position: [3, 2]},
      {position: [4, 2]},
    ],
    rectangularTables: [
      {position: [5, 9], orientation: 'horizontal'},
      {position: [5, 12], orientation: 'horizontal'},
      {position: [9, 9], orientation: 'horizontal'},
      {position: [9, 12], orientation: 'horizontal'},
      {position: [13, 9], orientation: 'horizontal'},
      {position: [13, 12], orientation: 'horizontal'},
    ],
    roundTables: [
      {position: [17, 7]},
      {position: [17, 10]},
      {position: [17, 13]},
    ],
    bearskinRug: {position: [12, 8], width: 2, height: 3},
    cauldron: {position: [1, 1]},
    piano: {position: [21, 2], width: 2, height: 1},
    entranceCarpet: {position: [12, 16], width: 1, height: 2},
  };

  // Create the grid cells
  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < mapConfig.height; y++) {
      for (let x = 0; x < mapConfig.width; x++) {
        cells.push(
          <div
            key={`cell-${x}-${y}`}
            className="grid-cell"
            style={{
              left: x * mapConfig.cellSize,
              top: y * mapConfig.cellSize,
              width: mapConfig.cellSize,
              height: mapConfig.cellSize,
            }}
          />
        );
      }
    }
    return cells;
  };

  // Render furniture
  const renderFurniture = () => {
    const items = [];

    // Bar counter
    items.push(
      <div
        key="bar"
        className="furniture bar"
        style={{
          left: furniture.bar.position[0] * mapConfig.cellSize,
          top: furniture.bar.position[1] * mapConfig.cellSize,
          width: furniture.bar.width * mapConfig.cellSize,
          height: furniture.bar.height * mapConfig.cellSize,
        }}
      />
    );

    // Barrels
    furniture.barrels.forEach((barrel, i) => {
      items.push(
        <div
          key={`barrel-${i}`}
          className="furniture barrel"
          style={{
            left: barrel.position[0] * mapConfig.cellSize,
            top: barrel.position[1] * mapConfig.cellSize,
            width: mapConfig.cellSize,
            height: mapConfig.cellSize,
          }}
        />
      );
    });

    // Rectangular tables
    furniture.rectangularTables.forEach((table, i) => {
      items.push(
        <div
          key={`rect-table-${i}`}
          className="furniture rectangular-table"
          style={{
            left: table.position[0] * mapConfig.cellSize,
            top: table.position[1] * mapConfig.cellSize,
            width: (table.orientation === 'horizontal' ? 2 : 1) * mapConfig.cellSize,
            height: (table.orientation === 'vertical' ? 2 : 1) * mapConfig.cellSize,
          }}
        >
          <div className="table-surface"/>
        </div>
      );
    });

    // Round tables
    furniture.roundTables.forEach((table, i) => {
      items.push(
        <div
          key={`round-table-${i}`}
          className="furniture round-table"
          style={{
            left: table.position[0] * mapConfig.cellSize,
            top: table.position[1] * mapConfig.cellSize,
            width: mapConfig.cellSize,
            height: mapConfig.cellSize,
          }}
        />
      );
    });

    // Bearskin rug
    items.push(
      <div
        key="bearskin"
        className="furniture bearskin-rug"
        style={{
          left: furniture.bearskinRug.position[0] * mapConfig.cellSize,
          top: furniture.bearskinRug.position[1] * mapConfig.cellSize,
          width: furniture.bearskinRug.width * mapConfig.cellSize,
          height: furniture.bearskinRug.height * mapConfig.cellSize,
        }}
      />
    );

    // Piano
    items.push(
      <div
        key="piano"
        className="furniture piano"
        style={{
          left: furniture.piano.position[0] * mapConfig.cellSize,
          top: furniture.piano.position[1] * mapConfig.cellSize,
          width: furniture.piano.width * mapConfig.cellSize,
          height: furniture.piano.height * mapConfig.cellSize,
        }}
      />
    );

    // Cauldron
    items.push(
      <div
        key="cauldron"
        className="furniture cauldron"
        style={{
          left: furniture.cauldron.position[0] * mapConfig.cellSize,
          top: furniture.cauldron.position[1] * mapConfig.cellSize,
          width: mapConfig.cellSize,
          height: mapConfig.cellSize,
        }}
      />
    );

    // Entrance carpet
    items.push(
      <div
        key="entrance-carpet"
        className="furniture entrance-carpet"
        style={{
          left: furniture.entranceCarpet.position[0] * mapConfig.cellSize,
          top: furniture.entranceCarpet.position[1] * mapConfig.cellSize,
          width: furniture.entranceCarpet.width * mapConfig.cellSize,
          height: furniture.entranceCarpet.height * mapConfig.cellSize,
        }}
      />
    );

    return items;
  };

  // Render characters
  const renderCharacters = () => {
    return Object.entries(characters).map(([id, char]) => (
      <div
        key={id}
        className={`character ${char.type}`}
        style={{
          left: char.position[0] * mapConfig.cellSize + mapConfig.cellSize * 0.1,
          top: char.position[1] * mapConfig.cellSize + mapConfig.cellSize * 0.1,
          width: mapConfig.cellSize * 0.8,
          height: mapConfig.cellSize * 0.8,
        }}
      >
        <div className={`facing ${char.facing}`} />
      </div>
    ));
  };

  // Render smoke effect
  const renderSmoke = () => {
    return (
      <div className="smoke-overlay">
        <div className="smoke-particle-container">
          {Array(20).fill().map((_, i) => (
            <div key={`smoke-${i}`} className="smoke-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.1 + Math.random() * 0.3,
            }} />
          ))}
        </div>
      </div>
    );
  };

  // Handle character movement
  const moveCharacter = (id, direction) => {
    setCharacters(prev => {
      const char = {...prev[id]};
      const [x, y] = char.position;

      // Update facing
      char.facing = direction;

      // Calculate new position based on direction
      if (direction === 'north' && y > 0) char.position = [x, y - 1];
      if (direction === 'south' && y < mapConfig.height - 1) char.position = [x, y + 1];
      if (direction === 'west' && x > 0) char.position = [x - 1, y];
      if (direction === 'east' && x < mapConfig.width - 1) char.position = [x + 1, y];

      return {...prev, [id]: char};
    });
  };

  // Add wall torches for lighting
  const renderTorches = () => {
    const torchPositions = [
      [0, 3], [0, 9], [0, 15],
      [6, 0], [12, 0], [18, 0],
      [23, 3], [23, 9], [23, 15],
      [6, 17], [12, 17], [18, 17],
    ];

    return torchPositions.map((pos, i) => (
      <div
        key={`torch-${i}`}
        className="torch"
        style={{
          left: pos[0] * mapConfig.cellSize,
          top: pos[1] * mapConfig.cellSize,
        }}
      >
        <div className="flame" />
      </div>
    ));
  };

  return (
    <div className="tavern-map-container">
      <div
        className="tavern-map"
        style={{
          width: mapConfig.width * mapConfig.cellSize,
          height: mapConfig.height * mapConfig.cellSize,
        }}
      >
        <div className="tavern-floor" />
        <div className="grid-container">
          {renderGrid()}
        </div>
        <div className="furniture-container">
          {renderFurniture()}
        </div>
        <div className="torch-container">
          {renderTorches()}
        </div>
        <div className="character-container">
          {renderCharacters()}
        </div>
        {renderSmoke()}
      </div>

      {/* Simple controls for testing */}
      <div className="controls">
        <h3>Move Gnome Thief</h3>
        <div className="direction-buttons">
          <button onClick={() => moveCharacter('gnomeThief', 'north')}>North</button>
          <button onClick={() => moveCharacter('gnomeThief', 'south')}>South</button>
          <button onClick={() => moveCharacter('gnomeThief', 'west')}>West</button>
          <button onClick={() => moveCharacter('gnomeThief', 'east')}>East</button>
        </div>
      </div>
    </div>
  );
};

export default TavernMap;
