
import React, { useMemo } from 'react';
import { Step, NodePosition, NodeState } from '../types';
import GeometricNode from './GeometricNode';

interface Props {
  currentStep: Step;
  hoverIndex: number | null;
}

const HierarchyMap: React.FC<Props> = ({ currentStep, hoverIndex }) => {
  const width = 800;
  const height = 600;
  const { array, heapSize, indices, type } = currentStep;

  const nodePositions = useMemo(() => {
    const positions: NodePosition[] = [];
    const levels = Math.ceil(Math.log2(array.length + 1));
    const verticalGap = height / (levels + 1);

    for (let i = 0; i < array.length; i++) {
      const level = Math.floor(Math.log2(i + 1));
      const nodesAtLevel = Math.pow(2, level);
      const horizontalGap = width / (nodesAtLevel + 1);
      const indexAtLevel = i - (Math.pow(2, level) - 1);

      positions.push({
        id: i,
        x: (indexAtLevel + 1) * horizontalGap,
        y: (level + 1) * verticalGap,
      });
    }
    return positions;
  }, [array.length]);

  const nodes: NodeState[] = array.map((val, idx) => {
    let status: NodeState['status'] = 'normal';
    if (idx >= heapSize) status = 'locked';
    else if (indices.includes(idx) || hoverIndex === idx) {
      if (type === 'SWAP') status = 'swapping';
      else if (type === 'COMPARE') status = 'comparing';
      else status = 'selected';
    }
    return { value: val, index: idx, status };
  });

  return (
    <div className="relative w-full h-full bg-[#F4F1EA] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 dot-grid pointer-events-none" />
      
      {/* Coordinate Axis Markers */}
      <div className="absolute left-4 h-full flex flex-col justify-between py-10 opacity-30 select-none">
        {[0, 25, 50, 75, 100].map(n => <span key={n} className="text-[10px] font-bold">Y_{n.toString().padStart(3, '0')}</span>)}
      </div>
      <div className="absolute bottom-4 w-full flex justify-between px-10 opacity-30 select-none">
        {[0, 25, 50, 75, 100].map(n => <span key={n} className="text-[10px] font-bold">X_{n.toString().padStart(3, '0')}</span>)}
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-w-[1200px] max-h-[900px] p-12 relative z-10">
        <g>
          {nodes.map((node, i) => {
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            const pos = nodePositions[i];
            
            return [left, right].map(childIdx => {
              if (childIdx < array.length) {
                const childPos = nodePositions[childIdx];
                const isActive = childIdx < heapSize && i < heapSize;
                const isHighlighted = hoverIndex === i || hoverIndex === childIdx;
                
                return (
                  <line
                    key={`line-${i}-${childIdx}`}
                    x1={pos.x} y1={pos.y}
                    x2={childPos.x} y2={childPos.y}
                    stroke={isHighlighted ? "#E63946" : (isActive ? "#111111" : "#A0A0A0")}
                    strokeWidth={isHighlighted ? "8" : (isActive ? "6" : "2")}
                    strokeDasharray={isActive ? "" : "8,8"}
                    className="mechanical-transition"
                  />
                );
              }
              return null;
            });
          })}
        </g>
        <g>
          {nodes.map((node, i) => (
            <GeometricNode key={`node-${i}`} node={node} x={nodePositions[i].x} y={nodePositions[i].y} />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default HierarchyMap;
