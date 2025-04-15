'use client';

import React, { useState, useEffect } from 'react';

const TavernMap = () => {
  // State for character positions and movement
  const [characters, setCharacters] = useState({
    gnomeThief: { position: [12, 15], facing: 'north', type: 'gnome' },
    bartender: { position: [8, 1], facing: 'south', type: 'human' },
    wizard: { position: [17, 7], facing: 'south', type: 'human' }
  });
  
  // Map configuration
  const mapConfig = {
    width: 24,
    height: 18,
    cellSize: 30, // pixels per cell
  };
  
  // Furniture and fixtures data
  const furniture = {
    bar: { position: [3, 1], width: 15, height: 1 },
    barrels: [
      { position: [2, 2] },
      { position: [3, 2] },
      { position: [4, 2] }
    ],
    rectangularTables: [
      { position: [5, 9], orientation: "horizontal" },
      { position: [5, 12], orientation: "horizontal" },
      { position: [9, 9], orientation: "horizontal" },
      { position: [9, 12], orientation: "horizontal" },
      { position: [13, 9], orientation: "horizontal" },
      { position: [13, 12], orientation: "horizontal" }
    ],
    roundTables: [
      { position: [17, 7] },
      { position: [17, 10] },
      { position: [17, 13] }
    ],
    bearskinRug: { position: [12, 8], width: 2, height: 3 },
    cauldron: { position: [1, 1] },
    piano: { position: [21, 2], width: 2, height: 1 },
    entranceCarpet: { position: [12, 16], width: 1, height: 2 }
  };
  
  // Styles
  const styles = {
    tavernMapContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    tavernMap: {
      position: 'relative',
      overflow: 'hidden',
      border: '8px solid #5d4037',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
      backgroundColor: '#8D6E63',
      width: mapConfig.width * mapConfig.cellSize,
      height: mapConfig.height * mapConfig.cellSize,
    },
    tavernFloor: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'repeating-conic-gradient(#796755 0% 25%, #695A4A 0% 50%)',
      backgroundSize: '60px 60px',
      opacity: 0.8,
    },
    gridContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    gridCell: {
      position: 'absolute',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      boxSizing: 'border-box',
    },
    furnitureContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    furniture: {
      position: 'absolute',
      boxSizing: 'border-box',
    },
    bar: {
      backgroundColor: '#5D4037',
      border: '2px solid #3E2723',
      height: '30px',
      borderRadius: '3px',
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.3)',
    },
    barrel: {
      backgroundColor: '#8D6E63',
      border: '2px solid #5D4037',
      borderRadius: '50%',
      backgroundImage: 'linear-gradient(90deg, transparent 45%, #5D4037 45%, #5D4037 55%, transparent 55%)',
    },
    rectangularTable: {
      padding: '2px',
      backgroundColor: '#8D6E63',
      border: '2px solid #5D4037',
      borderRadius: '3px',
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)',
    },
    tableSurface: {
      width: '100%',
      height: '100%',
      backgroundColor: '#A1887F',
      borderRadius: '2px',
    },
    roundTable: {
      backgroundColor: '#8D6E63',
      border: '2px solid #5D4037',
      borderRadius: '50%',
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)',
    },
    bearskinRug: {
      backgroundColor: '#A87754',
      borderRadius: '40%',
      opacity: 0.8,
    },
    cauldron: {
      backgroundColor: '#212121',
      border: '2px solid #000000',
      borderRadius: '50%',
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4)',
    },
    piano: {
      backgroundColor: '#3E2723',
      border: '2px solid #212121',
      borderRadius: '3px',
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.3)',
    },
    entranceCarpet: {
      backgroundColor: '#B71C1C',
      border: '1px solid #8B0000',
      opacity: 0.8,
    },
    characterContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    },
    character: {
      position: 'absolute',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.3)',
    },
    gnome: {
      backgroundColor: '#7CB342',
      border: '2px solid #558B2F',
    },
    human: {
      backgroundColor: '#FFCA28',
      border: '2px solid #F57F17',
    },
    facing: {
      width: '40%',
      height: '40%',
      backgroundColor: 'white',
      borderRadius: '50%',
      position: 'absolute',
    },
    facingNorth: {
      top: '10%',
      left: '30%',
    },
    facingSouth: {
      bottom: '10%',
      left: '30%',
    },
    facingEast: {
      top: '30%',
      right: '10%',
    },
    facingWest: {
      top: '30%',
      left: '10%',
    },
    torchContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    torch: {
      position: 'absolute',
      width: '10px',
      height: '20px',
      backgroundColor: '#5D4037',
      zIndex: 50,
    },
    flame: {
      position: 'absolute',
      top: '-10px',
      left: '-5px',
      width: '20px',
      height: '20px',
      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
      background: 'linear-gradient(to top, #FF5722, #FFEB3B)',
      animation: 'flicker 0.5s infinite alternate',
      boxShadow: '0 0 10px 5px rgba(255, 193, 7, 0.5)',
    },
    smokeOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at center, transparent 0%, rgba(120, 120, 120, 0.1) 40%, rgba(80, 80, 80, 0.3) 80%)',
      zIndex: 200,
      pointerEvents: 'none',
    },
    smokeParticleContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    smokeParticle: {
      position: 'absolute',
      width: '40px',
      height: '40px',
      background: 'radial-gradient(circle, rgba(200, 200, 200, 0.6) 0%, rgba(200, 200, 200, 0) 70%)',
      borderRadius: '50%',
    },
    controls: {
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    directionButtons: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridTemplateRows: '1fr 1fr 1fr',
      gap: '5px',
    },
    button: {
      padding: '8px 12px',
      border: 'none',
      backgroundColor: '#5D4037',
      color: 'white',
      cursor: 'pointer',
      borderRadius: '4px',
    },
    buttonHover: {
      backgroundColor: '#8D6E63',
    }
  };
  
  // Add keyframes for animations
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes flicker {
        0% { transform: scale(0.9); opacity: 0.8; }
        100% { transform: scale(1.1); opacity: 1; }
      }
      
      @keyframes smoke {
        0% { transform: translateY(0) scale(1); opacity: 0.3; }
        100% { transform: translateY(-100px) scale(2); opacity: 0; }
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);
  
  // Create the grid cells
  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < mapConfig.height; y++) {
      for (let x = 0; x < mapConfig.width; x++) {
        cells.push(
          <div 
            key={`cell-${x}-${y}`} 
            style={{
              ...styles.gridCell,
              left: x * mapConfig.cellSize,
              top: y * mapConfig.cellSize,
              width: mapConfig.cellSize,
              height: mapConfig.cellSize
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
        style={{
          ...styles.furniture,
          ...styles.bar,
          left: furniture.bar.position[0] * mapConfig.cellSize,
          top: furniture.bar.position[1] * mapConfig.cellSize,
          width: furniture.bar.width * mapConfig.cellSize,
          height: furniture.bar.height * mapConfig.cellSize
        }}
      />
    );
    
    // Barrels
    furniture.barrels.forEach((barrel, i) => {
      items.push(
        <div 
          key={`barrel-${i}`}
          style={{
            ...styles.furniture,
            ...styles.barrel,
            left: barrel.position[0] * mapConfig.cellSize,
            top: barrel.position[1] * mapConfig.cellSize,
            width: mapConfig.cellSize,
            height: mapConfig.cellSize
          }}
        />
      );
    });
    
    // Rectangular tables
    furniture.rectangularTables.forEach((table, i) => {
      items.push(
        <div 
          key={`rect-table-${i}`}
          style={{
            ...styles.furniture,
            ...styles.rectangularTable,
            left: table.position[0] * mapConfig.cellSize,
            top: table.position[1] * mapConfig.cellSize,
            width: (table.orientation === "horizontal" ? 2 : 1) * mapConfig.cellSize,
            height: (table.orientation === "vertical" ? 2 : 1) * mapConfig.cellSize
          }}
        >
          <div style={styles.tableSurface}/>
        </div>
      );
    });
    
    // Round tables
    furniture.roundTables.forEach((table, i) => {
      items.push(
        <div 
          key={`round-table-${i}`}
          style={{
            ...styles.furniture,
            ...styles.roundTable,
            left: table.position[0] * mapConfig.cellSize,
            top: table.position[1] * mapConfig.cellSize,
            width: mapConfig.cellSize,
            height: mapConfig.cellSize
          }}
        />
      );
    });
    
    // Bearskin rug
    items.push(
      <div 
        key="bearskin"
        style={{
          ...styles.furniture,
          ...styles.bearskinRug,
          left: furniture.bearskinRug.position[0] * mapConfig.cellSize,
          top: furniture.bearskinRug.position[1] * mapConfig.cellSize,
          width: furniture.bearskinRug.width * mapConfig.cellSize,
          height: furniture.bearskinRug.height * mapConfig.cellSize
        }}
      />
    );
    
    // Piano
    items.push(
      <div 
        key="piano"
        style={{
          ...styles.furniture,
          ...styles.piano,
          left: furniture.piano.position[0] * mapConfig.cellSize,
          top: furniture.piano.position[1] * mapConfig.cellSize,
          width: furniture.piano.width * mapConfig.cellSize,
          height: furniture.piano.height * mapConfig.cellSize
        }}
      />
    );
    
    // Cauldron
    items.push(
      <div 
        key="cauldron"
        style={{
          ...styles.furniture,
          ...styles.cauldron,
          left: furniture.cauldron.position[0] * mapConfig.cellSize,
          top: furniture.cauldron.position[1] * mapConfig.cellSize,
          width: mapConfig.cellSize,
          height: mapConfig.cellSize
        }}
      />
    );
    
    // Entrance carpet
    items.push(
      <div 
        key="entrance-carpet"
        style={{
          ...styles.furniture,
          ...styles.entranceCarpet,
          left: furniture.entranceCarpet.position[0] * mapConfig.cellSize,
          top: furniture.entranceCarpet.position[1] * mapConfig.cellSize,
          width: furniture.entranceCarpet.width * mapConfig.cellSize,
          height: furniture.entranceCarpet.height * mapConfig.cellSize
        }}
      />
    );
    
    return items;
  };
  
  // Render characters
  const renderCharacters = () => {
    return Object.entries(characters).map(([id, char]) => {
      // Determine facing style
      let facingStyle;
      switch(char.facing) {
        case 'north':
          facingStyle = styles.facingNorth;
          break;
        case 'south':
          facingStyle = styles.facingSouth;
          break;
        case 'east':
          facingStyle = styles.facingEast;
          break;
        case 'west':
          facingStyle = styles.facingWest;
          break;
        default:
          facingStyle = styles.facingNorth;
      }
      
      // Determine character style
      let characterTypeStyle;
      switch(char.type) {
        case 'gnome':
          characterTypeStyle = styles.gnome;
          break;
        case 'human':
          characterTypeStyle = styles.human;
          break;
        default:
          characterTypeStyle = styles.human;
      }
      
      return (
        <div
          key={id}
          style={{
            ...styles.character,
            ...characterTypeStyle,
            left: char.position[0] * mapConfig.cellSize + mapConfig.cellSize * 0.1,
            top: char.position[1] * mapConfig.cellSize + mapConfig.cellSize * 0.1,
            width: mapConfig.cellSize * 0.8,
            height: mapConfig.cellSize * 0.8
          }}
        >
          <div style={{
            ...styles.facing,
            ...facingStyle
          }} />
        </div>
      );
    });
  };
  
  // Render smoke effect
  const renderSmoke = () => {
    const smokeParticles = [];
    for (let i = 0; i < 20; i++) {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 5;
      const opacity = 0.1 + Math.random() * 0.3;
      
      smokeParticles.push(
        <div 
          key={`smoke-${i}`} 
          style={{
            ...styles.smokeParticle,
            left: `${left}%`,
            top: `${top}%`,
            opacity: opacity,
            animation: `smoke ${10 + Math.random() * 5}s infinite linear`,
            animationDelay: `${delay}s`
          }} 
        />
      );
    }
    
    return (
      <div style={styles.smokeOverlay}>
        <div style={styles.smokeParticleContainer}>
          {smokeParticles}
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
      [6, 17], [12, 17], [18, 17]
    ];
    
    return torchPositions.map((pos, i) => (
      <div 
        key={`torch-${i}`}
        style={{
          ...styles.torch,
          left: pos[0] * mapConfig.cellSize,
          top: pos[1] * mapConfig.cellSize,
        }}
      >
        <div style={styles.flame} />
      </div>
    ));
  };
  
  return (
    <div style={styles.tavernMapContainer}>
      <div style={styles.tavernMap}>
        <div style={styles.tavernFloor} />
        <div style={styles.gridContainer}>
          {renderGrid()}
        </div>
        <div style={styles.furnitureContainer}>
          {renderFurniture()}
        </div>
        <div style={styles.torchContainer}>
          {renderTorches()}
        </div>
        <div style={styles.characterContainer}>
          {renderCharacters()}
        </div>
        {renderSmoke()}
      </div>
      
      {/* Simple controls for testing */}
      <div style={styles.controls}>
        <h3>Move Gnome Thief</h3>
        <div style={styles.directionButtons}>
          <button 
            onClick={() => moveCharacter('gnomeThief', 'north')}
            style={styles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = '#8D6E63'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#5D4037'}
          >
            North
          </button>
          <div style={{height: '5px'}}></div>
          <button 
            onClick={() => moveCharacter('gnomeThief', 'west')}
            style={styles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = '#8D6E63'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#5D4037'}
          >
            West
          </button>
          <div style={{width: '5px'}}></div>
          <button 
            onClick={() => moveCharacter('gnomeThief', 'east')}
            style={styles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = '#8D6E63'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#5D4037'}
          >
            East
          </button>
          <div style={{height: '5px'}}></div>
          <button 
            onClick={() => moveCharacter('gnomeThief', 'south')}
            style={styles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = '#8D6E63'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#5D4037'}
          >
            South
          </button>
        </div>
      </div>
    </div>
  );
};

export default TavernMap;
