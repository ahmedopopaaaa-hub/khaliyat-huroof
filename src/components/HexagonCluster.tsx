import React from 'react';

export const HexagonCluster = ({ side }: { side: 'left' | 'right' }) => {
  const isLeft = side === 'left';
  
  const hexRadius = 40;
  
  const hexPositions = [
    { q: 0, r: 0, letter: 'أ' },
    { q: 1, r: -1, letter: 'ب' },
    { q: 1, r: 0, letter: 'ت' },
    { q: 0, r: 1, letter: 'ث' },
    { q: -1, r: 1, letter: 'ج' },
    { q: -1, r: 0, letter: 'ح' },
    { q: 0, r: -1, letter: 'خ' },
    { q: 2, r: -1, letter: 'د' },
    { q: 2, r: -2, letter: 'ذ' },
    { q: 1, r: 1, letter: 'ر' },
    { q: -1, r: -1, letter: 'ز' },
    { q: -2, r: 1, letter: 'س' },
  ];

  return (
    <div className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? 'left-8' : 'right-8'} hidden lg:block opacity-90 pointer-events-none z-0`}>
      <svg width="300" height="400" viewBox="-150 -200 300 400" style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.1))' }}>
        <defs>
          <filter id="hex-glow">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.4" />
          </filter>
        </defs>
        {hexPositions.map((pos, i) => {
          const x = hexRadius * Math.sqrt(3) * (pos.q + pos.r / 2) * (isLeft ? 1 : -1);
          const y = hexRadius * 3/2 * pos.r;
          
          return (
            <g key={i} transform={`translate(${x}, ${y})`}>
              <polygon
                points="0,-40 34.64,-20 34.64,20 0,40 -34.64,20 -34.64,-20"
                fill="#ffffff"
                stroke="#1e1b4b"
                strokeWidth="2"
                filter="url(#hex-glow)"
              />
              <text
                x="0"
                y="10"
                textAnchor="middle"
                fill="#6b21a8"
                fontSize="24"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                {pos.letter}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
