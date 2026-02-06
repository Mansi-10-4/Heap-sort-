
import React from 'react';
import { Step } from '../types';
import MemoryBuffer from './MemoryBuffer';

interface Props {
  currentStep: Step;
  onNext: () => void;
  onUndo: () => void;
  onReset: () => void;
  onPlay: () => void;
  isPlaying: boolean;
  stepIndex: number;
  totalSteps: number;
  onHover: (idx: number | null) => void;
}

const CommandDeck: React.FC<Props> = ({ 
  currentStep, 
  onNext, 
  onUndo, 
  onReset, 
  onPlay, 
  isPlaying, 
  stepIndex, 
  totalSteps,
  onHover
}) => {
  return (
    <div className="w-[420px] h-full bg-[#F4F1EA] flex flex-col overflow-y-auto border-l-[8px] border-[#111111]">
      {/* Module: Log Narrative */}
      <div className="p-8 border-b-[4px] border-[#111111]">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 italic flex justify-between">
          <span>LOG_NARRATIVE</span>
          <span className="opacity-40">SEQ_{stepIndex.toString().padStart(3, '0')}</span>
        </h2>
        <div className="relative group">
          <div className="absolute inset-0 scanline opacity-20 pointer-events-none z-10" />
          <div className="bg-[#111111] text-[#F4F1EA] p-6 font-mono italic text-sm leading-relaxed min-h-[100px] flex items-center text-center border-l-[12px] border-[#E63946] shadow-inner">
            {currentStep.description}
          </div>
        </div>
      </div>

      {/* Module: System Specs */}
      <div className="px-8 py-6 border-b-[4px] border-[#111111] bg-[#111111] text-[#F4F1EA]">
        <div className="grid grid-cols-2 gap-4">
          <div className="border-l-2 border-[#FFDC00] pl-3">
            <div className="text-[8px] font-bold opacity-50">COMPLEXITY</div>
            <div className="text-xs font-black italic">O(N LOG N)</div>
          </div>
          <div className="border-l-2 border-[#E63946] pl-3">
            <div className="text-[8px] font-bold opacity-50">PHASE</div>
            <div className="text-xs font-black italic">{currentStep.heapSize > 0 ? 'HEAPIFY' : 'STABLE'}</div>
          </div>
        </div>
      </div>

      {/* Module: Master Controls */}
      <div className="p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
           <label className="text-[9px] font-bold uppercase tracking-widest opacity-50">Master_Execute</label>
           <button 
            onClick={onPlay}
            className={`
              w-full py-6 text-xl font-black uppercase tracking-[0.2em] border-[6px] border-[#111111]
              ${isPlaying ? 'bg-[#E63946] text-white' : 'bg-[#FFDC00] text-[#111111]'}
              bauhaus-shadow bauhaus-shadow-active mechanical-transition
            `}
          >
            {isPlaying ? 'PAUSE' : 'EXECUTE'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-bold uppercase tracking-widest opacity-50">Manual_Step</label>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={onUndo}
                disabled={stepIndex === 0}
                className="py-4 text-[10px] font-black border-[4px] border-[#111111] bg-white bauhaus-shadow bauhaus-shadow-active disabled:opacity-30 disabled:shadow-none"
              >
                REV
              </button>
              <button 
                onClick={onNext}
                disabled={isPlaying || stepIndex >= totalSteps - 1}
                className="py-4 text-[10px] font-black border-[4px] border-[#111111] bg-white bauhaus-shadow bauhaus-shadow-active disabled:opacity-30 disabled:shadow-none"
              >
                FWD
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-bold uppercase tracking-widest opacity-50">Recovery</label>
            <button 
              onClick={onReset}
              className="w-full h-full py-4 text-[10px] font-black border-[4px] border-[#111111] bg-[#003049] text-white bauhaus-shadow bauhaus-shadow-active"
            >
              RESET
            </button>
          </div>
        </div>
      </div>

      {/* Module: Data Progress */}
      <div className="px-8 mb-8">
        <div className="flex justify-between text-[10px] font-mono font-bold uppercase mb-2 tracking-widest">
          <span>PROGRESS</span>
          <span>{Math.round((stepIndex / (totalSteps - 1)) * 100)}%</span>
        </div>
        <div className="h-4 border-[3px] border-[#111111] bg-white relative">
          <div 
            className="h-full bg-[#003049] transition-all duration-300" 
            style={{ width: `${(stepIndex / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Module: Memory Buffer */}
      <div className="flex-1 p-8 bg-[#111111]/5 border-t-[4px] border-[#111111]">
        <MemoryBuffer currentStep={currentStep} onHover={onHover} />
      </div>
    </div>
  );
};

export default CommandDeck;
