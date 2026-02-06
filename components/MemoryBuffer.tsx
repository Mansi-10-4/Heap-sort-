
import React, { useState, useEffect } from 'react';
import { Step } from '../types';

interface Props {
  currentStep: Step;
  onHover: (idx: number | null) => void;
}

const MemoryItem: React.FC<{ 
  val: number, 
  idx: number, 
  isSelected: boolean, 
  isLocked: boolean,
  onMouseEnter: () => void,
  onMouseLeave: () => void
}> = ({ val, idx, isSelected, isLocked, onMouseEnter, onMouseLeave }) => {
  const [pop, setPop] = useState(false);

  useEffect(() => {
    setPop(true);
    const timer = setTimeout(() => setPop(false), 300);
    return () => clearTimeout(timer);
  }, [val]);

  let bgColor = "bg-[#F4F1EA]";
  let textColor = "text-[#111111]";
  let borderColor = "border-[#111111]";

  if (isLocked) {
    bgColor = "bg-gray-100";
    textColor = "text-gray-300";
    borderColor = "border-gray-200";
  } else if (isSelected) {
    bgColor = "bg-[#E63946]";
    textColor = "text-white";
  }

  return (
    <div 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        aspect-square border-[4px] ${borderColor} ${bgColor} ${textColor}
        flex flex-col items-center justify-center mechanical-transition
        hover:scale-105 hover:z-10
        ${pop ? 'kinetic-pop' : ''}
      `}
    >
      <span className="text-[7px] mb-1 font-mono uppercase opacity-50 tracking-tighter">PTR_{idx.toString().padStart(2, '0')}</span>
      <span className="text-xl font-black italic">{val}</span>
    </div>
  );
};

const MemoryBuffer: React.FC<Props> = ({ currentStep, onHover }) => {
  const { array, indices, heapSize } = currentStep;

  return (
    <div>
      <h3 className="text-[9px] font-bold uppercase mb-4 italic tracking-[0.3em] flex justify-between">
        <span>MEM_TAPE_DUMP</span>
        <span>SIZE: {array.length}</span>
      </h3>
      <div className="grid grid-cols-4 gap-3">
        {array.map((val, idx) => (
          <MemoryItem 
            key={idx} 
            val={val} 
            idx={idx} 
            isSelected={indices.includes(idx)} 
            isLocked={idx >= heapSize} 
            onMouseEnter={() => onHover(idx)}
            onMouseLeave={() => onHover(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoryBuffer;
