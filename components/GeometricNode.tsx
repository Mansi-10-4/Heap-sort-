
import React, { useEffect, useState } from 'react';
import { NodeState } from '../types';

interface Props {
  node: NodeState;
  x: number;
  y: number;
}

const GeometricNode: React.FC<Props> = ({ node, x, y }) => {
  const size = 64;
  const halfSize = size / 2;
  const [isNewValue, setIsNewValue] = useState(false);

  useEffect(() => {
    setIsNewValue(true);
    const timer = setTimeout(() => setIsNewValue(false), 300);
    return () => clearTimeout(timer);
  }, [node.value]);

  let shapeContent: React.ReactNode;
  let textColor = "fill-white";

  switch (node.status) {
    case 'swapping':
      shapeContent = (
        <circle 
          cx={x} cy={y} r={halfSize} 
          fill="#E63946" 
          stroke="#111111" 
          strokeWidth="6" 
          className="mechanical-transition"
        />
      );
      break;
    case 'comparing':
      shapeContent = (
        <path 
          d={`M ${x} ${y - halfSize} L ${x - halfSize} ${y + halfSize} L ${x + halfSize} ${y + halfSize} Z`}
          fill="#FFDC00"
          stroke="#111111"
          strokeWidth="6"
          className="mechanical-transition"
        />
      );
      textColor = "fill-[#111111]";
      break;
    case 'locked':
      shapeContent = (
        <rect 
          x={x - halfSize} y={y - halfSize} width={size} height={size} 
          fill="#F4F1EA" 
          stroke="#111111" 
          strokeWidth="2" 
          strokeDasharray="4,4"
          className="mechanical-transition"
        />
      );
      textColor = "fill-gray-400";
      break;
    case 'selected':
      shapeContent = (
        <g transform="translate(0, -8)" className="mechanical-transition">
          <rect 
            x={x - halfSize + 8} y={y - halfSize + 8} width={size} height={size} 
            fill="#111111" 
          />
          <rect 
            x={x - halfSize} y={y - halfSize} width={size} height={size} 
            fill="#003049" 
            stroke="#111111" 
            strokeWidth="6" 
          />
        </g>
      );
      break;
    default:
      shapeContent = (
        <rect 
          x={x - halfSize} y={y - halfSize} width={size} height={size} 
          fill="#003049" 
          stroke="#111111" 
          strokeWidth="6" 
          className="mechanical-transition"
        />
      );
  }

  const labelYOffset = node.status === 'selected' ? -3 : 5;

  return (
    <g className={`select-none ${isNewValue ? 'kinetic-pop' : ''}`} style={{ transformOrigin: `${x}px ${y}px` }}>
      {shapeContent}
      <text 
        x={x} 
        y={y + labelYOffset} 
        textAnchor="middle" 
        className={`${textColor} font-bold italic text-xl mechanical-transition`}
      >
        {node.value}
      </text>
      <text 
        x={x} 
        y={y + halfSize + 24} 
        textAnchor="middle" 
        className="text-[10px] font-mono fill-[#111111] font-bold uppercase tracking-widest"
      >
        I:{node.index}
      </text>
    </g>
  );
};

export default GeometricNode;
